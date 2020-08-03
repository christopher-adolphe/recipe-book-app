import { Ingredient } from './ingredient.interface';

export interface Recipe {
  id?: string;
  name: string;
  description: string;
  imgUrl: string;
  ingredients: Ingredient[];
}
