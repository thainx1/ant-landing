import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, Inject, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { BaseClass } from '../../core/base.class';
import { LayoutComponent } from '../../layout/layout.component';
import { BannerType } from '../../core/enum';
import { PaginatorModule } from 'primeng/paginator';
import { Subscription } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { PaginatedWebsitePostResponse, PostType, WebsitePost } from '../../core/types';

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [CommonModule, RouterModule, PaginatorModule],
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss'
})
export class NewsComponent extends BaseClass implements OnInit, OnDestroy {
    layout = inject(LayoutComponent, { optional: true });
    private route = inject(ActivatedRoute);
    private location = inject(Location);
    private querySub?: Subscription;

    banner = computed(() => {
        const sharedData = this.layout?.sharedData();
        if (!sharedData?.banners) return null;
        return sharedData.banners?.find((item: any) =>
            item.page === BannerType.NEWS && item.isActive
        ) ?? null;
    });

    // All news
    allNews = signal<WebsitePost[]>([]);

    // Detail view
    selectedNews = signal<WebsitePost | null>(null);

    // Pagination
    pageSize = signal<number>(8);
    currentPage = signal<number>(0);
    totalRecord = signal<number>(0);

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        super();
    }

    override ngOnInit(): void {
        this.querySub = this.route.queryParams.subscribe(async params => {
            const newId = params['newId'];
            if (newId) {
                let found = this.allNews().find(n => n.id === newId) ?? null;
                if (!found) {
                    found = await this.onGetNewsDetail(newId);
                }
                this.selectedNews.set(found);
            } else {
                this.selectedNews.set(null);
                await this.onGetNewsList(1);
            }
        });
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.querySub?.unsubscribe();
    }

    openDetail(item: WebsitePost) {
        this.selectedNews.set(item);
        this.location.replaceState('/news', `newId=${item.id}`);
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    backToList() {
        this.location.replaceState('/news');
        this.selectedNews.set(null);
        if (this.allNews().length === 0) {
            this.onGetNewsList(1);
            if (isPlatformBrowser(this.platformId)) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    async onPageChange(event: any) {
        this.currentPage.set(event.page);
        await this.onGetNewsList(this.currentPage() + 1)
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    async onGetNewsList(page: number, keyword?: string, type?: PostType) {
        try {
            const response = await this.injector.get(ApiService).asyncGet<PaginatedWebsitePostResponse>('public/post',
                {
                    page: page || 1,
                    size: 20,
                    keyword: keyword || ''
                }
            );
            this.allNews.set(response.data || []);
            this.currentPage.set(page)
            this.totalRecord.set(response?.pagination?.total || 0)
        } catch (error) {
            console.error('Error fetching news list', error);
        }
    }

    async onGetNewsDetail(id: string): Promise<WebsitePost | null> {
        try {
            const response = await this.injector.get(ApiService).asyncGet<WebsitePost>(`public/post/${id}`);
            return response
        } catch (error) {
            return null;
        }
    }
}
