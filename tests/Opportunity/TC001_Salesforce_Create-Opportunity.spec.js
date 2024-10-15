const { test } = require('@playwright/test');
const { POManager } = require('../../main/utilities/POManager');
const { UtilityFunctions } = require('../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC001_Salesforce_RegressionTest';


test('TC001_Salesforce_Create-Opportunity.spec.js', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const opportunityPage = poManager.getOpportunityPage();


  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();


  //Step 1 - Test data cleanup for contract
  await opportunityPage.testDataCleanupOpportunity(LocalTestData, utilityFunctionLocal);
  

  //Step 2 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  //Step 3 - Creation salesforce opporunity
  const Opportunity =  await opportunityPage.salesforceOpportunityCreation(LocalTestData, utilityFunctionLocal);
  const OpportunityName = Opportunity[0];
  const OpportunityID = Opportunity[1];
  console.log(OpportunityName +"   ----   "+OpportunityID);
 
  
  //Close all browserss
  await context.close();

});


