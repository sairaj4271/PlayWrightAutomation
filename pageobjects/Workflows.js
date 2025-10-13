const { expect } = require('@playwright/test');

class Workflowpage {
    constructor(page) {
        this.page = page;

        // Main locators
        this.operations = page.locator(
            "//div[contains(@class, 'transition') and contains(@class, 'ease-in-out') and contains(@class, 'contrast-more')]//*[local-name() = 'svg']"
        );
        this.workflowName = page.locator('//p[@title="Your workflows and processes"]/preceding-sibling::p[text()[normalize-space() = "Workflows"]]');
        this.spinner = page.locator(
            "//div[contains(@class, 'fixed') and contains(@class, 'flex') and contains(@class, 'backdrop-blur-xs') and contains(@class, 'block')]//*[local-name() = 'svg']"
        );

        this.newButton = page.locator('//div[@data-testid="-listingView-listingHeader"]//button');
        this.pencil = page.locator('//div[@class="text-secondary cursor-pointer"]');
        this.Rename = page.locator("//input[@id='input_text']");
        this.applyButton = page.locator('//div[text()[normalize-space()="Apply"]]');
        this.savetheWorkflow = page.locator('//div[text()[normalize-space()="Save"]]');
        this.workflowCreated = page.locator('//div[contains(text(),"Workflow created successfully")]');

        // Trigger locators
        this.tigger = page.locator(
            "//div[contains(@class, 'flex') and contains(@class, 'flex-col') and contains(@class, 'rounded')]//div[contains(@class, 'flex') and contains(@class, 'rounded')]"
        );
        this.addtigger = page.locator('//div[text()="Add"]');
        this.pleaseSelectTigger = page.locator("//input[@id='triggerType']");
        this.manualTigger = page.locator('//p[text()[normalize-space()="Manual Trigger"]]');
        this.addForTigger = page.locator(
            "//div[contains(@class, 'flex') and contains(@class, 'capitalize')]//div[text()[normalize-space()='Add']]"
        );

        // Activity locators
        this.triggersDlot = page.locator('(//div[@role="button"])[1]');
        this.activity = page.locator('//p[text()[normalize-space()="Activity"]]/..');
        this.activity_2 = page.locator('//p[text()[normalize-space()="activity_1_"]]');
        this.TypeUnderPropertieForActivity = page.locator("//input[@id='subType']");
        this.Action = page.locator("//p[text()[normalize-space() = 'Action']]");
        this.PleaseSelectForActionType = page.locator("//input[@id='actionType']");
        this.Runrecon = page.locator(
            '//div[contains(@class, "svelte-select-list")]//div[@role="none"]//p[text()[normalize-space()="Run Recon"]]'
        );
        this.soureType = page.locator("//input[@id='source_type_recon_id']");
        this.Workspace = page.locator('//p[text()[normalize-space()="Workspace"]]');
        this.PleaseselectunderReconid = page.locator("//input[@id='recon_id']");
        this.testsigma_recon = page.locator('//p[text()[normalize-space()="testsigma_recon"]]');
        this.PublishButton = page.locator('(//div[text()[normalize-space()="Publish"]])[1]');
        this.instance = page.locator('//div[text()[normalize-space()="Instances"]]');
        this.startButton = page.locator('//div[text()[normalize-space()="Start"]]');
        this.running = page.locator('//p[text()[normalize-space()="Running"]]');
        this.refresh = page.locator('//div[text()[normalize-space()="Refresh"]]');
        this.completed = page.locator('(//p[text()="Completed"])[2]');

        this.generatedWorkflowName = '';
    }

    generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async waitForSpinnerToDisappear(timeout = 20000) {
        try {
            await this.spinner.waitFor({ state: 'hidden', timeout });
        } catch (err) {
            // Ignore if spinner is not found (already hidden)
            if (!err.message.includes('waiting for locator')) throw err;
        }
    }

    async navigateToWorkflow() {
        await this.operations.click();
        await expect(this.workflowName).toBeVisible({ timeout: 15000 });
        await this.workflowName.click();
        await this.waitForSpinnerToDisappear();
    }

    async createNewWorkflow() {
        await this.newButton.click();
        await expect(this.pencil).toBeVisible({ timeout: 10000 });
        await this.pencil.click();

        this.generatedWorkflowName = `Workflow_${this.generateRandomString(6)}`;

        await this.Rename.waitFor({ state: 'visible', timeout: 10000 });
        await this.Rename.fill('');
        await this.Rename.type(this.generatedWorkflowName, { delay: 100 });
        await this.applyButton.click();

        await expect(this.savetheWorkflow).toBeVisible({ timeout: 10000 });
        await this.savetheWorkflow.click();

        //await expect(this.workflowCreated).toBeVisible({ timeout: 15000 });
        await this.waitForSpinnerToDisappear();
    }

    async addManualTrigger() {
        await this.waitForSpinnerToDisappear();
        await expect(this.tigger).toBeVisible({ timeout: 10000 });
        await this.tigger.click();
        await expect(this.addtigger).toBeVisible({ timeout: 10000 });
        await this.addtigger.click();
        await expect(this.pleaseSelectTigger).toBeVisible({ timeout: 10000 });
        await this.pleaseSelectTigger.click();
        await this.manualTigger.click();
        await expect(this.addForTigger).toBeVisible({ timeout: 10000 });
        await this.addForTigger.click();
        //await this.savetheWorkflow.click();
        //await expect(this.workflowCreated).toBeVisible({ timeout: 15000 });
        await this.waitForSpinnerToDisappear();
    }

    async addActivityAndDoingActionOnRunRen() {
        await this.waitForSpinnerToDisappear();

        await this.triggersDlot.click();
        // await expect(this.triggersDlot).toBeVisible({ timeout: 10000 });
        await expect(this.activity).toBeVisible({ timeout: 10000 });
        await this.activity.click();
        await expect(this.activity_2).toBeVisible({ timeout: 10000 });
        await this.activity_2.click();

        await this.TypeUnderPropertieForActivity.waitFor({ state: 'visible', timeout: 10000 });
        await this.TypeUnderPropertieForActivity.click();
        await this.Action.click();
        await this.PleaseSelectForActionType.click();
        await this.PleaseSelectForActionType.fill('Run Recon');
        await this.Runrecon.click();

        await this.soureType.waitFor({ state: 'visible', timeout: 10000 });
        await this.soureType.click();
        await this.Workspace.click();

        await this.PleaseselectunderReconid.waitFor({ state: 'visible', timeout: 10000 });
        await this.PleaseselectunderReconid.click();
        await this.testsigma_recon.click();

        await this.savetheWorkflow.click();
        // await expect(this.workflowCreated).toBeVisible({ timeout: 15000 });
        await this.waitForSpinnerToDisappear();
       
        await this.PublishButton.click();
        await this.waitForSpinnerToDisappear();

    }

    async startTheWorkflow() {
        await expect(this.instance).toBeVisible({ timeout: 10000 });
        await this.instance.click();
        await expect(this.startButton).toBeVisible({ timeout: 10000 });
        await this.startButton.click();


        while (await this.running.isVisible()) {

            await this.refresh.click();
            await this.page.waitForTimeout(5000); // wait for 5 seconds before checking again
        }

        while (!(await this.completed.isVisible())) {
            await this.refresh.click();
            await this.page.waitForTimeout(5000); // wait for 5 seconds before checking again
        }

        await this.page.waitForTimeout(5000);
        await this.refresh.click();
        await expect(this.completed).toBeVisible();

    }





















}
module.exports = { Workflowpage };
