import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Store] }));

  it('should be created', () => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);
    expect(service).toBeTruthy();
  });
});
