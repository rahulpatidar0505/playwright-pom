import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { GridFormPage } from '../../src/pages/GridFormPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

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
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      country: 'India',
      city: 'Mumbai',
      jobRole: faker.helpers.arrayElement([
        'QA',
        'Developer',
        'Designer',
        'Manager',
      ]),
      experience: faker.helpers.arrayElement([
        '0-1 years',
        '2-5 years',
        '6-10 years',
        '10+ years',
      ]),
    });

    await gridFormPage.submitForm();
    await expect(gridFormPage.successMessage).toBeVisible();
  });
});
