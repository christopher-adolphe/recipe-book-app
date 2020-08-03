import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder/placeholder.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {}
