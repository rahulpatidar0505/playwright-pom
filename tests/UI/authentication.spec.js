import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

test.describe('Authentication Tests', () => {
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
