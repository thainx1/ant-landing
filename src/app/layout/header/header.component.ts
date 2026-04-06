import { Component, signal, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SelectModule } from 'primeng/select';

interface Language {
    name: string;
    code: string;
}

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    sidebarVisible = signal(false);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    selectedLanguage = signal<Language>({ name: 'Tiếng Việt', code: 'vi' });
    isScrolled = signal(false);

    languages: Language[] = [
        { name: 'Tiếng Việt', code: 'vi' },
        { name: 'English', code: 'en' }
    ];

    menuItems = [
        { 
            label: 'Về chúng tôi', 
            route: '/',
            icon: '',
            path: 'images/icons/menu_1.svg'
        },
        { 
            label: 'Về Đen Đen', 
            route: '/home',
            icon: '',
            path: 'images/icons/menu_2.svg'
        },
        // // { label: 'Tin tức', route: '/news' },
        // { 
        //     label: 'Liên hệ', 
        //     route: '/contact',
        //     icon: '',
        //     path: 'images/icons/menu_3.svg'
        // },
    ];

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            this.isScrolled.set(scrollPosition > 10);
        }
    }

    toggleSidebar() {
        this.sidebarVisible.set(!this.sidebarVisible());
    }

    onLanguageChange(event: any) {
        this.selectedLanguage.set(event.value);
    }
}
