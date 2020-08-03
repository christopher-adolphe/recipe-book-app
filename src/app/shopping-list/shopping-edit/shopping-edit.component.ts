import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/models/ingredient.interface';
import { ShoppingListService } from '../../shared/services/shopping-list/shopping-list.service';
import * as ShoppingListActions from '../../shared/services/shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm', {static: false}) shoppingListForm: NgForm;
  private _ObsSubscription: Subscription;
  selectedIngredientIndex: number;
  selectedIngredient: Ingredient;
  isEditMode: boolean;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  ngOnInit() {
    this.isEditMode = false;

    this._ObsSubscription = this.shoppingListService.selectedIngredient.subscribe(
      (index: number) => {
        this.isEditMode = true;
        this.selectedIngredientIndex = index;
        this.selectedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          description: this.selectedIngredient.description,
          amount: this.selectedIngredient.amount
        });
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
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      this.shoppingListService.updateIngredient(this.selectedIngredientIndex, newIngredient);
    }

    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);

    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  ngOnDestroy() {
    this._ObsSubscription.unsubscribe();
  }
}
