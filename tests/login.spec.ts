import { test, expect } from '@playwright/test';
import testData from '../test-data/testData.json';

test.describe.parallel('Login tests with JSON data', () => {
  const users = (testData as any).default || testData;

  for (const data of users) {
    test(`Login with ${data.username}`, async ({ page }) => {
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      await page.locator('//input[@name="username"]').fill( data.username);
      await page.locator('//input[@type="password"]').fill(data.password);
      await page.locator('//button[@type="submit"]').click();
      await expect(page.locator('//p[text()="Invalid credentials"]')).toBeVisible();
    });
  }
});
