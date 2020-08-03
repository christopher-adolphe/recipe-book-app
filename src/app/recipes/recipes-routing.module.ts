import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeDefaultComponent } from './recipe-default/recipe-default.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

import { AuthenticationGuardService } from '../shared/services/guards/authentication-guard.service';
import { RecipeResolverService } from '../shared/resolvers/recipe-resolver.service';

const routes: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthenticationGuardService], children: [
    { path: '', component: RecipeDefaultComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':index', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
    { path: ':index/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule{}
