const playwright = require('@playwright/test');
const base = playwright.test;
const expect = playwright.expect;
const { NavigationPage } = require('../pages/NavigationPage');
const env = require('../config').default;

/**
 * Custom test fixture that extends Playwright's base test
 * Automatically handles:
 * - Navigation to baseUrl
 * - Cookie consent acceptance
 * - Provides NavigationPage instance for further navigation
 * 
 * Usage in spec files:
 * - Import: const { test, expect } = require('../../src/fixtures/baseFixture');
 * - Use basePage fixture: test('my test', async ({ basePage }) => { ... })
 * - Access page: basePage.page
 * - Access navigationPage: basePage.navigationPage
 * - Direct page access still available: test('my test', async ({ page }) => { ... })
 */
const test = base.extend({
  // Auto-navigate and accept cookies before each test
  basePage: async ({ page }, use) => {
    await page.goto(env.baseUrl);
    const navigationPage = new NavigationPage(page);
    await navigationPage.acceptCookies();
    await use({ page, navigationPage });
  },
});

module.exports = { test, expect };
