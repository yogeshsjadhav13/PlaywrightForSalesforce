const { test } = require('@playwright/test');
const { POManager } = require('../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC007_MCSales_DataMigrationTest';



test('TC007_MCSales_DataMigrationTest', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const quotePage = poManager.getQuotePage();

  
  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);


  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  //Step 2 - Perform data migration for the test on quote
  await quotePage.performDataMigrationOnQuote(TestCaseName, utilityFunctionLocal);
  

  //Close all browserss
  await context.close();


});