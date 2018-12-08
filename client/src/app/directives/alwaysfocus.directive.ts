import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAlwaysFocus]'
})
export class AlwaysFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

}
