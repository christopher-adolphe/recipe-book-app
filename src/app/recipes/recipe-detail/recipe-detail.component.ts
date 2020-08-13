import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from 'src/app/shared/models/recipe.interface';
import { Ingredient } from 'src/app/shared/models/ingredient.interface';

import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeIndex: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipeIndex = +params['index'];
        this.recipe = this.recipeService.getRecipe(this.recipeIndex);
      }
    );
  }

  onAddToList(ingredients: Ingredient[]) {
    if (ingredients && ingredients.length > 0) {
      // this.shoppingListService.addMultipleIngredients(ingredients);
    }
  }

  onEditRecipe() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit'], {relativeTo: this.activatedRoute});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes'], {relativeTo: this.activatedRoute});
  }

}
