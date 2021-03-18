import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import { UserAuthentication } from '../../models/user-authentication.interface';
import { AuthenticationResponse } from '../../models/authentication-response.interface';
import { User } from '../../models/user.model';
import * as fromApp from '../../../store/app.reducer';
import * as fromAuthenticationActions from './store/authentication.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _tokenTimer: any;
  // user = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  // private errorHanlder(errorResponse: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'Sorry, an error occurred during the sign-up process!';
  //   // console.log('errorHanlder: ', errorResponse);

  //   if (!errorResponse.error || !errorResponse.error.error) {
  //     return throwError(errorMessage);
  //   }

  //   switch (errorResponse.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'Sorry, the email address is already in use by another account!';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'Sorry, there is no user record corresponding to this identifier. The user may have been deleted!';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'Sorry, the password is invalid or the user does not have a password!';
  //       break;
  //     case 'USER_DISABLED':
  //       errorMessage = 'Sorry, the user account has been disabled by an administrator!';
  //       break;
  //   }

  //   return throwError(errorMessage);
  // }

  // private authenticationHandler(email: string, userId: string, tokenId: string, expiresIn: number) {
  //   const expiryDate = new Date(new Date().getTime() + (expiresIn * 1000));
  //   const user = new User(email, userId, tokenId, expiryDate);
  //   // this.user.next(user);
  //   this.store.dispatch(new fromAuthenticationActions.AuthenticateSuccess({email, userId, tokenId, expiryDate}));

  //   this.autoSignOut(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // onSignUp(userAuth: UserAuthentication): Observable<AuthenticationResponse> {
  //   return this.httpClient.post<AuthenticationResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, userAuth)
  //     .pipe(
  //       catchError(this.errorHanlder),
  //       tap(response => this.authenticationHandler(response.email, response.localId, response.idToken, +response.expiresIn))
  //     );
  // }

  // onSignIn(userAuth: UserAuthentication): Observable<AuthenticationResponse> {
  //   return this.httpClient.post<AuthenticationResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, userAuth)
  //     .pipe(
  //       catchError(this.errorHanlder),
  //       tap(response => this.authenticationHandler(response.email, response.localId, response.idToken, +response.expiresIn))
  //     );
  // }

  // autoSignIn() {
  //   const user: {
  //     email: string;
  //     userId: string;
  //     _tokenId: string;
  //     _tokenExpiryDate: string} = JSON.parse(localStorage.getItem('userData'));

  //   if (!user) {
  //     return;
  //   }

  //   const authenticatedUser = new User(user.email, user.userId, user._tokenId, new Date(user._tokenExpiryDate));

  //   if (authenticatedUser.tokenId) {
  //     // this.user.next(authenticatedUser);
  //     this.store.dispatch(new fromAuthenticationActions.AuthenticateSuccess({email: authenticatedUser.email, userId: authenticatedUser.userId, tokenId: authenticatedUser.tokenId, expiryDate: new Date(user._tokenExpiryDate)}))
      
  //     const duration: number = new Date(user._tokenExpiryDate).getTime() - new Date().getTime();
  //     this.autoSignOut(duration);
  //   }
  // }

  // signOut() {
  //   // this.user.next(null);
  //   this.store.dispatch(new fromAuthenticationActions.Logout());

  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');

  //   if (this._tokenTimer) {
  //     clearTimeout(this._tokenTimer);
  //   }

  //   this._tokenTimer = null;
  // }

  setLogoutTimer(duration: number) {
    this._tokenTimer = setTimeout(() => this.store.dispatch(new fromAuthenticationActions.Logout() ), duration);
  }

  clearLogoutTimer() {
    if (this._tokenTimer) {
      clearTimeout(this._tokenTimer);
    }

    this._tokenTimer = null;
  }
}
