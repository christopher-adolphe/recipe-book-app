import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
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
  ]
};

/**
 * Reducer function which is managed by NgRx
 * @param state - Current state to be changed by the reducer. It is initialized with the
 * initialState
 * @param {Action} action - Action that triggers the reducer to update the state. It contains
 * the type of the action and also a payload of the new state
*/
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
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
  
    default:
      return state;
  }
}
