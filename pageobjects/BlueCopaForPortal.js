const {expect} = require('@playwright/test')

class Portal{

    constructor(page){
           this.page = page;
           this.menu = page.locator("//div[contains(@class, 'transition') and contains(@class, 'ease-in-out') and contains(@class, 'contrast-more')]//*[local-name() = 'svg']")
           this.search= page.locator('(//input[@placeholder="Search"])[last()]');
           this.portalclick= page.locator('(//p[text()[normalize-space() = "Portals"]])[1]');
           this.newbutton= page.locator('//div[text()[normalize-space() = "New"]]');
           this.pencil= page.locator('//div[contains(@class,"text-secondary cursor-pointer")]');
           this.portalfilename=page.locator("//input[@id='input_text']");
           this.apply=page.locator('//div[text()[normalize-space() = "Apply"]]');
           this.save = page.locator('//div[text()[normalize-space() = "Save"]]');
           this.generatedFileboxName = ''; 
           this.toggle = page.locator('(//div[@tabindex="0"])[3]');
           this.spinner = page.locator("//div[contains(@class, 'fixed') and contains(@class, 'flex') and contains(@class, 'backdrop-blur-xs') and contains(@class, 'block')]//*[local-name() = 'svg']")
           this.inputTablet = page.locator('//p[text()="Input table"]/..');
           this.widget = page.locator('//p[text()="No widgets added"]/..');
    }
     generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
     return result;
}

    async navigateToPortalAndCreatingNewPortal(){
          await this.menu.click();
          await expect(this.search).toBeVisible();
          await this.search.fill('portal');
          await this.portalclick.click();
          await  expect(this.newbutton).toBeVisible();
          await this.newbutton.click();
          await expect(this.pencil).toBeVisible();
          await this.pencil.click();
          this.generatedFileboxName = `Portal_${this.generateRandomString(6)}`;
    await this.portalfilename.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500); 
    await this.portalfilename.clear();
    await this.portalfilename.fill('');
    await this.portalfilename.type(this.generatedFileboxName, { delay: 100 });
    await this.apply.click();
    await this.save.click();
  

    
    }
    async actionOnInput(){
         await expect(this.spinner).toBeHidden();
         await this.toggle.click();
         await this.save.click();
         await expect(this.spinner).toBeHidden();
         await this.page.waitForSelector('//p[text()="Input table"]/..', { state: 'visible' });
         await this.page.waitForSelector('//p[text()="No widgets added"]/..', { state: 'visible' });

//const sourceBox = await this.page.locator('//p[text()="Input table"]/..').boundingBox();
//const targetBox = await this.page.locator('//p[text()="No widgets added"]/..').boundingBox();

//if (sourceBox && targetBox) {
 // await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
  //await this.page.mouse.down();
  //await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 20 });
  //await this.page.mouse.up();
//} else {
  //console.error('Source or Target not found');
//}
const source = await this.page.locator('//p[text()="Input table"]/..');
const target = await this.page.locator('//p[text()="No widgets added"]/..');

// Ensure both elements are visible
await source.scrollIntoViewIfNeeded();
await target.scrollIntoViewIfNeeded();

const sourceBox = await source.boundingBox();
const targetBox = await target.boundingBox();

if (sourceBox && targetBox) {
  // Move to source center and press mouse down
    await this.page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2
  );
  await this.page.mouse.down();

  // Optional: Wait a bit to simulate drag
  await this.page.waitForTimeout(200);

  // Move to target center
  await this.page.mouse.move(
    targetBox.x + targetBox.width / 2,
    targetBox.y + targetBox.height / 2,
    { steps: 20 } // smooth move
  );

  await this.page.waitForTimeout(200); // let drop animation settle
  await this.page.mouse.up();
}


await expect(this.widget).toBeHidden();





 }
























}
module.exports = {Portal}