import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../shared/models/user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthenticationActions from '../shared/services/authentication/store/authentication.actions';
import * as RecipeActions from '../shared/services/recipe/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _ObsSubscription: Subscription;
  isAuthenticated: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this._ObsSubscription = this.authenticationService.user.subscribe(
    //   (user: User | null) => this.isAuthenticated = !!user
    // );

    this._ObsSubscription = this.store.select('authentication')
    .pipe(
      map(authenticationState => authenticationState.user)
    ).subscribe(
      (user: User | null) => this.isAuthenticated = !!user
    );
  }

  onSaveData() {
    // this.dataStorageService.saveRecipes();
    this.store.dispatch(new RecipeActions.SaveRecipes());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onSignOut() {
    // this.authenticationService.signOut();
    this.store.dispatch(new AuthenticationActions.Logout());
  }

  ngOnDestroy() {
    this._ObsSubscription.unsubscribe();
  }

}
