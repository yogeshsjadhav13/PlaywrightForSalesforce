const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC025_SalesEnabler_RegressionTest';


test('TC025_SalesEnabler_RegressionTest_Verify-creation-editing-and-closure-of-Cygate-Affar-opp-from-account-for-Cygate', async function ({ browser }) {

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


  //Step 5 - Change the opportunity status until Ta fram lösning stage
  await opportunityPage.changeOpportunityStatus("Kvalificera", "Ta fram lösning");


  //Step 6 - Verify error on moving to Offerera och förhandla stage and add products
  await opportunityPage.VerifyErrorOnOpportunityStageChange('Registrera produkter');
  await opportunityPage.addCygateProductOnOpportunity(LocalTestData.get("ProductName1"), LocalTestData.get("Engangsavgift1"), LocalTestData.get("Manadsavgift1"), LocalTestData.get("TypAvForsaljning1"), LocalTestData.get("Avtalstid1"));
  await opportunityPage.changeOpportunityStatus("Ta fram lösning", "Offerera och förhandla");
  await opportunityPage.changeOpportunityStatus("Offerera och förhandla", "Sluta avtal");
  await opportunityPage.changeOpportunityStatus("Sluta avtal", "Vunnen");


  //Step 7 - Close the opportunity as lost and verify error
  await opportunityPage.changeOpportunityStatusAndVerifyError("Förlorad", "Granska följande fält");
  await opportunityPage.changeOpportunityStatusAndVerifyError("Avbruten", "För att avbryta affären, välj fasen: Avbruten under Affärsinformation och ange Avbrutet köp som Motivering under Win Loss-sektionen");


  //Step 9 - Enter mandatory details for Opportunity to be lost and change the status as lost
  await page.getByRole('button', { name: 'Redigera Fas' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Motivering']").first().click();
  await page.getByRole('option', { name: 'Funktionalitet' }).click();
  await page.getByLabel('Varför Vann/Förlorade vi affären').fill('Test Automation Comment');
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Vunnen", "Förlorad");

  //Step 8 - Close the opportunity as cancelled
  await opportunityPage.changeOpportunityStatus("Förlorad", "Avbruten");

  //Close all browserss
  await context.close();

});