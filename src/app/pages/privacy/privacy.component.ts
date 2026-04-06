import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-privacy',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './privacy.component.html',
    styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
    sections = [
        {
            title: '1. Thông tin chúng tôi thu thập',
            content: 'Chúng tôi thu thập các thông tin cá nhân mà bạn cung cấp khi đăng ký tài khoản, bao gồm: họ tên, địa chỉ email, số điện thoại, địa chỉ. Chúng tôi cũng thu thập thông tin về thiết bị của bạn như địa chỉ IP, loại trình duyệt, và dữ liệu sử dụng để cải thiện dịch vụ.'
        },
        {
            title: '2. Mục đích sử dụng thông tin',
            content: 'Thông tin của bạn được sử dụng để: cung cấp và cải thiện dịch vụ, xử lý giao dịch, gửi thông báo quan trọng về dịch vụ, hỗ trợ khách hàng, và phân tích để nâng cao trải nghiệm người dùng. Chúng tôi cam kết chỉ sử dụng thông tin cho các mục đích đã nêu.'
        },
        {
            title: '3. Bảo mật thông tin',
            content: 'Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát, hoặc tiết lộ. Dữ liệu được mã hóa trong quá trình truyền tải và lưu trữ trên các máy chủ an toàn. Chỉ nhân viên được ủy quyền mới có thể truy cập thông tin của bạn.'
        },
        {
            title: '4. Chia sẻ thông tin',
            content: 'Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ khi: có sự đồng ý của bạn, cần thiết để cung cấp dịch vụ (ví dụ: đối tác vận chuyển), hoặc theo yêu cầu của pháp luật. Các đối tác của chúng tôi cũng cam kết bảo mật thông tin của bạn.'
        },
        {
            title: '5. Quyền của người dùng',
            content: 'Bạn có quyền: truy cập và cập nhật thông tin cá nhân, yêu cầu xóa tài khoản và dữ liệu, từ chối nhận email marketing, yêu cầu sao chép dữ liệu cá nhân. Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email hoặc trang hỗ trợ.'
        },
        {
            title: '6. Cookie và công nghệ theo dõi',
            content: 'Chúng tôi sử dụng cookie và công nghệ tương tự để cải thiện trải nghiệm người dùng, phân tích lưu lượng truy cập, và cá nhân hóa nội dung. Bạn có thể quản lý tùy chọn cookie trong cài đặt trình duyệt của mình. Việc tắt cookie có thể ảnh hưởng đến một số chức năng của website.'
        },
        {
            title: '7. Thay đổi chính sách',
            content: 'Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi quan trọng sẽ được thông báo qua email hoặc thông báo trên website. Chúng tôi khuyến khích bạn thường xuyên xem lại chính sách này để cập nhật thông tin mới nhất. Ngày cập nhật cuối cùng sẽ được ghi rõ tại đầu trang.'
        },
        {
            title: '8. Liên hệ',
            content: 'Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email: supports.antjsc@gmail.com hoặc số điện thoại: (84) 88 6929 185. Chúng tôi sẽ phản hồi trong vòng 24-48 giờ làm việc.'
        }
    ];

    lastUpdated = 'Ngày 09 tháng 01 năm 2026';
}
