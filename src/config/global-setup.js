/* eslint-disable no-console */
import { chromium } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import env from './index.js';

const AUTH_FILE = './auth-state.json';

async function globalSetup() {
  console.log('🔐 Running global setup - Authenticating...');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(env.baseUrl);
    await page.waitForLoadState('domcontentloaded');

    const navigationPage = new NavigationPage(page);
    await navigationPage.acceptCookies();
    await navigationPage.goToAuthentication();

    const loginPage = new LoginPage(page);
    await loginPage.login(env.credentials.username, env.credentials.password);

    // Wait for successful login
    await page.locator(loginPage.successMessage).waitFor({ state: 'visible' });

    // Save authentication state
    await context.storageState({ path: AUTH_FILE });

    console.log('✅ Authentication state saved successfully!');
  } catch (error) {
    console.error('❌ Global setup failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
