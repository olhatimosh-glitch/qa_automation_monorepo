import { test, expect } from '@playwright/test';

test.use({
  baseURL: process.env.BASE_URL || 'http://localhost:5173',
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