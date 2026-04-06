import { Component, inject, OnInit, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { BaseClass } from '../../core/base.class';
import { LayoutComponent } from '../../layout/layout.component';
import { BannerType } from '../../core/enum';
import { CarouselModule } from 'primeng/carousel';
import { AllowVerticalScrollOnCarouselDirective } from '../../shares/directives/allow-scroll-vertical.directive';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
    CommonModule,
    CarouselModule,
    AllowVerticalScrollOnCarouselDirective,
    RouterLink
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent extends BaseClass {
    activeTab: string = 'hr';
    activeTabIndex: number = 0;
    featureIndex: number = 0;
    bp = inject(BreakpointService);

    // Inject parent LayoutComponent to access shared signal
    layout = inject(LayoutComponent, { optional: true });
    features = [
        {
            title: 'Nói tự nhiên hơn',
            image: '/images/home/message_1.png',
            description: 'Đen Đen trò chuyện 1:1 cùng bé mỗi ngày, gợi mở để con chủ động nói tiếng Anh. Bé trả lời theo câu và duy trì hội thoại tự nhiên, thay vì chỉ nghe rồi chọn đáp án.',
        },
        {
            title: 'Nói đúng và rõ hơn',
            image: '/images/home/message_2.png',
            description: 'Đen Đen lắng nghe và phản hồi tự nhiên theo ngữ cảnh, giúp bé quen với các cấu trúc câu và cách diễn đạt đúng. Qua đó, bé luyện phát âm chuẩn và tự tin hơn khi giao tiếp.',
        },
        {
            title: 'Học vui mỗi ngày',
            image: '/images/home/message_3.png',
            description: 'Qua các bài học và hoạt động tương tác, bé được thực hành tiếng Anh trong nhiều tình huống giao tiếp gần gũi. Bé học từ vựng, cấu trúc câu và cách diễn đạt tự nhiên, giúp việc học trở nên thú vị và hiệu quả hơn.',
        },
    ];

    guides = [
        {
            title: '',
            image: '/images/home/message_4.png',
            description: 'Bé khởi động Đen Đen để bắt đầu buổi học 1:1. Đen Đen đồng hành xuyên suốt, gợi mở câu hỏi và hướng dẫn bé từng bước hoàn thành bài học.',
        },
        {
            title: '',
            image: '/images/home/message_5.png',
            description: 'Phụ huynh có thể kết nối Đen Đen với ứng dụng trên điện thoại để dễ dàng theo dõi và đồng hành cùng con. Mỗi buổi học đều được ghi lại rõ ràng: nội dung học, thời lượng và mức độ tiến bộ theo từng tuần.',
        },
    ]
    selectTab(tab: string, tabIndex: number): void {
        this.activeTab = tab;
        this.activeTabIndex = tabIndex;
    }
    selectFeature(featureIndex: number): void {
        this.featureIndex = featureIndex;
    }

    // Use computed signal to derive banner from shared data
    // This prevents ExpressionChangedAfterItHasBeenCheckedError
    banner = computed(() => {
        const sharedData = this.layout?.sharedData();
        if (!sharedData?.banners) return null;

        const foundBanner = sharedData.banners?.find((item: any) =>
            item.page === BannerType.HOME && item.isActive
        );
        console.log('banner', foundBanner);
        return foundBanner || null;
    });

    constructor() {
        super();
    }


}
