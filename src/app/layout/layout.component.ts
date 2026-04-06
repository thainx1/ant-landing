import { Component, signal, OnInit, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ApiService } from '../core/services/api.service';
import { GET_BANNERS } from '../core/constants/gqlqueries/banner.query';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
    injector = inject(Injector);
    
    // Shared signal that all child components can access
    sharedData = signal<any>({
        banners: [],
        user: null,
        settings: {}
    });

    // Method to update shared data
    updateSharedData(data: Partial<any>) {
        this.sharedData.update(current => ({ ...current, ...data }));
    }

    async ngOnInit(): Promise<void> {
        // await this.getBanners();
    }

    async getBanners() {
        try {
            const result = await this.injector.get(ApiService).executeQuery(GET_BANNERS);
            if (result) {
                this.updateSharedData({ banners: result?.getAllBannerActivePublic || [] });
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    }
}
