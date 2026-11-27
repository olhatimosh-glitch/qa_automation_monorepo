import type { RecipeCategory } from './enums';

export interface TestUser {
  readonly email: string;
  readonly password: string;
}

export interface GeneratedTestUser extends TestUser {
  readonly username: string;
}

export interface RecipeFixture {
  readonly title: string;
  readonly description: string;
  readonly time: string;
  readonly calories: string;
  readonly category: RecipeCategory;
  readonly ingredientName: string;
  readonly ingredientAmount: string;
  readonly instructions: string;
}