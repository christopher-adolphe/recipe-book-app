import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../../shared/services/recipe/store/recipe.actions';
import * as ShoppingListActions from '../../shared/services/shopping-list/store/shopping-list.actions';

import { Recipe } from 'src/app/shared/models/recipe.interface';
import { Ingredient } from 'src/app/shared/models/ingredient.interface';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [
    trigger('recipeDetail', [
      state('slideInRight', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(50%)'
        }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({
          transform: 'translateX(50%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeIndex: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // 1st approach: using nested subscriptions
    // this.activatedRoute.params.subscribe(
    //   (params: Params) => {
    //     this.recipeIndex = +params['index'];
    //     this.recipe = this.recipeService.getRecipe(this.recipeIndex);
    //     this.store.select('recipes')
    //       .pipe(
    //         map(recipeState => {
    //           return recipeState.recipes.find((recipe, index) => {
    //             return index === this.recipeIndex;
    //           });
    //         })
    //       )
    //       .subscribe((recipe: Recipe) => this.recipe = recipe);
    //   }
    // );

    // 2nd approach: using rxjs operators to switch between observables
    this.activatedRoute.params
      .pipe(
        map((params: Params) => +params['index']),
        switchMap(recipeIndex => {
          this.recipeIndex = recipeIndex;

          return this.store.select('recipes')
        }),
        map(recipeState => {
          return recipeState.recipes.find((_, index) => {
            return index === this.recipeIndex;
          });
        })
      )
      .subscribe((recipe: Recipe) => this.recipe = recipe);

    // this.activatedRoute.params.subscribe(
    //   (params: Params) => {
    //     this.recipeIndex = +params['index'];
    //     this.recipe = this.recipeService.getRecipe(this.recipeIndex);
    //   }
    // );
  }

  onAddToList(ingredients: Ingredient[]) {
    if (ingredients && ingredients.length > 0) {
      // this.shoppingListService.addMultipleIngredients(ingredients);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }
  }

  onEditRecipe() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit'], {relativeTo: this.activatedRoute});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipeIndex);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeIndex));
    this.router.navigate(['/recipes'], {relativeTo: this.activatedRoute});
  }

}
