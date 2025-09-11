import { expect, Page, Locator } from '@playwright/test';

export class FileBoxPage{
   page: Page;
   loginMenu: Locator;
   usernameInput: Locator;
   passwordInput: Locator;
   loginButton: Locator;
   operation: Locator;
   filebox: Locator;
   newButton: Locator;
   folderName: Locator;
   generatedFileboxName: string;
   saveButton: Locator;
   successfullyCreatedFilebox: Locator;
   fileInput: Locator;
   upload: Locator;
   Refresh: Locator;
   fileDrop: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginMenu = page.locator('(//div[text()="Login"])[1]');
    this.usernameInput = page.locator('//input[@id="username"]');
    this.passwordInput = page.locator('//input[@name="password"]');
    this.loginButton = page.locator('//button[@type="submit"]');
    this.operation = page.locator('(//a[@href="/operations/databox"]//*[local-name() = "svg"])[1]');
    this.filebox = page.locator('//p[text()= "Filebox"]');
    this.newButton = page.locator('//div[text()[normalize-space() = "New"]]');
    this.folderName = page.locator('//input[@id="input_name"]');
    this.generatedFileboxName = '';
    this.saveButton = page.locator('//div[text()[normalize-space() = "Save"]]');
    this.successfullyCreatedFilebox = page.locator('//*[contains(text(),"Successfully created filebox")]');
    this.fileInput = page.locator('//input[@type="file"]');
    this.upload = page.locator('//div[text()[normalize-space() = "Upload"]]');
    this.Refresh = page.locator('//div[text()="Refresh"]');
    this.fileDrop = page.locator('//p[text()="multi_sheet_xls1234.xls"]');
  }

 

  async navigateToFileBox(): Promise<void> {
    await this.operation.click();
    await this.filebox.click();
  }

  private generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async createFileBoxWithRandomName(): Promise<void> {
    await this.newButton.click();
    await expect(this.folderName).toBeVisible();
    this.generatedFileboxName = `Filebox_${this.generateRandomString(6)}`;
    await this.folderName.fill('');

   await this.folderName.fill(this.generatedFileboxName);
    await this.saveButton.click();
    await expect(this.successfullyCreatedFilebox).toBeVisible();
  }

  async uploadFileInFilebox(): Promise<void> {
    await this.fileInput.setInputFiles('C:/Users/Sairaj/Downloads/multi_sheet_xls1234.xls');
    await expect(this.upload).toBeVisible({ timeout: 500 });
    await this.upload.click();
  }

  async SuccessfullyUploadedFile(): Promise<void> {
    await this.Refresh.click();
    await expect(this.fileDrop).toBeVisible({ timeout: 20000 });
    console.log("File successfully dropped");
  }
}
