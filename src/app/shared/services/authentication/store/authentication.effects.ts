import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as AuthenticationActions from './authentication.actions';
import { AuthenticationResponse } from 'src/app/shared/models/authentication-response.interface';

const authenticationHandler = (response) => {
  const expiryDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));

  return new AuthenticationActions.AuthenticateSuccess({email: response.email, userId: response.localId, tokenId: response.idToken, expiryDate});
};

const errorHandler = (errorResponse) => {
  let errorMessage = 'Sorry, an error occurred during the sign-up process!';

  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthenticationActions.AuthenticateFail(errorMessage));
  }

  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'Sorry, the email address is already in use by another account!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Sorry, there is no user record corresponding to this identifier. The user may have been deleted!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Sorry, the password is invalid or the user does not have a password!';
      break;
    case 'USER_DISABLED':
      errorMessage = 'Sorry, the user account has been disabled by an administrator!';
      break;
  }

  return of(new AuthenticationActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthenticationEffects {
  @Effect()
  authSignUo = this.actions$.pipe(
    ofType(AuthenticationActions.SIGNUP_START),
    switchMap((signupAction: AuthenticationActions.SignupStart) => {
      return this.httpClient.post<AuthenticationResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true
      }).pipe(
        map(response => authenticationHandler(response)),
        catchError(errorResponse => errorHandler(errorResponse))
      )
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    // Using the ofType operator to filter the types of effects we want to continue from the observable chain
    ofType(AuthenticationActions.LOGIN_START),
    switchMap((authData: AuthenticationActions.LoginStart) => {
      return this.httpClient.post<AuthenticationResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(
        map(response => authenticationHandler(response)),
        catchError(errorResponse => errorHandler(errorResponse))
      );
    })
  );

  // Passing the dispatch option to the @Effect decorator to let ngrx effects know that the authSuccess action does not yield to another effect
  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthenticationActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
  
  constructor(private actions$: Actions, private httpClient: HttpClient, private router: Router) {}
}
