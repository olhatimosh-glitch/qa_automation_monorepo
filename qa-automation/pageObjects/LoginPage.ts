import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly errorMessage: Locator;
  readonly #emailInput: Locator;
  readonly #passwordInput: Locator;
  readonly #loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.#emailInput = page.locator('#email');
    this.#passwordInput = page.locator('#password');
    this.#loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator(
      '.Toastify__toast--error[role="alert"]'
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.#emailInput.fill(email);
    await this.#passwordInput.fill(password);
    await this.#loginButton.click();
  }
}