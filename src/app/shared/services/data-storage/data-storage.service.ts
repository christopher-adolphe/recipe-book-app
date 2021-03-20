import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../recipe/store/recipe.actions';

import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../../models/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private readonly _API_URL = 'https://ng-recipe-book-b1bc4.firebaseio.com/';
  private readonly _RESOURCES = ['recipes.json'];

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.httpClient
      .put(`${this._API_URL}/${this._RESOURCES}`, recipes)
      .subscribe(
        response => console.log(response)
      );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`${this._API_URL}/${this._RESOURCES}`)
      .pipe(
        // Using map operator to transform the response from the get request
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          })
        }),
        // Using tap operator to use the value of the response
        tap(recipes => {
          // this.recipeService.setRecipes(recipes)
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      );
  }

}
