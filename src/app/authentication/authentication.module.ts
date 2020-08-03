import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthenticationComponent }]),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthenticationModule {}
