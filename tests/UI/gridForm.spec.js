import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { GridFormPage } from '../../src/pages/GridFormPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

test.describe('Parameterized Tests - JSON Data', () => {
  // Read JSON test data from file
  const testData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../../src/testData/form-test-data.json'),
      'utf-8'
    )
  );

  // Loop through each test data and create a test
  testData.forEach(data => {
    test(`Verify form submission for user: ${data.firstName} ${data.lastName}`, async ({
      page,
    }) => {
      const gridFormPage = new GridFormPage(page);

      await gridFormPage.fillForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        city: data.city,
        jobRole: data.jobRole,
        experience: data.experience,
      });

      await gridFormPage.submitForm();
      await expect(gridFormPage.successMessage).toBeVisible();
    });
  });
});

test.describe('Parameterized Tests - CSV Data', () => {
  // Read and parse CSV test data from file (using csv-parse library)
  const csvDataPath = path.join(__dirname, '../../src/testData/form-test-data.csv');
  const csvContent = fs.readFileSync(csvDataPath, 'utf-8');
  const testData = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Loop through each test data and create a test
  testData.forEach(data => {
    test(`Verify form submission for CSV user: ${data.firstName} ${data.lastName}`, async ({
      page,
    }) => {
      const gridFormPage = new GridFormPage(page);

      await gridFormPage.fillForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        city: data.city,
        jobRole: data.jobRole,
        experience: data.experience,
      });

      await gridFormPage.submitForm();
      await expect(gridFormPage.successMessage).toBeVisible();
    });
  });
});
