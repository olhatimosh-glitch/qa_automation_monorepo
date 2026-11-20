import { test, expect } from '@playwright/test';

test.use({
  baseURL: process.env.BASE_URL || 'http://localhost:5173',
});

test.describe('Вхід у Tasteorama', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('успішний вхід переводить на головну сторінку', async ({ page }) => {
    const emailField = page.locator('#email');
    const passwordField = page.locator('#password');
    const submitButton = page.locator('button[type="submit"]');

    await emailField.fill(process.env.TEST_EMAIL);
    await passwordField.fill(process.env.TEST_PASSWORD);
    await submitButton.click();

    await expect(page).toHaveURL('/');
  });

  test('неправильний пароль показує помилку і не змінює сторінку', async ({ page }) => {
    const emailField = page.locator('#email');
    const passwordField = page.locator('#password');
    const submitButton = page.locator('button[type="submit"]');
    const errorToast = page.locator(
      '.Toastify__toast--error[role="alert"]',
    );

    await emailField.fill(process.env.TEST_EMAIL);
    await passwordField.fill('wrong123');
    await submitButton.click();

    // Текст помилки повністю статичний, тому використовуємо точний toHaveText.
    await expect(errorToast).toHaveText('UnauthorizedError');
    await expect(page).toHaveURL('/auth/login');
  });
});

test.describe('Список рецептів', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('перша картка списку рецептів видима', async ({ page }) => {
    const recipeCards = page.locator('article');

    await expect(recipeCards).not.toHaveCount(0);

    // Використовуємо first(), бо вимога тесту стосується саме першої картки списку.
    await expect(recipeCards.first()).toBeVisible();
  });

  test('перехід уперед активує кнопку попередньої сторінки', async ({ page }) => {
    // Локатори обрані за стабільними aria-label, перевіреними через DevTools.
    const previousPageButton = page.getByRole('button', {
      name: 'previous page',
    });
    const nextPageButton = page.getByRole('button', {
      name: 'next page',
    });

    await expect(previousPageButton).toBeDisabled();

    await nextPageButton.click();

    await expect(previousPageButton).toBeEnabled();
  });
});