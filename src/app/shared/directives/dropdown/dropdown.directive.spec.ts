import { TestBed } from '@angular/core/testing';
import { DropdownDirective } from './dropdown.directive';
import { ElementRef } from '@angular/core';

describe('DropdownDirective', () => {
  it('should create an instance', () => {
    const directive = new DropdownDirective(TestBed.get(ElementRef));
    expect(directive).toBeTruthy();
  });
});
