import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export type PfBp = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const PF_QUERIES = {
    xl: '(min-width: 1200px)',
    lg: '(min-width: 992px)',
    md: '(min-width: 768px)',
    sm: '(min-width: 576px)',
    xs: '(max-width: 575.98px)',
} as const;

@Injectable({ providedIn: 'root' })
export class BreakpointService {

    private bo = inject(BreakpointObserver);
    private platformId = inject(PLATFORM_ID);

    /** emits: 'xs' | 'sm' | 'md' | 'lg' | 'xl' */
    readonly bp$ = isPlatformBrowser(this.platformId)
        ? this.bo
            .observe([PF_QUERIES.xl, PF_QUERIES.lg, PF_QUERIES.md, PF_QUERIES.sm, PF_QUERIES.xs])
            .pipe(
                map((state) => {
                    // ưu tiên từ lớn -> nhỏ
                    if (state.breakpoints[PF_QUERIES.xl]) return 'xl';
                    if (state.breakpoints[PF_QUERIES.lg]) return 'lg';
                    if (state.breakpoints[PF_QUERIES.md]) return 'md';
                    if (state.breakpoints[PF_QUERIES.sm]) return 'sm';
                    return 'xs';
                }),
                distinctUntilChanged(),
                shareReplay({ bufferSize: 1, refCount: true }),
            )
        : of('xl' as PfBp);

    /** tiện dùng: mobile < md */
    readonly isMobile$ = this.bp$.pipe(map(bp => bp === 'xs' || bp === 'sm'));
    readonly responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}
