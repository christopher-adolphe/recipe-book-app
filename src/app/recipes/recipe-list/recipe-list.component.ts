import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../../shared/models/recipe.interface'
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private _obsSubscription: Subscription
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this._obsSubscription =  this.recipeService.recipesUpdated.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

    // this.recipeService.getRecipes().subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //     this.recipeService.loadRecipes(recipes);
    //   }
    // );
  }

  ngOnDestroy() {
    this._obsSubscription.unsubscribe();
  }

}
