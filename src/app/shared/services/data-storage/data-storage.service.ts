import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../../models/recipe.interface';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private readonly _API_URL = 'https://ng-recipe-book-b1bc4.firebaseio.com/';
  private readonly _RESOURCES = ['recipes.json'];

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authenticationService: AuthenticationService
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
        tap(recipes => this.recipeService.setRecipes(recipes))
      );
  }

}
