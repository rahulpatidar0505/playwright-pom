import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FramesPage } from '../../src/pages/FramesPage.js';
import { NavigationPage } from '../../src/pages/NavigationPage.js';
import env from '../../src/config/index.js';

test.beforeEach(async ({ page }) => {
  await page.goto(env.baseUrl);
  const navigationPage = new NavigationPage(page);
  await navigationPage.acceptCookies();
  await navigationPage.goToFrames();
});

test('Handle Frames', async ({ page }) => {
  const framesPage = new FramesPage(page);
  await framesPage.loadFrame();
  const frame = framesPage.getFrame();
  await framesPage.fillFrameForm(frame, {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    country: 'India',
    level: faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Advanced']),
    message: faker.lorem.sentence(),
  });

  await framesPage.submitFrameForm(frame);

  await expect(framesPage.getSuccessMessage(frame)).toHaveText(
    '🎉 Form Submitted Successfully!\nThank you for practicing with Playwright automation. All form data has been captured.'
  );
});
