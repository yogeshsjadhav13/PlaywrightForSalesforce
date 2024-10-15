const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC028_MCSales_RegressionTest';



test('TC028_MCSales_RegressionTest_SOHO_e-Signing-Avtal-esigning-on-opportunity', async function ({ browser }) {

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



  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupSalesEnablerOpportunity(LocalTestData, utilityFunctionLocal);


  //Step 4 - Create standard process Opportunity, add contact and Product on Opportunity
  const Opportunity = await opportunityPage.createMCSalesOpportunityWithContactAndProduct(LocalTestData, utilityFunctionLocal);
  const OpportunityName = Opportunity[0];
  const OpportunityID = Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);

  
  //Step 5 - Perform e signing on opportunity
  await opportunityPage.performEsigningOnOpportunity(LocalTestData, utilityFunctionLocal, OpportunityID);
  

  //Close all browserss
  await context.close();


});


test.afterEach(async ({ page }, testInfo) => {
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  var TestCaseStatus;
  if (testInfo.status === 'passed') {
    TestCaseStatus = "PASS";
  } else if (testInfo.status === 'failed') {
    TestCaseStatus = "FAIL";
  }
  try {
    await utilityFunctionLocal.UpdateJIRAWithTestResult(TestCaseName, TestCaseName, TestCaseStatus);
  } catch (error) {
    console.error('An error occurred:', error);
    console.log(`Finished ${testInfo.title} with status --- ${testInfo.status} but without JIRA result upload`);
  }
  console.log(`Finished ${testInfo.title} with status --- ${testInfo.status}`);
});
