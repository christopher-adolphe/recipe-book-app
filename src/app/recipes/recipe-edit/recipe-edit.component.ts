import { Component, OnInit } from '@angular/core';

import { Recipe } from 'src/app/shared/models/recipe.interface';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Ingredient } from 'src/app/shared/models/ingredient.interface';
import { DeactivateComponent } from 'src/app/shared/models/deactivate-component.interface';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, DeactivateComponent {
  recipe: Recipe;
  isEditMode: boolean;
  recipeForm: FormGroup;
  name: FormControl;
  description: FormControl;
  imgUrl: FormControl;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (params: Params) => {
        const recipeId = +params['index'];
        this.isEditMode = params['index'] != null;
        this.recipe = this.recipeService.getRecipe(recipeId);

        if (this.isEditMode) {
          this.onInitFilledRecipeForm(this.recipe);
        } else {
          this.onInitRecipeForm();
        }
      }
    );
  }

  onInitRecipeForm() {
    this.name = new FormControl(null, [Validators.required]);
    this.description = new FormControl(null, [Validators.required]);
    this.imgUrl = new FormControl(null, [Validators.required, Validators.pattern("^((ht|f)tp(s?))\://([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(/\S*)?$")]);

    this.recipeForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      imgUrl: this.imgUrl,
      ingredients: this.formBuilder.array([this.formBuilder.group({
        ingredientAmount: [null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]],
        ingredientDescription: [null, [Validators.required]]
      })])
    });
  }

  onInitFilledRecipeForm(recipe: Recipe) {
    this.onInitRecipeForm();
    this.name.setValue(recipe.name);
    this.description.setValue(recipe.description);
    this.imgUrl.setValue(recipe.imgUrl);

    this.onDeleteIngredient(0);
    recipe.ingredients.forEach(ingredient => this.onAddIngredient(ingredient));
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onGetFormControl(index: number, name: string): AbstractControl {
    return this.ingredients.controls[index].get(name);
  }

  onAddIngredient(ingredient: Ingredient | null) {
    this.ingredients.push(this.formBuilder.group({
      ingredientAmount: [ingredient !== null ? ingredient.amount : null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]],
      ingredientDescription: [ingredient !== null ? ingredient.description : null, [Validators.required]]
    }));
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSaveRecipe(isEditMode: boolean) {
    const recipe = {
      name: this.name.value,
      description: this.description.value,
      imgUrl: this.imgUrl.value,
      ingredients: this.ingredients.value.map(ingredient => {
        return { amount: ingredient.ingredientAmount,  description: ingredient.ingredientDescription }
      })
    }
    
    if (isEditMode) {
      this.recipeService.editRecipe(recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.router.navigate(['/recipes'], {relativeTo: this.activateRoute});
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['/recipes'], {relativeTo: this.activateRoute});
  }

  deactivateComponent(): boolean {
    if (this.recipeForm.dirty) {
      return confirm('Do you want to discard the changes on this recipe ?');
    } else {
      return true;
    }
  }

}
