/**
 * Wait for a specified duration
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an async function until it succeeds or max retries reached
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delayMs - Delay between retries in ms
 * @returns {Promise<any>} Result of the function
 */
async function retry(fn, maxRetries = 3, delayMs = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt < maxRetries) {
        await wait(delayMs);
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
}

/**
 * Wait for element to be stable (no DOM changes)
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @param {number} stabilityTime - Time in ms element should be stable
 */
async function waitForElementStable(page, selector, stabilityTime = 500) {
  await page.waitForSelector(selector);
  await page.waitForFunction(
    ({ sel, time }) => {
      const element = document.querySelector(sel);
      if (!element) return false;

      return new Promise((resolve) => {
        let lastHtml = element.innerHTML;
        let stableTime = 0;

        const interval = setInterval(() => {
          if (element.innerHTML === lastHtml) {
            stableTime += 100;
            if (stableTime >= time) {
              clearInterval(interval);
              resolve(true);
            }
          } else {
            lastHtml = element.innerHTML;
            stableTime = 0;
          }
        }, 100);
      });
    },
    { sel: selector, time: stabilityTime }
  );
}

/**
 * Wait for network to be idle
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {number} idleTime - Time in ms with no network activity
 */
async function waitForNetworkIdle(page, idleTime = 500) {
  await page.waitForLoadState('networkidle');
  await wait(idleTime);
}

module.exports = {
  wait,
  retry,
  waitForElementStable,
  waitForNetworkIdle,
};
