import { test, expect } from '@playwright/test';
import { FileOperationsPage } from '../../src/pages/FileOperationsPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

test.beforeEach('Navigate to file operations page', async ({ page }) => {
  await page.goto(env.baseUrl);
  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToFileOperations();
});

test.describe('File Operations Tests', () => {
  test('File Upload - Single and Multiple Files', async ({ page }) => {
    const fileOperationsPage = new FileOperationsPage(page);

    // Single file upload
    await fileOperationsPage.uploadSingleFile('src/testData/sample-notes.txt');
    await expect(fileOperationsPage.removeSingleFileButton).toBeVisible();

    // Multiple files upload
    await fileOperationsPage.uploadMultipleFiles([
      'src/testData/sample-notes.txt',
      'src/testData/sample-notes-2.txt',
    ]);
    await expect(fileOperationsPage.removeMultipleFile0Button).toBeVisible();
    await expect(fileOperationsPage.removeMultipleFile1Button).toBeVisible();
  });

  test('File Downloads - Various File Types', async ({ page }) => {
    const fileOperationsPage = new FileOperationsPage(page);

    // Download and Verify PDF file
    const pdfDownload = await fileOperationsPage.downloadPdf();
    expect(pdfDownload.suggestedFilename()).toContain('.pdf');

    // Download and Verify CSV file
    const csvDownload = await fileOperationsPage.downloadCsv();
    expect(csvDownload.suggestedFilename()).toContain('.csv');

    // Download and Verify TXT file
    const txtDownload = await fileOperationsPage.downloadTxt();
    expect(txtDownload.suggestedFilename()).toContain('.txt');

    // Download and Verify JSON file
    const jsonDownload = await fileOperationsPage.downloadJson();
    expect(jsonDownload.suggestedFilename()).toContain('.json');
  });
});
