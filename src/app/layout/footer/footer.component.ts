import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
    menuItems = [
        { label: 'Về chúng tôi', route: '/' },
        { label: 'Về Đen Đen', route: '/home' },
        { label: 'Chính sách bảo mật', route: '/privacy' },
    ];
}
