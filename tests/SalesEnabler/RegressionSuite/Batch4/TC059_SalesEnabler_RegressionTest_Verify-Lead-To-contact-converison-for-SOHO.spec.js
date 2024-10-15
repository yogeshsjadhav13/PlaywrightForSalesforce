const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC059_SalesEnabler_RegressionTest';


test.skip('TC059_SalesEnabler_RegressionTest_Verify-Lead-To-contact-converison-for-SOHO', async function ({ browser }) {

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



  // Step 1 - Test data cleanup for contract
  await contractPage.testDataCleanupSalesEnablerContact(LocalTestData, utilityFunctionLocal);


  //Step 2 - Create Pardot lead and sync it with Salesforce
  const Lead = await opportunityPage.createTeliaLead(LocalTestData, utilityFunctionLocal);
  const LeadName = Lead[0];
  const LeadID = Lead[1];
  console.log(LeadName + "   ----   " + LeadID);


  //Step 3 - Login into Salesforce as admin and navigate to lead
  await loginPage.adminUserLogin(utilityFunctionLocal);
  await opportunityPage.changeTeliaLeadOwner(LocalTestData, utilityFunctionLocal);


  //Step 4 - Login as Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  //Step 5 - Convert lead into only contact and verify contact
  await opportunityPage.convertTeliaLeadIntoContact(LocalTestData, utilityFunctionLocal);


  //Close all browserss
  await context.close();

});


