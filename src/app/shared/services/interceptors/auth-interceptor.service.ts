import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

import { AuthenticationService } from '../authentication/authentication.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authenticationService.user
      .pipe(
        take(1),
        exhaustMap(user => {
          if (!user) {
            return next.handle(request);
          }
          
          const modifiedRequest = request.clone({ params: new HttpParams().set('auth', user.tokenId) });
          return next.handle(modifiedRequest);
        })
      )
  }
}
