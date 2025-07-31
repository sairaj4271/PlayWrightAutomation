const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pageobjects/Bluecopa');

const { DataBoxPage } = require('../pageobjects/BluecopaDatabox');

test("Reg_Databox action", async({page}) =>{
      const loginPage = new LoginPage(page);
      const dataBoxPage = new DataBoxPage(page);

  await loginPage.goto();
  await loginPage.clickLoginMenu();
  await loginPage.login('auto-testadmin@bluecopa.com', 'Admin@copa123');

  await dataBoxPage.navigatetodatabox();
  await dataBoxPage.CreateDatabox();
  await dataBoxPage.uploadFileInDatabox();
  await loginPage.SuccessfullyUploadedFile();

} )
