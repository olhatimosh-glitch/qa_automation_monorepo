import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { generateTestUser } from '../helpers/testData.js';

test.use({
  baseURL: process.env.BASE_URL || 'http://localhost:5173',
});

test.describe('Вхід у Tasteorama (Page Object)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('успішний вхід переводить на головну сторінку', async ({ page }) => {
    await Promise.all([
      page.waitForResponse((res) => res.url().includes('/auth/login')),
      loginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASSWORD),
    ]);

    await expect(page).toHaveURL('/');
  });

  test('неправильний пароль показує помилку і не переводить на головну', async ({ page }) => {
    await loginPage.login(process.env.TEST_EMAIL, 'wrong-password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL('/auth/login');
  });
});

test.describe('Перевірка хелпера generateTestUser', () => {
  test('повертає обʼєкт з очікуваною формою', () => {
    const testUser = generateTestUser();
    const keys = Object.keys(testUser);

    expect(keys).toContain('username');
    expect(keys).toContain('email');
    expect(keys).toContain('password');
    expect(typeof testUser.email).toBe('string');
  });

  test('копія через spread рівна оригіналу за вмістом, хоч це інший обʼєкт', () => {
    const testUser = generateTestUser();
    const copy = { ...testUser };

    expect(copy).toEqual(testUser);
    expect(copy === testUser).toBe(false);
  });

  test('spread дає варіацію без зміни оригіналу', () => {
    const testUser = generateTestUser();
    const invalidUser = { ...testUser, password: '' };

    expect(invalidUser.password).toBe('');
    expect(testUser.password).not.toBe('');
  });

  test('будує імʼя та пошту з переданих prefix і domain', () => {
    const testUser = generateTestUser({ prefix: 'qa', domain: 'example.com' });

    expect(testUser.username).toMatch(/^qa_\d+$/);
    expect(testUser.email).toBe(`${testUser.username}@example.com`);
  });
});

test.describe('Вхід неіснуючого користувача', () => {
  test('згенерований хелпером користувач бачить помилку входу', async ({ page }) => {
    const nonExistentUser = generateTestUser();
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(nonExistentUser.email, nonExistentUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL('/auth/login');
  });
});