import { test, expect } from '@playwright/test';
const { AutoWaitingPage } = require('../../src/pages/AutoWaitingPage');
const { NavigationPage } = require('../../src/pages/NavigationPage');
const env = require('../../src/config').default;

test('test', async ({ page }) => {
  await page.goto(env.baseUrl);

  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToAutoWaiting();

  const autoWaitingPage = new AutoWaitingPage(page);

  await autoWaitingPage.clickSlowLoadingButton();
  await expect(autoWaitingPage.processCompletedText).toBeVisible();

  await autoWaitingPage.clickAnimationButton();
  await expect(autoWaitingPage.animationCompletedText).toBeVisible();
});

test.describe('Auto Waiting Examples', () => {
  test('basic auto waiting test', async ({ page }) => {
    test.setTimeout(120000);

    await page.goto(env.baseUrl, { waitUntil: 'networkidle' });

    const navigationPage = new NavigationPage(page);
    await navigationPage.acceptCookies();
    await navigationPage.goToAutoWaiting();

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
});
