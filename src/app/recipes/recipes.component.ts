import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../shared/models/recipe.interface';
import { RecipeService } from '../shared/services/recipe/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  private _ObsSubscription: Subscription;
  selectedRecipe: Recipe;
  isRecipeSelected: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // this.selectedRecipe = {} as Recipe;
    this.isRecipeSelected = false;
    this._ObsSubscription = this.recipeService.selectedRecipe.subscribe(
      (emitedRecipe: Recipe) => {
        this.selectedRecipe = emitedRecipe;
        this.isRecipeSelected = true;
      }
    );
  }

  ngOnDestroy() {
    this._ObsSubscription.unsubscribe();
  }

}
