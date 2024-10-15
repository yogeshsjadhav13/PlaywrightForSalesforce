const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC061_SalesEnabler_RegressionTest';


test('TC061_SalesEnabler_RegressionTest_Verify-Teliaavtal-contract-creation-for-Admin-user', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const opportunityPage = poManager.getOpportunityPage();
  const contractPage = poManager.getContractPage();


  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();


  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  // Step 2 - Test data cleanup for contract
  await contractPage.testDataCleanupSalesEnablerContract(LocalTestData, utilityFunctionLocal);


  //Step 3 - Create Teliavtal contract using admin user
  await contractPage.createTeliaContracts(LocalTestData, utilityFunctionLocal);


  //Close all browserss
  await context.close();

});


