import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import * as RecipeActions from './recipe.actions';
import { Recipe } from '../../../models/recipe.interface';

@Injectable()
export class RecipeEffects {
  private readonly _API_URL = 'https://ng-recipe-book-b1bc4.firebaseio.com/';
  private readonly _RESOURCES = ['recipes.json'];

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.httpClient.get<Recipe[]>(`${this._API_URL}/${this._RESOURCES}`)
    }),
    map((recipes: Recipe[]) => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      })
    }),
    map(recipes => new RecipeActions.SetRecipes(recipes))
  );

  @Effect({ dispatch: false })
  saveRecipes = this.actions$.pipe(
    ofType(RecipeActions.SAVE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipeState]) => {
      return this.httpClient.put(`${this._API_URL}/${this._RESOURCES}`, recipeState.recipes);
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromApp.AppState>) {}
}
