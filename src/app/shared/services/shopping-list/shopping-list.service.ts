import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.interface';
import * as fromShoppingList from '../../models/state.interface';

import * as ShoppingListActions from '../../services/shopping-list/store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[];
  public ingredientsUpdated = new Subject<Ingredient[]>();
  public selectedIngredient: Subject<number> = new Subject<number>();

  constructor(private store: Store<fromShoppingList.AppState>) {
    this.ingredients = [
      {
        amount: 1,
        description: 'garlic clove'
      },
      {
        amount: 2,
        description: 'skinless salmon fillets'
      },
      {
        amount: 2,
        description: 'shallots, finely chopped'
      },
      {
        amount: 2,
        description: 'tbsp olive oil'
      }
    ];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  addMultipleIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    // this.ingredientsUpdated.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  ingredientSelected(index: number) {
    this.selectedIngredient.next(index);
  }

}
