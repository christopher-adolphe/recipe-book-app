import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/models/ingredient.interface';
import { ShoppingListService } from '../shared/services/shopping-list/shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private _obsSubscription: Subscription;
  // ingredients: Ingredient[];
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    // this._obsSubscription = this.shoppingListService.ingredientsUpdated.subscribe(
    //   (updatedIngredients: Ingredient[]) => this.ingredients = updatedIngredients
    // );
    this.ingredients = this.store.select('shoppingList');
    this.loggingService.printLog('Hello from #ShoppingListComponent in #ngOnInit');
  }

  onIngredientSelected(index: number) {
    this.shoppingListService.ingredientSelected(index);
  }

  ngOnDestroy() {
    // this._obsSubscription.unsubscribe();
  }

}
