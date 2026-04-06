import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    values = [
        {
            icon: 'pi-lightbulb',
            title: 'Đổi mới sáng tạo',
            description: 'Không ngừng nghiên cứu và phát triển công nghệ mới để mang đến giải pháp tốt nhất'
        },
        {
            icon: 'pi-users',
            title: 'Khách hàng là trung tâm',
            description: 'Lắng nghe và thấu hiểu nhu cầu để tạo ra sản phẩm phù hợp nhất'
        },
        {
            icon: 'pi-shield',
            title: 'Tin cậy & Bảo mật',
            description: 'Cam kết bảo vệ thông tin và quyền riêng tư của khách hàng tuyệt đối'
        },
        {
            icon: 'pi-heart',
            title: 'Chất lượng dịch vụ',
            description: 'Đảm bảo sản phẩm và dịch vụ đạt tiêu chuẩn cao nhất'
        }
    ];

    stats = [
        { number: '10,000+', label: 'Khách hàng' },
        { number: '50,000+', label: 'Thiết bị bán ra' },
        { number: '99.9%', label: 'Thời gian hoạt động' },
        { number: '24/7', label: 'Hỗ trợ' }
    ];
}
