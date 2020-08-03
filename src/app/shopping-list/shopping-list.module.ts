import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    SharedModule,
    ShoppingListRoutingModule
  ],
  providers: [LoggingService]
})
export class ShoppingListModule {}
