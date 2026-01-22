import { test, expect } from '@playwright/test';
import { ShadowElementPage } from '../../src/pages/ShadowElementPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

// This is just for an example of shadow DOM element interaction,
// without any extra setup we can access shadow DOM elements directly using Playwright's built-in support.
test.afterAll('test', async ({ page }) => {
  await page.goto(env.baseUrl);

  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToShadowElement();

  const shadowElementPage = new ShadowElementPage(page);

  await shadowElementPage.clickShadowButton();
  await expect(shadowElementPage.successMessage).toBeVisible();
});
