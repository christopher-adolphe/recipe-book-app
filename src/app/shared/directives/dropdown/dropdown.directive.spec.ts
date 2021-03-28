import { TestBed } from '@angular/core/testing';
import { DropdownDirective } from './dropdown.directive';
import { ElementRef, Component } from '@angular/core';

@Component({
  template: `
  <div appDropdown>Dropdown Directive</div>
  `
})
class TestComponent { }

describe('DropdownDirective', () => {
  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      declarations: [DropdownDirective, TestComponent]
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
  });
});
