import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  constructor(private elemRef: ElementRef) { }

  @HostBinding('class.open') isOpen: boolean;

  @HostListener('document:click', ['$event']) toggleDropdown(event: Event) {
    this.isOpen = this.elemRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

}
