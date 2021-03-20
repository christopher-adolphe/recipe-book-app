import { Action } from '@ngrx/store';

import { Recipe } from '../../../models/recipe.interface';

export const SET_RECIPES = 'SET_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SAVE_RECIPES = 'SAVE_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class SaveRecipes implements Action {
  readonly type = SAVE_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class EditRecipe implements Action {
  readonly type = EDIT_RECIPE;

  constructor(public payload: { index: number, recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export type RecipeActions = SetRecipes | FetchRecipes | SaveRecipes | AddRecipe | EditRecipe | DeleteRecipe;
