import { Action } from '@ngrx/store';

import { Ingredient } from '../../../models/ingredient.interface';

// Defining the different types of actions
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

// Creating a custom type that groups the different types that we have defined
export type ShoppingListActions = AddIngredient | AddIngredients;
