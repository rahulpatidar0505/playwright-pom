import { test, expect } from '@playwright/test';
const { ShadowElementPage } = require('../../src/pages/ShadowElementPage');
const { NavigationPage } = require('../../src/pages/NavigationPage');
const env = require('../../src/config').default;

// This is just for an example of shadow DOM element interaction,
// without any extra setup we can access shadow DOM elements directly using Playwright's built-in support.
test('test', async ({ page }) => {
  await page.goto(env.baseUrl);

  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToShadowElement();

  const shadowElementPage = new ShadowElementPage(page);

  await shadowElementPage.clickShadowButton();
  await expect(shadowElementPage.successMessage).toBeVisible();
});
