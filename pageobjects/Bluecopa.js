
const { expect } = require('@playwright/test');  
class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginMenu = page.locator('(//div[text()="Login"])[1]');
    this.usernameInput = page.locator('//input[@id="username"]');
    this.passwordInput = page.locator('//input[@name="password"]');
    this.loginButton = page.locator('//button[@type="submit"]');
    this.operation = page.locator('(//a[@href="/operations/databox"]//*[local-name() = "svg"])[1]');
    this.filebox = page.locator('//p[text()[normalize-space() = "Filebox"]]');
    this.newButton = page.locator('//div[text()[normalize-space() = "New"]]');
    this.folderName = page.locator('//input[@id="input_name"]');

    this.generatedFileboxName = ''; 
    this.saveButton = page.locator('//div[text()[normalize-space() = "Save"]]');
    this.successfullyCreatedFilebox = page.locator('//*[contains(text(),"Successfully created filebox")]');
    this.fileInput = page.locator('//input[@type="file"]');
    this.upload    = page.locator('//div[text()[normalize-space() = "Upload"]]');
    this.Refresh   = page.locator('//div[text()="Refresh"]');
    this.fileDrop  = page.locator('//p[text()="multi_sheet_xls1234.xls"]');
  }

  async goto() {
    await this.page.goto('https://showcase.bluecopa.com');
  }

  async clickLoginMenu() {
    await this.loginMenu.click();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigateToFileBox() {
    await this.operation.click();
    await this.filebox.click();
  }

  generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async createFileBoxWithRandomName() {
    await this.newButton.click();
    await expect(this.folderName).toBeVisible;
    this.generatedFileboxName = `Filebox_${this.generateRandomString(6)}`;
    await this.folderName.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500); 
    await this.folderName.click();
    await this.folderName.fill('');
    await this.folderName.type(this.generatedFileboxName, { delay: 100 });
    await this.saveButton.click();
    await expect(this.successfullyCreatedFilebox).toBeVisible();

  }
    async uploadFileInFilebox() {
    
    await this.fileInput.setInputFiles('C:/Users/Sairaj/Downloads/multi_sheet_xls1234.xls');
    await expect(this.upload).toBeVisible({time: 500});
    await this.upload.click();
    await this.page.waitForTimeout(500);


    }
    async SuccessfullyUploadedFile(){
      for (let i = 0; i <20; i++){
        this.Refresh.click();
        if(await expect(this.fileDrop).toBeVisible){
          console.log("file is drop")
          break;
        }else{
          console.log("file is not droped")
        }   
      

        //await this.page.waitForTimeout(50000);

      }
        await this.page.waitForTimeout(5000);
    }
}

module.exports = { LoginPage };
