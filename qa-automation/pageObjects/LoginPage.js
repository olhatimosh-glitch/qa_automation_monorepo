export class LoginPage {
  #emailInput;
  #passwordInput;
  #loginButton;

  constructor(page) {
    this.page = page;
    this.#emailInput = page.locator('#email');
    this.#passwordInput = page.locator('#password');
    this.#loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.Toastify__toast--error[role="alert"]');
  }

  async open() {
    await this.page.goto('/auth/login');
  }

  async login(email, password) {
    await this.#emailInput.fill(email);
    await this.#passwordInput.fill(password);
    await this.#loginButton.click();
  }
}