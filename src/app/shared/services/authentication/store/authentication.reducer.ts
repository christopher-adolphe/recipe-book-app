import * as AuthenticationActions from './authentication.actions';
import { User } from 'src/app/shared/models/user.model';

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
};

export function authenticationReducer(state: State = initialState, action: AuthenticationActions.AuthenticationActions) {
  switch (action.type) {
    case AuthenticationActions.AUTHENTICATE_SUCCESS:
      const user = new User(action.payload.email, action.payload.userId, action.payload.tokenId, action.payload.expiryDate);
      
      return {
        ...state,
        authError: null,
        user,
        isLoading: false
      };
    
    case AuthenticationActions.LOGIN_START:
    case AuthenticationActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      };

    case AuthenticationActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      };

    case AuthenticationActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    case AuthenticationActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }

    default:
      return state;
  }
}
