import { Ingredient } from './ingredient.interface';

export interface State {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  selectedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}
