import { test, expect } from '@playwright/test';
import { ModalsPage } from '../../src/pages/ModalsPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

test.beforeEach('Navigate and verify the title', async ({ page }) => {
  await page.goto(env.baseUrl);
  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToModals();
});

test('Handle Dialogue', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  await modalsPage.openDialog();
  await modalsPage.confirmDialog();
});

test('Handle Window', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  await modalsPage.fillWindowForm({
    inputText: 'testing123',
    selectValue: 'option2',
  });
});

test('Handle Popover', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  await modalsPage.togglePopover();

  const expectedText =
    'This is a popover content example. You can test automation interactions with this element.';
  expect(await modalsPage.popoverContent.textContent()).toBe(expectedText);

  await modalsPage.closePopover();
});

test('Handle Toastr Notifications', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  await modalsPage.showSuccessToastr();
  await expect(modalsPage.successToastrMessage).toBeVisible();
  await modalsPage.closeToastr();

  await modalsPage.showWarningToastr();
  await expect(modalsPage.warningToastrMessage).toBeVisible();
  await modalsPage.closeToastr();
});

test('Handle Tooltip', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  await modalsPage.hoverTooltip();
  await expect(modalsPage.tooltipText).toBeVisible();
});

test('Simple Alert', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await modalsPage.clickSimpleAlert();
});

test('Confirm Alert', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await modalsPage.clickConfirmDialog();
});

test('Prompt Dialog', async ({ page }) => {
  const modalsPage = new ModalsPage(page);
  page.once('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept('Hello Playwright');
  });

  await modalsPage.clickPromptDialog();
});

test('Handle New Tab', async ({ page, context }) => {
  const modalsPage = new ModalsPage(page);
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    modalsPage.openNewTab(),
  ]);
  await newPage.waitForLoadState();
  expect(await newPage.title()).toBeTruthy();
});

test('Handle New Window', async ({ page, context }) => {
  const modalsPage = new ModalsPage(page);
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    modalsPage.openNewWindow(),
  ]);
  await newPage.waitForLoadState();
  expect(await newPage.title()).toBeTruthy();
});

test.only('Open External Site', async ({ page, context }) => {
  const modalsPage = new ModalsPage(page);
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    modalsPage.openExternalLink(),
  ]);
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://playwright.dev/');
});
