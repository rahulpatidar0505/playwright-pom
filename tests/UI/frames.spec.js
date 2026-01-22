import { test, expect } from '@playwright/test';
import { FramesPage } from '../../src/pages/FramesPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

test('Handle Frames', async ({ page }) => {
  await page.goto(env.baseUrl);

  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToFrames();

  const framesPage = new FramesPage(page);

  await framesPage.loadFrame();

  const frame = framesPage.getFrame();

  await framesPage.fillFrameForm(frame, {
    name: 'pallavi',
    email: 'deore@jhfs',
    phone: '9874965',
    country: 'au',
    level: 'Intermediate',
    message: "jhljkjerytly.t';ur/",
  });

  await framesPage.submitFrameForm(frame);

  await expect(framesPage.getSuccessMessage(frame)).toHaveText(
    '🎉 Form Submitted Successfully!\nThank you for practicing with Playwright automation. All form data has been captured.'
  );
});
