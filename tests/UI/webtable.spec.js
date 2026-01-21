import { test, expect } from '@playwright/test';
const { SmartTablePage } = require('../../src/pages/SmartTablePage');
const { NavigationPage } = require('../../src/pages/NavigationPage');
const env = require('../../src/config').default;

test.beforeEach('Navigate to Smart Table', async ({ page }) => {
  await page.goto(env.baseUrl);

  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToSmartTable();
});

test('Test: Add/Edit/Delete Records - Verify all CRUD operations work correctly', async ({
  page,
}) => {
  const smartTablePage = new SmartTablePage(page);

  // Step 1: Click "Add New Row" button - verify form appears
  await smartTablePage.clickAddRow();
  await expect(smartTablePage.addRowFormLocator).toBeVisible();

  // Step 2: Fill form with test data
  await smartTablePage.fillNewRowForm({
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser',
    email: 'test@test.com',
    age: '30',
  });
  await smartTablePage.saveNewRow();

  // Step 3: Verify new row appears with the entered data
  const newRow = smartTablePage.getRowByText('Test');
  await expect(newRow).toBeVisible();
  await expect(newRow.locator('td')).toContainText([
    'Test',
    'User',
    'test@test.com',
    '30',
  ]);

  // Step 4: Click "Edit" button on the new row
  await smartTablePage.editRow(newRow);

  // Step 5: Modify data and save - verify changes reflected in table
  await smartTablePage.updateRowData('Test123', 'User123');

  // Verify updated data in table
  const updatedRow = smartTablePage.getRowByText('Test123');
  await expect(updatedRow).toBeVisible();
  await expect(updatedRow.locator('td')).toContainText([
    'Test123',
    'User123',
    '30',
  ]);

  // Step 6: Click "Delete" button on the updated row - verify row is removed
  await smartTablePage.deleteRow(updatedRow);

  // Verify row is removed
  await expect(smartTablePage.getRowCount('Test123')).toHaveCount(0);
});
