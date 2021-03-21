import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

import { Recipe } from '../../shared/models/recipe.interface'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
    trigger('recipeItem', [
      state('slideInLeft', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-50%)'
        }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({
          transform: 'translateX(-50%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private _obsSubscription: Subscription
  recipes: Recipe[];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this._obsSubscription =  this.store.select('recipes')
      .pipe(
        map(recipeState => recipeState.recipes)
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes =  recipes;
      });

    // this.recipes = this.recipeService.getRecipes();

    // this._obsSubscription =  this.recipeService.recipesUpdated.subscribe(
    //   (recipes: Recipe[]) => {
    //     console.log('recipe-list.component: ', recipes);
    //     this.recipes = recipes;
    //   }
    // );

    // this.recipeService.getRecipes().subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //     this.recipeService.loadRecipes(recipes);
    //   }
    // );
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new'], {relativeTo: this.activateRoute});
  }

  ngOnDestroy() {
    this._obsSubscription.unsubscribe();
  }

}
