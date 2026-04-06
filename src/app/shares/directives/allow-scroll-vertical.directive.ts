import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[allowVerticalScrollOnCarousel]',
    standalone: true,
})
export class AllowVerticalScrollOnCarouselDirective implements AfterViewInit, OnDestroy {
    private startX = 0;
    private startY = 0;

    private onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0];
        this.startX = t.clientX;
        this.startY = t.clientY;
    };

    private onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        const dx = Math.abs(t.clientX - this.startX);
        const dy = Math.abs(t.clientY - this.startY);

        // user đang kéo dọc -> để browser scroll, không cho PrimeNG "ăn" event
        if (dy > dx) {
            e.stopImmediatePropagation();
            // KHÔNG preventDefault ở đây
        }
    };

    constructor(private el: ElementRef<HTMLElement>) { }

    ngAfterViewInit() {
        const node = this.el.nativeElement;
        node.addEventListener('touchstart', this.onTouchStart, { capture: true, passive: true });
        node.addEventListener('touchmove', this.onTouchMove, { capture: true, passive: true });
    }

    ngOnDestroy() {
        const node = this.el.nativeElement;
        node.removeEventListener('touchstart', this.onTouchStart, true);
        node.removeEventListener('touchmove', this.onTouchMove, true);
    }
}