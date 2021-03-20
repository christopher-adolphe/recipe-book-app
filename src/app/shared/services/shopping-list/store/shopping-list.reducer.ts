import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../../models/ingredient.interface';

export interface State {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  selectedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
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
  ],
  selectedIngredient: null,
  selectedIngredientIndex: -1
};

/**
 * Reducer function which is managed by NgRx
 * @param state - Current state to be changed by the reducer. It is initialized with the
 * initialState
 * @param {Action} action - Action that triggers the reducer to update the state. It contains
 * the type of the action and also a payload of the new state
*/
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.selectedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.selectedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        selectedIngredient: null,
        selectedIngredientIndex: -1
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => index !== state.selectedIngredientIndex),
        selectedIngredient: null,
        selectedIngredientIndex: -1
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        selectedIngredient: {...state.ingredients[action.payload]},
        selectedIngredientIndex: action.payload
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        selectedIngredient: null,
        selectedIngredientIndex: -1
      };
  
    default:
      return state;
  }
}
