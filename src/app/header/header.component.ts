import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/services/data-storage/data-storage.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { User } from '../shared/models/user.model';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _ObsSubscription: Subscription;
  isAuthenticated: boolean;

  constructor(
    private dataStorageService: DataStorageService,
    private authenticationService: AuthenticationService,
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
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSignOut() {
    this.authenticationService.signOut();
  }

  ngOnDestroy() {
    this._ObsSubscription.unsubscribe();
  }

}
