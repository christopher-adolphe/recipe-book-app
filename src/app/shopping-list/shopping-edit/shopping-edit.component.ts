import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/models/ingredient.interface';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../shared/services/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  private _ObsSubscription: Subscription;
  // selectedIngredientIndex: number;
  selectedIngredient: Ingredient;
  isEditMode: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.isEditMode = false;

    // this._ObsSubscription = this.shoppingListService.selectedIngredient.subscribe(
    //   (index: number) => {
    //     this.isEditMode = true;
    //     this.selectedIngredientIndex = index;
    //     this.selectedIngredient = this.shoppingListService.getIngredient(index);
    //     this.shoppingListForm.setValue({
    //       description: this.selectedIngredient.description,
    //       amount: this.selectedIngredient.amount
    //     });
    //   }
    // );

    this._ObsSubscription = this.store.select('shoppingList').subscribe(
      stateData => {
        if (stateData.selectedIngredientIndex > -1) {
          this.isEditMode = true;
          this.selectedIngredient = stateData.selectedIngredient;
          this.shoppingListForm.setValue({
            description: this.selectedIngredient.description,
            amount: this.selectedIngredient.amount
          });
        } else {
          this.isEditMode = false;
        }
      }
    );
  }

  onAdd() {
    const newIngredient: Ingredient = {
      amount: this.shoppingListForm.value.amount,
      description: this.shoppingListForm.value.description
    };

    if (!this.isEditMode) {
      // this.shoppingListService.addIngredient(newIngredient);

      // Using the dispatch method from the ngrx store service to dispatch the action we've defined
      // Passing an object instantiated from the class of the action we want to dispatch
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      // this.shoppingListService.updateIngredient(this.selectedIngredientIndex, newIngredient);

      // Using the dispatch method from the ngrx store service to dispatch the action we've defined
      // Passing an object instantiated from the class of the action we want to dispatch
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    }

    this.onClear();
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);

    // Using the dispatch method from the ngrx store service to dispatch the action we've defined
    // Passing an object instantiated from the class of the action we want to dispatch
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());

    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    this._ObsSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
