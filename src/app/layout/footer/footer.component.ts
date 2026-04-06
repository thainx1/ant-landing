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
        { 
            label: 'Giải pháp sale BĐS', 
            route: '/home',
            icon: '',
            path: 'images/icons/menu_2.svg'
        },
        { 
            label: 'Về chúng tôi', 
            route: '/about',
            icon: '',
            path: 'images/icons/menu_1.svg'
        },
        { 
            label: 'Tin tức', 
            route: '/news',
            icon: '',
            path: 'images/icons/menu_2.svg'
        },
        { 
            label: 'Liên hệ', 
            route: '/contact',
            icon: '',
            path: 'images/icons/menu_3.svg'
        },
        { label: 'Chính sách bảo mật', route: '/privacy' },
    ];
}
