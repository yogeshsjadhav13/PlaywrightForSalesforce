const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC020_SalesEnabler_RegressionTest';


test('TC020_SalesEnabler_RegressionTest_Verify-creation-of-Standard-process-opp-from-account-for-SOHO', async function ({ browser }) {

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
  console.log(OpportunityName +"   ----   "+OpportunityID);

/*
  //Step 5 - Add mandatory fields on opportunity
  await opportunityPage.VerifyErrorOnOpportunityStageChange('Dessa obligatoriska fält måste fyllas i: Återförsäljare');
  await page.getByRole('button', { name: 'Redigera Fas' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Återförsäljare']").first().click();
  await page.getByRole('option', { name: 'Nej' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Återförsäljare']//..//..//..//lightning-formatted-text[text()='Nej']").click();
*/

  //Step 6 - Move Opportunity to next stage and verify error while moving to Sluta tvtal
  await opportunityPage.changeOpportunityStatus("Kvalificera", "Offerera och förhandla");
  await opportunityPage.VerifyErrorOnOpportunityStageChange('För att vara i fas Offerera och förhandla eller senare måste du fylla i Nuvarande avtalsvärde Produkter måste läggas till innan du kan gå vidare till nästa fas');


  
  //Close all browserss
  await context.close();

});


