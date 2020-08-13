import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'

import { Store, StoreModule } from '@ngrx/store';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

import { LoggingService } from '../logging.service'

import { RouterTestingModule } from '@angular/router/testing';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListComponent, ShoppingEditComponent],
      imports: [FormsModule, StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      providers: [Store, LoggingService]
    })
      .compileComponents();
  }));
});
