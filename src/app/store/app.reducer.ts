import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shared/services/shopping-list/store/shopping-list.reducer';
import * as fromAuthentication from '../shared/services/authentication/store/authentication.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  authentication: fromAuthentication.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  authentication: fromAuthentication.authenticationReducer
};
