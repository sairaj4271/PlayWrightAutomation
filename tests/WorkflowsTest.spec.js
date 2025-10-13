const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/Bluecopa');
const { Workflowpage } = require('../pageobjects/Workflows');

test.describe.parallel('Workflow Automation Suite', () => {

        let loginPage;
        let workflowPage;

        test.beforeEach(async ({ page }) => {
                loginPage = new LoginPage(page);
                workflowPage = new Workflowpage(page);

                await loginPage.goto();
                await loginPage.clickLoginMenu();
                await loginPage.login('auto-testadmin@bluecopa.com', 'Admin@copa123');
                console.log('✅ Successfully logged in');
        });

        test('Create and Run Workflow', async ({ page }) => {
                await workflowPage.navigateToWorkflow();
                console.log(' Navigated to Workflow page');

                await workflowPage.createNewWorkflow();

                await workflowPage.addManualTrigger();
                console.log(' Manual trigger added');

                await workflowPage.addActivityAndDoingActionOnRunRen();
                console.log(' Activity added and actions performed');

                //await workflowPage.saveAndPublishTheWorkflow();
                //console.log(' Workflow published successfully');

                await workflowPage.startTheWorkflow();
                console.log(' Workflow started successfully');
        });

        test.afterEach(async ({ page }) => {
                await page.close();
        });
});