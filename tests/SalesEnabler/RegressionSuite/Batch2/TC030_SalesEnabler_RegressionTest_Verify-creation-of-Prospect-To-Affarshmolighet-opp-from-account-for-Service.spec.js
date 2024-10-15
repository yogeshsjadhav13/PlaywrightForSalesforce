const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC030_SalesEnabler_RegressionTest';


test('TC030_SalesEnabler_RegressionTest_Verify-creation-of-Prospect-To-Affarshmolighet-opp-from-account-for-Service', async function ({ browser }) {

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
  const Opportunity = await opportunityPage.createProfileRecordTypeBasedOpportunity(LocalTestData, utilityFunctionLocal);
  const OpportunityName = Opportunity[0];
  const OpportunityID = Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);


  await page.getByRole('button', { name: 'Konvertera till affärsmöjlighet' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();
  await expect(page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Posttyp för affärsmöjlighet']//..//..//..//records-record-type")).toContainText("Affärsmöjlighet");
  await expect(page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fas']//..//..//..//lightning-formatted-text")).toContainText("Kvalificera");


  await opportunityPage.VerifyErrorOnOpportunityStageChange('Dessa obligatoriska fält måste fyllas i: Nuvarande avtalspart');


  //Close all browserss
  await context.close();

});


