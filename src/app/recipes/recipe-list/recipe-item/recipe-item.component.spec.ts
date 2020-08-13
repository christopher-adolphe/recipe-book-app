import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { RecipeListComponent } from '../recipe-list.component';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeItemComponent, RecipeListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));
});
