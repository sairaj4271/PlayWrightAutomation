
const { expect } = require('@playwright/test');  

class DataBoxPage {
  constructor(page) {
    this.page = page;
    this.operations = page.locator('(//a[@href="/operations/databox"]//*[local-name() = "svg"])[1]');
    this.databox = page.locator('//p[text()[normalize-space() = "Databox"]]');
    this.newButton = page.locator('//div[text()[normalize-space() = "New"]]');
    this.folderName = page.locator('//input[@id="input_name"]');
    this.saveButton = page.locator('//div[text()[normalize-space() = "Save"]]');
    this.Next = page.locator('//div[text()="Next"]');
    this.generatedFileboxName = ''; 
    this.fileInput = page.locator('//input[@type="file"]');
    this.createButton = page.locator('//div[text()[normalize-space() = "Create"]]')

    
  }
  
  generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
   async navigatetodatabox(){
     await this.operations.click();
     //await this.databox.click();

   }
   


    async CreateDatabox(){

     
    await this.newButton.click();
    await expect(this.folderName).toBeVisible;
    this.generatedFileboxName = `Databox_${this.generateRandomString(6)}`;
    await this.folderName.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500); 
    await this.folderName.click();
    await this.folderName.fill('');
    await this.folderName.type(this.generatedFileboxName, { delay: 100 });
    //await this.Next.click();
}  //await expect(this.successfullyCreatedFilebox).toBeVisible();
async uploadFileInDatabox() {
    
    await this.fileInput.setInputFiles('C:/Users/Sairaj/Downloads/multi_sheet_xls1234.xls');
    //await expect(this.upload).toBeVisible({time: 500});
   
    await this.page.waitForTimeout(500);
    await this.Next.click();
      await this.page.waitForTimeout(50000);
    await expect(this.createButton).toBeVisible({time:50000});
    this.createButton.click();
    await this.page.waitForTimeout(5000);

  }
}


module.exports = { DataBoxPage };