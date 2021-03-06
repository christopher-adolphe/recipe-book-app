import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { UserAuthentication } from '../shared/models/user-authentication.interface';
import { AuthenticationResponse } from '../shared/models/authentication-response.interface';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private _ObsSubscription: Subscription;
  private _closeSubscription: Subscription;
  signInForm: FormGroup;
  email: FormControl;
  password: FormControl;
  isSignInMode: boolean;
  isLoading: boolean;
  error: string;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.isSignInMode = true;
    this.isLoading = false;
    this.error = null;
    this.onInitSignInForm();
  }

  onInitSignInForm() {
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(6)]);
    this.signInForm = new FormGroup({
      email: this.email,
      password: this.password
    });

    // this._ObsSubscription = this.signInForm.statusChanges.subscribe(state => {
    //   if (state === 'INVALID') {
    //     setTimeout(() => this.error = null, 8000);
    //   }
    // });
  }

  onSwitchMode() {
    this.isSignInMode = !this.isSignInMode;
  }

  onSubmit() {
    const userAuth: UserAuthentication = {
      email: (this.email.value).trim(),
      password: (this.password.value).trim(),
      returnSecureToken: true
    };
    let authenticationObs: Observable<AuthenticationResponse>;

    this.isLoading = true;

    if (this.isSignInMode) {
      authenticationObs = this.authenticationService.onSignIn(userAuth);
    } else {
      authenticationObs = this.authenticationService.onSignUp(userAuth)
    }

    authenticationObs.subscribe(
      (response: AuthenticationResponse) => {
        // console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        // console.log(error);
        this.error = error;
        this.showAlert(error);
        this.isLoading = false;
      }
    );

    this.signInForm.reset();
  }

  onHandleAlert() {
    this.error = null;
  }

  ngOnDestroy() {
    // this._ObsSubscription.unsubscribe();
    if (this._closeSubscription) {
      this._closeSubscription.unsubscribe();
    }
  }

  private showAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    this._closeSubscription = componentRef.instance.close.subscribe(() => {
      this._closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
