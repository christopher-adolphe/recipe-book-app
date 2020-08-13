import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../authentication/authentication.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // return this.authenticationService.user
    //   .pipe(
    //     take(1),
    //     exhaustMap(user => {
    //       if (!user) {
    //         return next.handle(request);
    //       }
          
    //       const modifiedRequest = request.clone({ params: new HttpParams().set('auth', user.tokenId) });
    //       return next.handle(modifiedRequest);
    //     })
    //   );

    return this.store.select('authentication').pipe(
      take(1),
      map(authenticationState => authenticationState.user),
      exhaustMap(
        user => {
          if (!user) {
            return next.handle(request);
          }
          
          const modifiedRequest = request.clone({ params: new HttpParams().set('auth', user.tokenId) });
          return next.handle(modifiedRequest);
        }
      )
    );
  }
}
