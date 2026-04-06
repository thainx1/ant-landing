import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { BaseClass } from '../../core/base.class';
import { LayoutComponent } from '../../layout/layout.component';
import { BannerType } from '../../core/enum';

interface TabData {
    highlights: string[];
    features: { icon: string; title: string; description: string }[];
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent extends BaseClass {
    bp = inject(BreakpointService);
    layout = inject(LayoutComponent, { optional: true });

    activeTab = signal('sale');
    activeTabIndex = signal(0);
    slideDirection = signal<'left' | 'right'>('right');
    isAnimating = signal(false);

    tabs = [
        { key: 'sale', label: 'Dành cho Sale' },
        { key: 'leader', label: 'Dành cho Quản lý' },
        { key: 'investor', label: 'Dành cho Chủ đầu tư' },
    ];

    tabDataMap: Record<string, TabData> = {
        sale: {
            highlights: [
                'Sở hữu trang bán hàng cá nhân chuyên nghiệp',
                'Khách hàng tự đặt lịch — không lo mất lead',
                'Tra cứu quỹ căn nhanh chóng, chính xác',
            ],
            features: [
                {
                    icon: 'pi-globe',
                    title: 'Web-page cá nhân hóa',
                    description:
                        'Mỗi sale có đường link riêng và liên hệ cá nhân cho từng sale.',
                },
                {
                    icon: 'pi-calendar',
                    title: 'Đặt lịch thông minh',
                    description:
                        'Khách hàng chủ động hẹn lịch xem nhà ngay trên trang web của bạn.',
                },
                {
                    icon: 'pi-database',
                    title: 'Quỹ căn số hóa',
                    description:
                        'Toàn bộ danh mục sản phẩm được quản lý tập trung, tra cứu tức thì.',
                },
                {
                    icon: 'pi-share-alt',
                    title: 'Chia sẻ dễ dàng',
                    description:
                        'Gửi link chuyên nghiệp qua Zalo, Facebook thay vì file rời rạc.',
                },
            ],
        },
        leader: {
            highlights: [
                'Theo dõi hiệu suất từng thành viên real-time',
                'Minh bạch dữ liệu — không chồng chéo khách',
                'Dashboard tổng quan trực quan, dễ hiểu',
            ],
            features: [
                {
                    icon: 'pi-chart-bar',
                    title: 'Dashboard quản trị',
                    description:
                        'Cái nhìn tổng thể về lượng tương tác, lịch hẹn và tỷ lệ chuyển đổi của từng sale.',
                },
                {
                    icon: 'pi-users',
                    title: 'Quản lý đội nhóm',
                    description:
                        'Phân quyền, theo dõi và đánh giá hiệu suất từng thành viên dễ dàng.',
                },
                {
                    icon: 'pi-shield',
                    title: 'Phân loại khách tự động',
                    description:
                        'Hệ thống tự ghi nhận khách từ link cá nhân, loại bỏ tranh chấp.',
                },
                {
                    icon: 'pi-file-export',
                    title: 'Báo cáo xuất dữ liệu',
                    description:
                        'Xuất báo cáo hiệu suất theo tuần/tháng phục vụ đánh giá KPI.',
                },
            ],
        },
        investor: {
            highlights: [
                'Số hóa toàn bộ quỹ căn dự án',
                'Kiểm soát kênh phân phối hiệu quả',
                'Nắm bắt dữ liệu thị trường real-time',
            ],
            features: [
                {
                    icon: 'pi-building',
                    title: 'Quản lý dự án',
                    description:
                        'Đăng tải và cập nhật thông tin dự án, quỹ căn trên hệ thống tập trung.',
                },
                {
                    icon: 'pi-sitemap',
                    title: 'Kênh phân phối',
                    description:
                        'Theo dõi hiệu quả từng đội nhóm sale đang phân phối sản phẩm.',
                },
                {
                    icon: 'pi-chart-line',
                    title: 'Phân tích dữ liệu',
                    description:
                        'Thống kê lượt xem, lịch hẹn, tỷ lệ chuyển đổi theo từng dự án.',
                },
                {
                    icon: 'pi-verified',
                    title: 'Thương hiệu chuyên nghiệp',
                    description:
                        'Mỗi dự án có landing page riêng, nâng tầm hình ảnh thương hiệu.',
                },
            ],
        },
    };

    proofStats = [
        { number: '1,000+', label: 'Sale đang sử dụng' },
        { number: '50+', label: 'Đội nhóm tin dùng' },
        { number: '10,000+', label: 'Lịch hẹn được tạo' },
        { number: '99.9%', label: 'Uptime hệ thống' },
    ];

    steps = [
        {
            title: 'Đăng ký tài khoản',
            description: 'Tạo tài khoản cho đội nhóm chỉ trong 2 phút, không cần cài đặt phức tạp.',
        },
        {
            title: 'Thiết lập quỹ căn',
            description: 'Đăng tải thông tin dự án, quỹ căn lên hệ thống và phân quyền cho từng sale.',
        },
        {
            title: 'Chia sẻ & Chốt deal',
            description: 'Sale chia sẻ link cá nhân, khách đặt lịch trực tiếp — bắt đầu chốt deal.',
        },
    ];

    currentTabData = computed(() => this.tabDataMap[this.activeTab()]);

    banner = computed(() => {
        const sharedData = this.layout?.sharedData();
        if (!sharedData?.banners) return null;
        return sharedData.banners?.find(
            (item: any) => item.page === BannerType.HOME && item.isActive,
        ) || null;
    });

    constructor() {
        super();
    }

    selectTab(key: string, index: number): void {
        if (this.isAnimating() || key === this.activeTab()) return;

        const prevIndex = this.activeTabIndex();
        this.slideDirection.set(index > prevIndex ? 'right' : 'left');
        this.isAnimating.set(true);

        // Brief timeout to allow CSS transition out, then swap content and animate in
        setTimeout(() => {
            this.activeTabIndex.set(index);
            this.activeTab.set(key);
            setTimeout(() => this.isAnimating.set(false), 350);
        }, 10);
    }
}
