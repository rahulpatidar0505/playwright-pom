import { test, expect } from '@playwright/test';
import { UIElementsPage } from '../../src/pages/UIElementsPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

test('Drag and Drop test', async ({ page }) => {
  await page.goto(env.baseUrl);

  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToUIElements();

  const uiElementsPage = new UIElementsPage(page);

  await expect(uiElementsPage.dropZoneText).toBeVisible();

  await uiElementsPage.dragItemToZone(uiElementsPage.draggable1);
  await uiElementsPage.dragItemToZone(uiElementsPage.draggable2);

  await expect(uiElementsPage.dropZoneText).not.toBeVisible();

  await uiElementsPage.resetDragDrop();
  await expect(uiElementsPage.dropZoneText).toBeVisible();
});
