import { test, expect } from '@playwright/test';
const { LoginPage } = require('../../src/pages/LoginPage');
const { NavigationPage } = require('../../src/pages/NavigationPage');
const env = require('../../src/config').default;

test.describe('Authentication Tests', () => {
  test('Handle Authentication - Save State', async ({ page }) => {
    await page.goto(env.baseUrl);
    await page.waitForLoadState('domcontentloaded');

    const navigationPage = new NavigationPage(page);
    await expect(navigationPage.acceptAllButton).toBeVisible({
      timeout: 10000,
    });
    await navigationPage.acceptCookies();
    await navigationPage.goToAuthentication();

    const loginPage = new LoginPage(page);

    await loginPage.login(env.credentials.username, env.credentials.password);

    await expect(page.locator(loginPage.successMessage)).toBeVisible();
    await loginPage.saveAuthState('./auth-state.json');

    console.log('✅ Authentication state saved successfully!');
  });

  test('Use Authentication State', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './auth-state.json',
    });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);

    await page.goto(env.baseUrl);
    await page.waitForLoadState('domcontentloaded');
    await navigationPage.goToAuthentication();

    await expect(loginPage.activeSessionHeading).toBeVisible({
      timeout: 10000,
    });

    await loginPage.clickProtectedAction();
    await expect(loginPage.adminAccessMessage).toBeVisible();

    await context.close();
  });
});
