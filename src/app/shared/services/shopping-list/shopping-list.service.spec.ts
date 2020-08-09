import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [Store], imports: [StoreModule.forRoot({})] }));

  it('should be created', () => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);
    expect(service).toBeTruthy();
  });
});
