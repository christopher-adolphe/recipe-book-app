import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string,
      userId: string,
      tokenId: string,
      expiryDate: Date
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthenticationActions = Login | Logout;
