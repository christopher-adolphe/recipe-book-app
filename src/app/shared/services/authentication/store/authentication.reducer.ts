import * as AuthenticationActions from './authentication.actions';
import { User } from 'src/app/shared/models/user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authenticationReducer(state: State = initialState, action: AuthenticationActions.AuthenticationActions) {
  switch (action.type) {
    case AuthenticationActions.LOGIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.tokenId, action.payload.expiryDate);
      
      return {
        ...state,
        user
      };

    case AuthenticationActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
}
