import { AfterViewInit, Component, inject, Injector, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
@Component({
  template: '',
  standalone: true,
  imports: [],
  host: {
    class: 'flex-1 flex flex-col items-stretch justify-start overflow-auto'
  }
})
export abstract class BaseClass implements OnInit, AfterViewInit, OnDestroy {
  destroyRef = new Subject<void>();
  injector = inject(Injector);
  constructor() {}
  ngAfterViewInit(): void { }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.destroyRef.next();
    this.destroyRef.complete();
  }
}
