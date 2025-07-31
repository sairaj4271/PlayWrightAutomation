const{test, expect} = require('@playwright/test');
const { LoginPage } = require('../pageobjects/Bluecopa');
const { Portal } = require('../pageobjects/BlueCopaForPortal');


test('IN portal the Input table', async({page})=>{

  const loginPage = new LoginPage(page);
  const  portalPage= new  Portal(page);
  await loginPage.goto();
  await loginPage.clickLoginMenu();
  await loginPage.login('auto-testadmin@bluecopa.com', 'Admin@copa123');
  await portalPage.navigateToPortalAndCreatingNewPortal();
  await portalPage.actionOnInput();

})