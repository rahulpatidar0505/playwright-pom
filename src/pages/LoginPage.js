class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = '[data-testid="auth-username-input"]';
    this.passwordInput = '[data-testid="auth-password-input"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.successMessage = '//span[contains(text(),"Successfully logged in")]';
    this.activeSessionHeading = page.getByRole('heading', {
      name: '🔓 Active Session',
    });
    this.protectedActionButton = '[data-testid="protected-action-button"]';
    this.adminAccessMessage = page.getByText(
      'Admin action: Full system access granted'
    );
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async saveAuthState(filePath) {
    await this.page.context().storageState({ path: filePath });
  }

  async clickProtectedAction() {
    await this.page.click(this.protectedActionButton);
  }
}

export { LoginPage };
