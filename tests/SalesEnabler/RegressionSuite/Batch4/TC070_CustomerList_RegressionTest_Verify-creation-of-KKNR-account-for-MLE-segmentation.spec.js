const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC070_CustomerList_RegressionTest';


test('TC070_CustomerList_RegressionTest_Verify-creation-of-KKNR-account-for-MLE-segmentation', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const contractPage = poManager.getContractPage();
  const accountPage = poManager.getAccountPage();

  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();


  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupCustomerListAvtalSituation(LocalTestData, utilityFunctionLocal);
  await contractPage.testDataCleanupCustomerListAccounts(LocalTestData, utilityFunctionLocal);


  //Step 4 - Create KKNR account as Business controller
  await accountPage.createKKnrAsBusinessController(LocalTestData, utilityFunctionLocal);
  

  //Close all browserss
  await context.close();

});


