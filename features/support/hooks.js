const {After, Before} = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { POManager } = require('../../main/utilities/POManager');
const { devices } = require('playwright');

Before(async function () {
      //Setting up first browser page
      this.browser = await playwright.chromium.launch({headless: false});
      this.requestContext = await playwright.request.newContext();
      //this.iphone13 = devices['iPad Pro 11 landscape'];
      /*this.context = await this.browser.newContext({
        ...this.iphone13,
      });*/
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
  
      //Test Object setup - Create Objects of pages to work with
      this.poManager = new POManager(this.page);
      this.loginPage = this.poManager.getLoginPage();
      this.opportunityPage = this.poManager.getOpportunityPage();
});



After(async function () {
    //Test data cleanup for contract
    await this.opportunityPage.testDataCleanupOpportunity(this.LocalTestData, this.utilityFunctionLocal);

    //Close all browserss
    await this.context.close();
});

