import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Recipe } from '../../models/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[];
  public selectedRecipe = new Subject<Recipe>();
  public recipesUpdated = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient) {
    this.recipes = [];
    // this.recipes = [
    //   {
    //     id: '-M5GabdA3fa6c6HLcTw4',
    //     name: 'Spaghetti Carbonara',
    //     description: 'Discover how to make superb spaghetti carbonara. This cheesy pasta dish is an Italian favourite and with the right technique, you can make it perfect every time.',
    //     imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg',
    //     ingredients: [
    //       {amount: 2, description: 'spaghetti'},
    //       {amount: 3, description: 'slices of smoked marlin'},
    //       {amount: 3, description: 'mozzarella'}
    //     ]
    //   },
    //   {
    //     id: '-M5Gb1Gbs_tALbpYvAYo',
    //     name: 'Creamy salmon, leek & potato traybake',
    //     description: 'Nestle leeks, potato and capers around salmon fillets to make this easy traybake for two. It\'s great as an midweek meal, or for a more romantic occasion.',
    //     imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/creamy-salmon-leek-potato-traybake-367b3ff.jpg',
    //     ingredients: [
    //       {amount: 4, description: 'potatoes'},
    //       {amount: 2, description: 'salmon filet'}
    //     ]
    //   },
    //   {
    //     id: '-M5GbFCo4TjirwRZfJxk',
    //     name: 'Lamb with warm potato & olive salad',
    //     description: 'This restaurant-standard dish is simple to make but worthy of any dinner party. Cooking the lamb this way stops it drying out and gives it a subtle flavour.',
    //     imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/lamb-with-warm-potato-salad-970c0f0.jpg',
    //     ingredients: [
    //       {amount: 4, description: 'potatoes'},
    //       {amount: 2, description: 'lbs of lamb meat'},
    //       {amount: 1, description: 'salade'}
    //     ]
    //   },
    //   {
    //     id: '-M5GbSuKzDNMA5ffo1Xe',
    //     name: 'Crab & asparagus pappardelle',
    //     description: 'Crab is so good to serve in the spring – combined with fresh egg pappardelle and asparagus, it makes a stunning seasonal dish. Pair it with a rocket salad.',
    //     imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg',
    //     ingredients: [
    //       {amount: 2, description: 'Crabs'},
    //       {amount: 1, description: 'lbs of asparagus'},
    //       {amount: 3, description: 'eggs'}
    //     ]
    //   },
    //   {
    //     id: '-M5GbSuKzDNMA5ffo1Xe',
    //     name: 'Meatball & garlic bread traybake',
    //     description: 'Make this comforting meatball and garlic bread traybake for a dinner the whole family will enjoy. You could buy a pack of meatballs if you’re short on time.',
    //     imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/meatballsgarlic-bread-9245ad6.jpg',
    //     ingredients: [
    //       {amount: 350, description: 'g Turkey thigh mince'},
    //       {amount: 1, description: 'large onion'},
    //       {amount: 3, description: 'garlic cloves'}
    //     ]
    //   }
    // ];

    // this.recipes = [
    //   {
    //     name: 'Spaghetti Carbonara',
    //     description: 'Discover how to make superb spaghetti carbonara. This cheesy pasta dish is an Italian favourite and with the right technique, you can make it perfect every time.',
    //     imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg',
    //     ingredients: [
    //       {amount: 2, description: 'spaghetti'},
    //       {amount: 3, description: 'slices of smoked marlin'},
    //       {amount: 3, description: 'mozzarella'}
    //     ]
    //   },
    //   {
    //     name: 'Creamy salmon, leek & potato traybake',
    //     description: 'Nestle leeks, potato and capers around salmon fillets to make this easy traybake for two. It\'s great as an midweek meal, or for a more romantic occasion.',
    //     imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/01/creamy-salmon-leek-potato-traybake.jpg?itok=GbceIafI',
    //     ingredients: [
    //       {amount: 4, description: 'potatoes'},
    //       {amount: 2, description: 'salmon filet'}
    //     ]
    //   },
    //   {
    //     name: 'Lamb with warm potato & olive salad',
    //     description: 'This restaurant-standard dish is simple to make but worthy of any dinner party. Cooking the lamb this way stops it drying out and gives it a subtle flavour.',
    //     imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/03/lamb-with-warm-potato-salad.jpg?itok=lacrKYjD',
    //     ingredients: [
    //       {amount: 4, description: 'potatoes'},
    //       {amount: 2, description: 'lbs of lamb meat'},
    //       {amount: 1, description: 'salade'}
    //     ]
    //   },
    //   {
    //     name: 'Crab & asparagus pappardelle',
    //     description: 'Crab is so good to serve in the spring – combined with fresh egg pappardelle and asparagus, it makes a stunning seasonal dish. Pair it with a rocket salad.',
    //     imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/04/crab-asparagus-pappardelle.jpg?itok=8e_7_oJh',
    //     ingredients: [
    //       {amount: 2, description: 'Crabs'},
    //       {amount: 1, description: 'lbs of asparagus'},
    //       {amount: 3, description: 'eggs'}
    //     ]
    //   }
    // ];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
    // return this.httpClient
    //   .get<Recipe[]>('https://ng-recipe-book-b1bc4.firebaseio.com/recipes.json')
    //   .pipe(
    //     map(response => {
    //       const recipes: Recipe[] = [];

    //       for (const key in response) {
    //         if (response.hasOwnProperty(key)) {
    //           recipes.push({...response[key], id: key})
    //         }
    //       }

    //       return recipes;
    //     })
    //   );
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next(this.recipes.slice());
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  editRecipe(editedRecipe: Recipe) {
    this.recipes.filter(recipe => recipe.id === editedRecipe.id).map(recipe => {
      recipe.name = editedRecipe.name;
      recipe.description = editedRecipe.description;
      recipe.imgUrl = editedRecipe.imgUrl;
      recipe.ingredients = editedRecipe.ingredients;
    });
    this.recipesUpdated.next(this.recipes);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesUpdated.next(this.recipes);
  }

}
