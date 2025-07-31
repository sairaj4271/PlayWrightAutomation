// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :1,
   workers: 3,
  
  /* Maximum time one test can run for. */
  timeout: 30 * 10000,
  expect: {
  
    timeout: 5000 * 30
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
  browserName: 'chromium',
  headless: true,
  screenshot: 'on',
  video: 'retain-on-failure', // use 'retain-on-failure', 'on', or 'off'
  trace: 'on', // use 'retain-on-failure', 'on', or 'off'
  ignoreHTTPSErrors: true,
  permissions: ['geolocation'], // example permissions
  //geolocation: { latitude: 12.9716, longitude: 77.5946 }, // optional, if permission granted
},


};

module.exports = config;
