import { test, expect, Page } from '@playwright/test';


const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  { username: 'Admin', password: 'admin123' }
];
async function login(page: Page, username: string, password: string) {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator('//input[@name="username"]').fill(username);
  await page.locator('//input[@name="password"]').fill(password);
  await page.locator('//button[@type="submit"]').click();
}


test.describe('OrangeHRM Login Tests', () => {
  users.forEach(user => {
    test(`Login attempt with username: ${user.username}`, async ({ page }) => {
      await login(page, user.username, user.password);

      if (user.username === 'Admin' && user.password === 'admin123') {
      
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
      } else {
       
        await expect(page.locator('//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]') ).toBeVisible();
      }
    });
  });
});
