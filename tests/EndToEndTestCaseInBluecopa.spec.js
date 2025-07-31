
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/Bluecopa');

test('End-to-end test on filebox using Page Object Model', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.clickLoginMenu();
  await loginPage.login('auto-testadmin@bluecopa.com', 'Admin@copa123');
  await loginPage.navigateToFileBox();
  await loginPage.createFileBoxWithRandomName();
  await loginPage.uploadFileInFilebox();
  await loginPage.SuccessfullyUploadedFile();
  

 
});
module.exports = { LoginPage };