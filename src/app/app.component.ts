import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.authenticationService.autoSignIn();
    this.loggingService.printLog('Hello from #AppComponent in #ngOnInit');
  }

}
