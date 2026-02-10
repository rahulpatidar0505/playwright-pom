import { test, expect } from '@playwright/test';
import { ShadowElementPage } from '../../src/pages/ShadowElementPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';


test.beforeEach(async ({ page }) => {
  await page.goto(env.baseUrl);
  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToShadowElement();
});

test('Shadow DOM interaction', async ({ page }) => {
  const shadowElementPage = new ShadowElementPage(page);
  await shadowElementPage.clickShadowButton();
  await expect(shadowElementPage.successMessage).toBeVisible();
});
