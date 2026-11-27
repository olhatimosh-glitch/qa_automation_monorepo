import type { Locator, Page } from '@playwright/test';
import type { RecipeCategory } from '../types/enums';

export class AddRecipePage {
  readonly page: Page;
  readonly photoInput: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly cookingTimeInput: Locator;
  readonly caloriesInput: Locator;
  readonly categoryDropdown: Locator;
  readonly ingredientDropdown: Locator;
  readonly ingredientAmountInput: Locator;
  readonly addIngredientButton: Locator;
  readonly ingredientRows: Locator;
  readonly instructionsInput: Locator;
  readonly publishButton: Locator;
  readonly errorMessages: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.photoInput = page.locator('#photoInput');
    this.titleInput = page.getByTestId('recipe-title-input');
    this.descriptionInput = page.getByTestId(
      'recipe-description-input'
    );
    this.cookingTimeInput = page.getByTestId('cooking-time-input');
    this.caloriesInput = page.getByTestId('calories-input');
    this.categoryDropdown = page.getByTestId('category-dropdown');
    this.ingredientDropdown = page.getByTestId(
      'ingredients-dropdown'
    );
    this.ingredientAmountInput = page.getByTestId(
      'ingredients-amount-input'
    );
    this.addIngredientButton = page.getByRole('button', {
      name: 'Add new Ingredient',
      exact: true,
    });
    this.ingredientRows = page.locator('table tbody tr');
    this.instructionsInput = page.getByTestId('instructions-input');
    this.publishButton = page.getByRole('button', {
      name: 'Publish Recipe',
      exact: true,
    });
    this.errorMessages = page.getByTestId('error-message');
    this.successToast = page.getByText(
      'Recipe created successfully!',
      { exact: true }
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/add-recipe');
  }

  async uploadPhoto(photoPath: string): Promise<void> {
    await this.photoInput.setInputFiles(photoPath);
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  async fillCookingTime(time: string): Promise<void> {
    await this.cookingTimeInput.fill(time);
  }

  async fillCalories(calories: string): Promise<void> {
    await this.caloriesInput.fill(calories);
  }

  async selectCategory(
    categoryName: RecipeCategory
  ): Promise<void> {
    await this.categoryDropdown.getByRole('combobox').click();
    await this.page
      .getByRole('option', {
        name: categoryName,
        exact: true,
      })
      .click();
  }

  async selectIngredient(
    ingredientName: string
  ): Promise<void> {
    await this.ingredientDropdown.getByRole('combobox').click();
    await this.page
      .getByRole('option', {
        name: ingredientName,
        exact: true,
      })
      .click();
  }

  async fillIngredientAmount(amount: string): Promise<void> {
    await this.ingredientAmountInput.fill(amount);
  }

  async addIngredient(): Promise<void> {
    await this.addIngredientButton.click();
  }

  async fillInstructions(instructions: string): Promise<void> {
    await this.instructionsInput.fill(instructions);
  }

  async submit(): Promise<void> {
    await this.publishButton.click();
  }

  async getErrorMessagesTexts(): Promise<string[]> {
    return this.errorMessages.allTextContents();
  }
}