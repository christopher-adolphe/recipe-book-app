import * as RecipeActions from './recipe.actions';
import { Recipe } from '../../../models/recipe.interface';

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(state: State = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipeActions.EDIT_RECIPE:
      const index = action.payload.index;
      const editedRecipe = {
        ...state.recipes[index], // Extracting the recipe to be edited from the store
        ...action.payload.recipe // Uupdating the recipe with new values
      };

      // Copying the initial state of the recipes
      const updatedRecipes = [ ...state.recipes ];

      // Finding the edited recipe and setting it to its new values
      updatedRecipes[index] = editedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };

    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => index !== action.payload)
      };

    default:
      return state;
  }
}
