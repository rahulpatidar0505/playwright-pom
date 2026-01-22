import { test, expect } from '@playwright/test';
import { AutoWaitingPage } from '../../src/pages/AutoWaitingPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

test.beforeEach(async ({ page }) => {
  await page.goto(env.baseUrl);
  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToAutoWaiting();
});

test('Auto waiting test', async ({ page }) => {
  const autoWaitingPage = new AutoWaitingPage(page);
  await autoWaitingPage.clickSlowLoadingButton();
  await expect(autoWaitingPage.processCompletedText).toBeVisible();
  await autoWaitingPage.clickAnimationButton();
  await expect(autoWaitingPage.animationCompletedText).toBeVisible();
});

test('Auto waiting with extended timeout', async ({ page }) => {
  test.setTimeout(120000);
  const autoWaitingPage = new AutoWaitingPage(page);
  await autoWaitingPage.clickSlowLoadingButton();
  await expect(autoWaitingPage.processCompletedText).toBeVisible({
    timeout: 60000,
  });
  await autoWaitingPage.clickAnimationButton();
  await expect(autoWaitingPage.animationCompletedText).toBeVisible({
    timeout: 30000,
  });
});
