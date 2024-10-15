const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC028_SalesEnabler_RegressionTest';


test('TC002_SalesEnabler_SanityTest_Verify-creation-editing-and-closure-of-Affarshmolighet-opportunity-record-for-Large-profile-user', async function ({ browser }) {

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

  //LocalTestData.set("OpportunityRecordType", "Affärsmöjlighet")
  await opportunityPage.VerifyErrorOnOpportunityStageChange('Dessa obligatoriska fält måste fyllas i: Nuvarande avtalspart');
  await page.getByLabel('Affärsinformation').getByRole('button', { name: 'Redigera Nuvarande avtalspart' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nuvarande avtalspart']").first().click();
  await page.getByLabel('Nuvarande avtalspart', { exact: true }).getByRole('option', { name: 'Atea' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Återförsäljare']").first().click();
  await page.getByRole('option', { name: 'Nej' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();


  //Step 5 - Change the opportunity status until Ta fram lösning stage
  await opportunityPage.changeOpportunityStatus("Kvalificera", "Utveckla");
  await opportunityPage.changeOpportunityStatus("Utveckla", "Ta fram lösning");


  //Step 6 - Verify error on moving to Offerera och förhandla stage and add products
  await opportunityPage.VerifyErrorOnOpportunityStageChange('Fas: För att vara i fas Offerera och förhandla eller senare måste du lägga till några produkter');
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName1"), LocalTestData.get("Engangsavgift1"), LocalTestData.get("Manadsavgift1"), LocalTestData.get("TypAvForsaljning1"), LocalTestData.get("Avtalstid1"), LocalTestData.get("Antal1"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "0 kr", "244 kr", "244 kr", "0 kr");
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName2"), LocalTestData.get("Engangsavgift2"), LocalTestData.get("Manadsavgift2"), LocalTestData.get("TypAvForsaljning2"), LocalTestData.get("Avtalstid2"), LocalTestData.get("Antal2"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "244 kr", "488 kr", "244 kr", "244 kr");



  //Step 7 - Verify error on moving the stage, then resolve and change the opportunity status until Sluta avtal stage
  await opportunityPage.VerifyErrorOnOpportunityStageChange('För att vara i fas Offerera och förhandla eller senare måste du fylla i Nuvarande avtalsvärde');
  await page.getByLabel('Affärsinformation').getByRole('button', { name: 'Redigera Nuvarande avtalsvä' }).click();
  await page.getByLabel('Nuvarande avtalsvärde CS (12 mån)').fill('100');
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Ta fram lösning", "Offerera och förhandla");
  await opportunityPage.changeOpportunityStatus("Offerera och förhandla", "Sluta avtal");


  //Step 6 - Close the opportunity as won, verify error and resolve
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "Du måsta lägga till en Avtalstecknare innan du går vidare till nästa fas.");
  await opportunityPage.addContactOnOpportunity(LocalTestData);
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "För att stänga affären behöver du fylla i Avtalsstartsdatum.");
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "Ange vilken konkurrent och");
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "För att stänga affären behöver du fylla i Intäktsstart NS och/eller Intä");
  await page.getByRole('button', { name: 'Redigera Varför Vann/Förlorade vi affä' }).click();
  await page.getByLabel('Varför Vann/Förlorade vi affä').fill('Test');
  const todaysDate = await utilityFunctionLocal.TodaysDate();
  await page.getByLabel('Intäktsstart NS').fill(todaysDate);
  await page.getByLabel('Intäktsstart CS').fill(todaysDate);
  await page.getByLabel('Avtalsstartsdatum').fill(todaysDate);
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Huvudkonkurrent']").first().click();
  await page.getByLabel('Huvudkonkurrent', { exact: true }).getByRole('option', { name: 'Atea' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Sluta avtal", "Vunnen");
  await opportunityPage.verifyOpportunityClosedDate(LocalTestData, utilityFunctionLocal);


  //Step 7 - Move the opportunity to Forlorad stage
  await opportunityPage.changeOpportunityStatus("Vunnen", "Förlorad");


  //Step 8 - Close the opportunity as cancelled and verify error
  await opportunityPage.changeOpportunityStatusAndVerifyError("Avbruten", "Du får tyvärr inte avbryta en affär, vänligen kontakta Salesforce-supporten för hjälp");


  //Close all browserss
  await context.close();

});


