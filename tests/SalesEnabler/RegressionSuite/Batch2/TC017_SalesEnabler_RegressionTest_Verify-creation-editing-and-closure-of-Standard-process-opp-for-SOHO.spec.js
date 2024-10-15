const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC017_SalesEnabler_RegressionTest';


test('TC017_SalesEnabler_RegressionTest_Verify-creation-editing-and-closure-of-Standard-process-opp-for-SOHO', async function ({ browser }) {

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


  //Step 5 - Perform revenue change calculation
  await opportunityPage.IntaktseffektkalkylCreation();

  //Step 6 - Move Opportunity to next stage and verify error while moving to Sluta tvtal
  if (LocalTestData.get("UsingAccountButton") == "Yes") {
    await opportunityPage.VerifyErrorOnOpportunityStageChange('Dessa obligatoriska fält måste fyllas i: Återförsäljare');
    await page.getByRole('button', { name: 'Redigera Fas' }).click();
    await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Återförsäljare']").first().click();
    await page.getByRole('option', { name: 'Nej' }).click();
    await page.getByRole('button', { name: 'Spara' }).click();
    await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Återförsäljare']//..//..//..//lightning-formatted-text[text()='Nej']").click();
  }
  await opportunityPage.changeOpportunityStatus("Kvalificera", "Offerera och förhandla");
  await opportunityPage.VerifyErrorOnOpportunityStageChange('För att vara i fas Offerera och förhandla eller senare måste du fylla i Nuvarande avtalsvärde Produkter måste läggas till innan du kan gå vidare till nästa fas');
  await page.getByRole('button', { name: 'Redigera Nuvarande avtalsvärde CS (12 mån)' }).first().click();
  await page.locator("//label[contains(normalize-space(.),'Nuvarande avtalsvärde CS (12 mån)')]//following-sibling::input").fill("100");
  await page.locator("//div[contains(@class,'footer active')]//button[normalize-space(.)='Spara']").click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Återförsäljare']//..//..//..//lightning-formatted-text[text()='Nej']").click();
  await opportunityPage.VerifyErrorOnOpportunityStageChange('Produkter måste läggas till innan du kan gå vidare till nästa fas');

  
  //Step 7 - Add product 1 on opportunity and verify sales value
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName1"), LocalTestData.get("Engangsavgift1"), LocalTestData.get("Manadsavgift1"), LocalTestData.get("TypAvForsaljning1"), LocalTestData.get("Avtalstid1"), LocalTestData.get("Antal1"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "0 kr", "244 kr", "244 kr", "0 kr");


  //Step 8 - Add product 2 on opportunity and verify sales value
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName2"), LocalTestData.get("Engangsavgift2"), LocalTestData.get("Manadsavgift2"), LocalTestData.get("TypAvForsaljning2"), LocalTestData.get("Avtalstid2"), LocalTestData.get("Antal2"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "244 kr", "488 kr", "244 kr", "244 kr");


  //Step 9 - Move the opportuntiy to Vunnen stage
  await opportunityPage.changeOpportunityStatus("Offerera och förhandla", "Sluta avtal");
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "Current Supplier cannot be blank while closing an Opportunity");
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "För att stänga affären behöver du fylla i Intäktsstart NS och/eller Intäktsstart CS");
  await page.getByRole('button', { name: 'Redigera Nuvarande avtalspart' }).click();
  const todaysDate = await utilityFunctionLocal.TodaysDate();
  await page.getByLabel('Intäktsstart NS').fill(todaysDate);
  await page.getByLabel('Intäktsstart CS').fill(todaysDate);
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nuvarande avtalspart']").first().click();
  await page.getByLabel('Nuvarande avtalspart', { exact: true }).getByRole('option', { name: 'Atea' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Sluta avtal", "Vunnen");
  await opportunityPage.verifyOpportunityClosedDate(LocalTestData, utilityFunctionLocal);


  //Step 10 - Close the opportunity as lost and verify error
  await opportunityPage.changeOpportunityStatusAndVerifyError("Förlorad", "Vid förlorad affär, ange en motivering och en kommentar kring varför vi förlorat affären.");


  //Step 11 - Close the opportunity as cancelled
  await opportunityPage.changeOpportunityStatus("Vunnen", "Avbruten");


  //Step 12 - Enter mandatory details for Opportunity to be lost and change the status as lost
  await page.getByRole('button', { name: 'Redigera Fas' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Motivering']").first().click();
  await page.getByRole('option', { name: 'Funktionalitet' }).click();
  await page.getByLabel('Varför Vann/Förlorade vi affären').fill('Test Automation Comment');
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Avbruten", "Förlorad");

 

  
  //Close all browserss
  await context.close();

});


