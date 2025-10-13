// @ts-check
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 🔹 Load environment file based on ENV variable (default: dev)
const envFile = `.env.${process.env.ENV || 'dev'}`;
dotenv.config({ path: path.resolve(__dirname, envFile), override: true });

console.log('✅ Loaded ENV file:', envFile);
console.log('✅ BASE_URL:', process.env.BASE_URL);
console.log('✅ USERNAME:', process.env.USERNAME);
console.log('✅ PASSWORD:', process.env.PASSWORD);

export default defineConfig({
  testDir: './tests',
  retries: 0,
  workers: 4,

  /* Maximum time one test can run for. */
  timeout: 30 * 10000,
  expect: {
    timeout: 50 * 10000,
  },

  // 🔹 Reporters
  reporter: [
    ['html'], // Default Playwright HTML report
    ['allure-playwright'], // Allure report
  ],

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: true,
      },
    },
  ],

  // 🔹 Shared settings (applies to all projects)
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'x-auth-user': process.env.USERNAME || '',
      'x-auth-pass': process.env.PASSWORD || '',
    },
  },
});
