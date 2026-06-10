# Deploy ANT Landing (Frontend) lên EC2 - Hướng dẫn đầy đủ

## Tổng quan kiến trúc

```
Internet → Nginx trên EC2 (443/SSL) → Docker: Nginx serve static Angular (:80)
                                     ↕
                            API Backend (api-ant.htezlife.com)
```

- **Landing**: Angular 21 SPA, build thành static files, serve bằng Nginx trong Docker
- **Image Registry**: AWS ECR
- **CI/CD**: GitHub Actions
- **SSL**: Certbot (Let's Encrypt)

---

## Bước 1: Tạo EC2 Instance

**AWS Console → EC2 → Launch Instance:**

| Setting | Giá trị |
|---------|---------|
| AMI | Amazon Linux 2023 |
| Instance type | t3.small (2 vCPU, 2GB RAM) — đủ cho static site |
| Key pair | Tạo mới hoặc dùng key có sẵn (.pem) |
| Security Group | Xem bên dưới |
| Storage | 20GB gp3 |
| Auto-assign public IP | Disable (dùng Elastic IP) |
| IAM Role | `ec2-ecr-pull-role` (quyền pull ECR) |

### Security Group

| Type | Port | Source | Mục đích |
|------|------|--------|----------|
| SSH | 22 | My IP | Quản trị |
| HTTP | 80 | 0.0.0.0/0 | Redirect → HTTPS |
| HTTPS | 443 | 0.0.0.0/0 | Web access |

### Gán Elastic IP

```
EC2 Console → Elastic IPs → Allocate → Associate với instance
```

---

## Bước 2: IAM Role cho EC2

Gán role `ec2-ecr-pull-role` (policy `AmazonEC2ContainerRegistryReadOnly`) để EC2 tự authenticate khi pull image từ ECR.

---

## Bước 3: Cấu hình SSH và cài đặt cơ bản

```bash
ssh -i your-key.pem ec2-user@<ELASTIC-IP>

# Update system
sudo dnf update -y

# Cài tools
sudo dnf install -y git htop nano wget curl
```

### Cấu hình SSH key (không cần .pem)

```bash
# Trên máy local, copy public key lên EC2
ssh-copy-id -i ~/.ssh/id_rsa.pub -o "IdentityFile=your-key.pem" ec2-user@<ELASTIC-IP>
```

### SSH config (optional)

```
# ~/.ssh/config
Host ant-landing-ec2
    HostName <ELASTIC-IP>
    User ec2-user
    IdentityFile ~/.ssh/id_rsa
```

---

## Bước 4: Cài Docker

```bash
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Logout và SSH lại
exit
```

---

## Bước 5: Tạo ECR Repository

```bash
# Trên máy local hoặc CloudShell
aws ecr create-repository \
  --repository-name ant-landing-prod \
  --region ap-southeast-1
```

---

## Bước 6: Tạo deploy script trên EC2

```bash
mkdir -p /home/ec2-user/ant-landing

cat > /home/ec2-user/ant-landing/deploy.sh << 'EOF'
#!/bin/bash
set -e

REGION="ap-southeast-1"
ACCOUNT_ID="665602132704"
ECR_URL="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"
REPO_NAME="ant-landing-prod"
CONTAINER_NAME="ant-landing"

echo "=== Login ECR ==="
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_URL

echo "=== Pull image ==="
docker pull $ECR_URL/$REPO_NAME:latest

echo "=== Deploy Landing ==="
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true
docker run -d \
  --name $CONTAINER_NAME \
  --restart always \
  -p 4201:80 \
  $ECR_URL/$REPO_NAME:latest

echo "=== Cleanup old images ==="
docker image prune -f

echo "=== Deploy complete ==="
docker ps
EOF

chmod +x /home/ec2-user/ant-landing/deploy.sh
```

> Container chạy port **4201** trên host, Nginx reverse proxy từ 443 → 4201.

---

## Bước 7: Cài Nginx (Reverse Proxy + SSL)

### 7.1. Cài Nginx

```bash
sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 7.2. Cấu hình Nginx

```bash
sudo tee /etc/nginx/conf.d/ant-landing.conf << 'EOF'
upstream ant_landing {
    server 127.0.0.1:4201;
}

server {
    listen 80;
    server_name ant.htezlife.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # File upload limit
    client_max_body_size 20M;

    location / {
        proxy_pass http://ant_landing;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check
    location /health {
        proxy_pass http://ant_landing/health;
        access_log off;
    }
}
EOF
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 7.3. Cài SSL (Let's Encrypt)

> Điều kiện: DNS đã trỏ `ant.htezlife.com` → Elastic IP.

```bash
sudo dnf install -y certbot python3-certbot-nginx

# Lấy certificate + tự cấu hình SSL
sudo certbot --nginx -d ant.htezlife.com

# Verify auto-renew
sudo certbot renew --dry-run
```

---

## Bước 8: DNS

Trỏ **A record** `ant.htezlife.com` → Elastic IP của EC2.

---

## Bước 9: GitHub Actions CI/CD

### 9.1. GitHub Secrets cần setup

| Secret | Giá trị |
|--------|---------|
| `AWS_ACCESS_KEY_ID_PROD` | IAM key (quyền ECR push) |
| `AWS_SECRET_ACCESS_KEY_PROD` | IAM secret |
| `EC2_PROD_HOST` | Elastic IP |
| `EC2_PROD_SSH_KEY` | Nội dung private key SSH |

### 9.2. Workflow file

Tạo file `.github/workflows/deploy-landing-prod.yml`:

```yaml
name: Deploy Landing to ECR (Production)

on:
  push:
    branches:
      - prod
  workflow_dispatch:

env:
  AWS_REGION: ap-southeast-1
  ECR_REPOSITORY: ant-landing-prod
  ECR_REGISTRY: 665602132704.dkr.ecr.ap-southeast-1.amazonaws.com

jobs:
  build-and-push:
    name: Build & Push Landing Image
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - uses: aws-actions/configure-aws-credentials@v5
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID_PROD }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY_PROD }}
          aws-region: ${{ env.AWS_REGION }}

      - id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
        with:
          registries: "665602132704"

      - name: Build, tag, and push Landing image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

  deploy:
    name: Deploy to EC2 (Prod)
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_PROD_HOST }}
          username: ec2-user
          key: ${{ secrets.EC2_PROD_SSH_KEY }}
          script: /home/ec2-user/ant-landing/deploy.sh
```

### 9.3. Trigger deploy

- **Tự động**: Push code vào branch `prod`
- **Thủ công**: GitHub → Actions → "Deploy Landing to ECR (Production)" → Run workflow

---

## Bước 10: Deploy thủ công (lần đầu)

```bash
ssh ant-landing-ec2

# Chạy deploy script
/home/ec2-user/ant-landing/deploy.sh

# Verify
curl -s http://localhost:4201/health
# → OK
```

---

## Port Mapping tổng quan

| Service | Container Port | Host Port | Domain |
|---------|---------------|-----------|--------|
| ANT CMS | 80 | 4200 | cms-ant.htezlife.com |
| ANT Landing | 80 | **4201** | ant.htezlife.com |

> Nếu cả 2 service chạy trên cùng 1 EC2, mỗi service map sang port khác nhau trên host.

---

## Monitoring & Maintenance

### Xem logs

```bash
# Docker container logs
docker logs -f ant-landing
docker logs --tail 100 ant-landing

# Nginx logs (reverse proxy)
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Health check

```bash
curl -s https://ant.htezlife.com/health
```

### Resource monitoring

```bash
htop
df -h
docker stats --no-stream
```

### Rollback

```bash
# Xem images đã pull
docker images | grep ant-landing

# Rollback về commit cũ
docker stop ant-landing && docker rm ant-landing
docker run -d \
  --name ant-landing \
  --restart always \
  -p 4201:80 \
  665602132704.dkr.ecr.ap-southeast-1.amazonaws.com/ant-landing-prod:<commit-sha>
```

### Disk cleanup

```bash
docker system prune -a
sudo journalctl --vacuum-time=7d
```

---

## Troubleshooting

### Docker không pull được từ ECR

```bash
# Check IAM Role
curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Login thủ công
aws ecr get-login-password --region ap-southeast-1 | \
  docker login --username AWS --password-stdin 665602132704.dkr.ecr.ap-southeast-1.amazonaws.com
```

### Trang trắng / 404

```bash
# Kiểm tra container có chạy không
docker ps

# Kiểm tra file tĩnh trong container
docker exec ant-landing ls /usr/share/nginx/html/

# Kiểm tra nginx config trong container
docker exec ant-landing cat /etc/nginx/nginx.conf
```

### SSL certificate hết hạn

```bash
# Renew thủ công
sudo certbot renew

# Check ngày hết hạn
sudo certbot certificates
```

### Build Docker image thất bại (CI)

```bash
# Test build local
docker build -t ant-landing-test .

# Nếu lỗi npm ci → check package-lock.json có commit chưa
# Nếu lỗi memory → tăng instance type hoặc thêm swap trên runner
```

---

## Tóm tắt thứ tự thực hiện

1. ✅ Tạo EC2 instance (Amazon Linux 2023, t3.small, 20GB)
2. ✅ Gán Elastic IP + IAM Role (ECR pull)
3. ✅ Cấu hình SSH key + kết nối
4. ✅ Cài Docker
5. ✅ Tạo ECR repository `ant-landing-prod`
6. ✅ Tạo deploy script trên EC2 (port **4201**)
7. ✅ Cài Nginx + SSL (Certbot)
8. ✅ Trỏ DNS `ant.htezlife.com`
9. ✅ Setup GitHub Actions CI/CD
10. ✅ Deploy lần đầu + verify
