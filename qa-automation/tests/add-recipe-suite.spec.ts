import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { DEFAULT_USER } from '../data/test-user';
import { AddRecipePage } from '../pageObjects/AddRecipePage';
import { LoginPage } from '../pageObjects/LoginPage';
import { RecipeCategory } from '../types/enums';
import type { RecipeFixture } from '../types/fixtures';

const BASE_URL =
  process.env.BASE_URL ?? 'http://localhost:5173';

const HOME_PATH = '/';
const RECIPE_DETAILS_PATH_PREFIX = '/recipes/';
const REQUIRED_FIELD_MESSAGE = 'Required';
const EXPECTED_INGREDIENT_ROW_COUNT = 1;

const TEST_PHOTO_PATH = resolve(
  process.cwd(),
  'data',
  'test-photo.png'
);

const testRecipe: RecipeFixture = {
  title: `Automated Soup ${Date.now()}`,
  description: 'A recipe created by an automated Playwright test.',
  time: '30',
  calories: '350',
  category: RecipeCategory.Soup,
  ingredientName: 'Egg',
  ingredientAmount: '2 pcs',
  instructions: 'Mix the ingredients and cook until ready.',
};

test.use({
  baseURL: BASE_URL,
});

test.describe('Додавання рецепта', () => {
  let loginPage: LoginPage;
  let addRecipePage: AddRecipePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addRecipePage = new AddRecipePage(page);

    await loginPage.open();
    await loginPage.login(
      DEFAULT_USER.email,
      DEFAULT_USER.password
    );

    await expect(page).toHaveURL(HOME_PATH);
    await addRecipePage.open();
  });

  test('успішно створює рецепт з усіма полями', async ({
    page,
  }) => {
    await addRecipePage.uploadPhoto(TEST_PHOTO_PATH);
    await addRecipePage.fillTitle(testRecipe.title);
    await addRecipePage.fillDescription(testRecipe.description);
    await addRecipePage.fillCookingTime(testRecipe.time);
    await addRecipePage.fillCalories(testRecipe.calories);
    await addRecipePage.selectCategory(testRecipe.category);
    await addRecipePage.selectIngredient(
      testRecipe.ingredientName
    );
    await addRecipePage.fillIngredientAmount(
      testRecipe.ingredientAmount
    );
    await addRecipePage.addIngredient();

    await expect(addRecipePage.ingredientRows).toHaveCount(
      EXPECTED_INGREDIENT_ROW_COUNT
    );

    await addRecipePage.fillInstructions(
      testRecipe.instructions
    );
    await addRecipePage.submit();

    await expect(addRecipePage.successToast).toBeVisible();

    await expect(page).toHaveURL((url) =>
      url.pathname.startsWith(RECIPE_DETAILS_PATH_PREFIX)
    );
  });

  test('порожня форма показує повідомлення обовʼязкових полів', async () => {
    await addRecipePage.submit();

    const errorMessages =
      await addRecipePage.getErrorMessagesTexts();

    expect(errorMessages.length).toBeGreaterThan(0);
    expect(errorMessages).toContain(REQUIRED_FIELD_MESSAGE);
  });
});