// @ts-check
const { devices, chromium, webkit } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  retries: 1,
  workers: 2,
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 9000
  },
  reporter: 'html',
  projects : [
    {
      name : "IOS",
      use: {
        browserName: 'webkit',
        headless: false,
        trace: 'on', //off ,retain-on-failure , retry-with-trace , on-first-retry
        screenshot: 'on', //off , only-on-failure
        ...devices['iPhone 11'],
        ignoreHTTPSErrors: true,
        permissions:['geolocation'],
        video: 'retain-on-failure',
        //viewport: {width:1520 , height:800}
      }
    },
    {
      name : "Android",
      use: {
        browserName: 'chromium',
        headless: false,
        trace: 'on', //off ,retain-on-failure , retry-with-trace , on-first-retry
        screenshot: 'only-on-failure', //off , only-on-failure
        //...devices['Nokia Lumia 520'],
        ...devices['Galaxy Note 3'],
      }
    }
  ]
  
};

module.exports = config;
