import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../authentication/authentication.service';
import * as fromApp from '../../../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
    // return this.authenticationService.user.pipe(
    //   take(1),
    //   map(user => {
    //     const isUserAuthenticated = !!user;

    //     if (isUserAuthenticated) {
    //       return true;
    //     }

    //     return this.router.createUrlTree(['/auth']);
    //   }),
    //   tap(authenticatedUser => {
    //     if (!authenticatedUser) {
    //       this.router.navigate(['/auth'])
    //     }
    //   })
    // );

    return this.store.select('authentication').pipe(
      take(1),
      map(authenticationState => authenticationState.user),
      map(user => {
        const isUserAuthenticated = !!user;

        if (isUserAuthenticated) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);
      })
    );
  }

}
