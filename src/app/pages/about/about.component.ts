import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
})
export class AboutComponent {
    features = [
        {
            icon: 'pi-database',
            title: 'Số hóa quỹ căn tập trung',
            description:
                'Quản lý toàn bộ danh mục sản phẩm một cách khoa học, giúp sale tra cứu thông tin nhanh chóng, chính xác.',
        },
        {
            icon: 'pi-globe',
            title: 'Web-page cá nhân hóa',
            description:
                'Mỗi nhân viên sale sở hữu đường link web riêng cho từng quỹ căn, hiển thị đầy đủ thông tin dự án và liên hệ cá nhân (Hotline, Zalo).',
        },
        {
            icon: 'pi-calendar',
            title: 'Hệ thống đặt lịch thông minh',
            description:
                'Khách hàng chủ động hẹn lịch xem nhà ngay trên trang web. Lịch hẹn được chuyển thẳng đến sale phụ trách, đảm bảo công bằng và chính xác.',
        },
        {
            icon: 'pi-chart-bar',
            title: 'Quản trị đội nhóm',
            description:
                'Trưởng nhóm có cái nhìn tổng thể về hiệu suất từng thành viên, theo dõi lượng tương tác và tỷ lệ chuyển đổi lịch hẹn thực tế.',
        },
    ];

    reasons = [
        {
            icon: 'pi-star',
            title: 'Chuyên nghiệp hóa hình ảnh',
            description:
                'Thay vì gửi những tệp tin rời rạc, sale gửi cho khách một website chuyên nghiệp mang đậm dấu ấn cá nhân.',
        },
        {
            icon: 'pi-shield',
            title: 'Công bằng & Minh bạch',
            description:
                'Hệ thống tự động phân loại khách hàng dựa trên link cá nhân, loại bỏ hoàn toàn việc chồng chéo khách giữa các thành viên.',
        },
        {
            icon: 'pi-wallet',
            title: 'Tối ưu chi phí',
            description:
                'Chỉ 49.000đ/tháng/người — giải pháp phù hợp nhất cho các đội nhóm nhỏ từ 5 - 20 người.',
        },
        {
            icon: 'pi-thumbs-up',
            title: 'Đơn giản & Dễ dùng',
            description:
                'Giao diện tinh gọn, không cần am hiểu kỹ thuật vẫn có thể sử dụng thành thạo sau 5 phút.',
        },
    ];

    stats = [
        { number: '49K', label: 'VNĐ/tháng/người' },
        { number: '5 phút', label: 'Làm quen hệ thống' },
        { number: '24/7', label: 'Hỗ trợ kỹ thuật' },
        { number: '100%', label: 'Minh bạch dữ liệu' },
    ];
}
