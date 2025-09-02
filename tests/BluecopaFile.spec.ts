import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects_ts/LoginPage'; 
import { FileBoxPage } from '../pageobjects_ts/bluecopaDatabox';

test.describe('Bluecopa Filebox Flow', () => {
  let loginPage: LoginPage;
  let fileBoxPage: FileBoxPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    fileBoxPage = new FileBoxPage(page);   
    await loginPage.goto();
  });

  test('should login, create filebox, upload file and verify upload', async ({ page }) => {
   
    await loginPage.clickLoginMenu();
    await loginPage.login('auto-testadmin@bluecopa.com', 'Admin@copa123');

    
    await fileBoxPage.navigateToFileBox();

   
    await fileBoxPage.createFileBoxWithRandomName();

   
    await fileBoxPage.uploadFileInFilebox(); 

   
    await fileBoxPage.SuccessfullyUploadedFile();

    await expect(page.locator('//p[text()="multi_sheet_xls1234.xls"]')).toBeVisible();
  });
});
