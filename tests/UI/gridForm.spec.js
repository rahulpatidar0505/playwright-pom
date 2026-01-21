import { test, expect } from '@playwright/test';
const { GridFormPage } = require('../../src/pages/GridFormPage');
const { NavigationPage } = require('../../src/pages/NavigationPage');
const env = require('../../src/config').default;

test.beforeEach('Navigate and verify the title', async ({ page }) => {
  await page.goto(env.baseUrl);
  await expect(page).toHaveTitle(/Playwright Practice Application/);

  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
});

test.describe('Form Grid Tests', () => {
  test('Verify successful form submission with all valid data', async ({
    page,
  }) => {
    const gridFormPage = new GridFormPage(page);

    await gridFormPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      country: 'India',
      city: 'Tokyo',
      jobRole: 'QA',
      experience: '10+ years',
    });

    await gridFormPage.submitForm();
    await expect(gridFormPage.successMessage).toBeVisible();
  });
});
