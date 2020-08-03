import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from 'src/app/shared/models/recipe.interface';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onSelectRecipe(index: number) {
    // this.recipeService.selectedRecipe.emit(this.recipe);
    this.router.navigate(['/recipes', index], {relativeTo: this.activateRoute});
  }

}
