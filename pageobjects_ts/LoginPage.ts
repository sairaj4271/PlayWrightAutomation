import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private loginMenu: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginMenu = page.locator('(//div[text()="Login"])[1]');
    this.usernameInput = page.locator('//input[@id="username"]');
    this.passwordInput = page.locator('//input[@name="password"]');
    this.loginButton = page.locator('//button[@type="submit"]');
  }

   async goto(): Promise<void> {
    
    await this.page.goto(process.env.BASE_URL!);
  }

  async clickLoginMenu(): Promise<void> {
    await this.loginMenu.click();
  }

  async login(): Promise<void> {
  
    await this.usernameInput.fill(process.env.USERNAME!);
    await this.passwordInput.fill(process.env.PASSWORD!);
    await this.loginButton.click();
  }
}
