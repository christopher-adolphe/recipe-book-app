import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { UserAuthentication } from '../shared/models/user-authentication.interface';
import { AuthenticationResponse } from '../shared/models/authentication-response.interface';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthenticationActions from '../shared/services/authentication/store/authentication.actions';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private _ObsSubscription: Subscription;
  private _closeSubscription: Subscription;
  private _storeSubscription: Subscription;
  signInForm: FormGroup;
  email: FormControl;
  password: FormControl;
  isSignInMode: boolean;
  isLoading: boolean;
  error: string;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.isSignInMode = true;
    // this.isLoading = false;
    // this.error = null;
    this._storeSubscription = this.store.select('authentication').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.error = authState.authError;

      if (this.error) {
        this.showAlert(this.error);
      }
    });
    
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

    // this.isLoading = true;

    if (this.isSignInMode) {
      // authenticationObs = this.authenticationService.onSignIn(userAuth);
      this.store.dispatch(new AuthenticationActions.LoginStart({email: userAuth.email, password: userAuth.password}));
    } else {
      // authenticationObs = this.authenticationService.onSignUp(userAuth)
      this.store.dispatch(new AuthenticationActions.SignupStart({email: userAuth.email, password: userAuth.password}));
    }

    // authenticationObs.subscribe(
    //   (response: AuthenticationResponse) => {
    //     // console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error => {
    //     // console.log(error);
    //     this.error = error;
    //     this.showAlert(error);
    //     this.isLoading = false;
    //   }
    // );

    this.signInForm.reset();
  }

  onHandleAlert() {
    // this.error = null;
    this.store.dispatch(new AuthenticationActions.ClearError());
  }

  ngOnDestroy() {
    // this._ObsSubscription.unsubscribe();
    if (this._closeSubscription) {
      this._closeSubscription.unsubscribe();
    }

    if (this._storeSubscription) {
      this._storeSubscription.unsubscribe();
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
