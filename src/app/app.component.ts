import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { LoggingService } from './logging.service';

import * as fromApp from './store/app.reducer';
import * as AuthenticationActions from './shared/services/authentication/store/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    // private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    // this.authenticationService.autoSignIn();
    this.store.dispatch(new AuthenticationActions.AutoLogin());
    this.loggingService.printLog('Hello from #AppComponent in #ngOnInit');
  }

}
