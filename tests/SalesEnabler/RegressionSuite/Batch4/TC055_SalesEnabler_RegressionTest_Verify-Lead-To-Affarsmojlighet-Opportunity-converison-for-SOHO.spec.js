const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC055_SalesEnabler_RegressionTest';


test.skip('TC055_SalesEnabler_RegressionTest_Verify-Lead-To-Affarsmojlighet-Opportunity-converison-for-SOHO', async function ({ browser }) {

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
  await contractPage.testDataCleanupSalesEnablerOpportunity(LocalTestData, utilityFunctionLocal);


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
  await opportunityPage.convertTeliaLeadIntoOpportunity(LocalTestData, utilityFunctionLocal);


  //Step 5 - Move the opportunity to next stage
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fas']//..//..//..//lightning-formatted-text[text()='Kvalificera']").click();
  await opportunityPage.VerifyErrorOnOpportunityStageChange('Dessa obligatoriska fält måste fyllas i: Nuvarande avtalspart');
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[contains(@class,'main')]//button[@title='Redigera Nuvarande avtalspart']").click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nuvarande avtalspart']").first().click();
  await page.getByLabel('Nuvarande avtalspart', { exact: true }).getByRole('option', { name: 'Atea' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nuvarande avtalspart']//..//..//..//lightning-formatted-text[text()='Atea']").click();
  await opportunityPage.VerifyErrorOnOpportunityStageChange('New Sales (12 mån) eller Continuation Sales (12 mån) måste vara större än 0.');
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[contains(@class,'main')]//button[@title='Redigera Nuvarande avtalspart']").click();
  await page.getByLabel('New Sales (12 mån)').fill('123');
  await page.getByLabel('Continuation Sales (12 mån)').fill('123');
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Kvalificera", "Utveckla");

  
  //Step 6 - Verify contact role on opportunity post lead conversion
  await opportunityPage.verifyOpportunityContactRoleOnLeadConversion(LocalTestData, utilityFunctionLocal);


  //Close all browserss
  await context.close();

});


