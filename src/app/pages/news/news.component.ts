import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss'
})
export class NewsComponent {
    contactInfo = [
        {
            icon: 'pi-map-marker',
            title: 'Địa chỉ',
            content: '19 đường ven hồ, Khương Đình, Hà Nội'
        },
        {
            icon: 'pi-phone',
            title: 'Điện thoại',
            content: '(028) 1234 5678'
        },
        {
            icon: 'pi-envelope',
            title: 'Email',
            content: 'contact@ant.vn'
        },
        {
            icon: 'pi-clock',
            title: 'Giờ làm việc',
            content: 'Thứ 2 - Thứ 6: 8:00 - 18:00'
        }
    ];

    formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };

    onSubmit() {
        console.log('Form submitted:', this.formData);
        // TODO: Implement form submission logic
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        this.resetForm();
    }

    resetForm() {
        this.formData = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        };
    }
}
