import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shared/services/shopping-list/store/shopping-list.reducer';
import * as fromAuthentication from '../shared/services/authentication/store/authentication.reducer';
import * as fromRecipe from '../shared/services/recipe/store/recipe.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
  authentication: fromAuthentication.State;
  recipes: fromRecipe.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  authentication: fromAuthentication.authenticationReducer,
  recipes: fromRecipe.recipeReducer
};
