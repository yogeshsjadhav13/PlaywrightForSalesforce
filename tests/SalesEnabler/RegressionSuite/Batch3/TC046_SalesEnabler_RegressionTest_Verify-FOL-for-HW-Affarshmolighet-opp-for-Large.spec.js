const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC046_SalesEnabler_RegressionTest';


test('TC046_SalesEnabler_RegressionTest_Verify-FOL-for-HW-Affarshmolighet-opp-for-Large', async function ({ browser }) {

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


  //Step 5 - Add products on the opportunity
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName1"), LocalTestData.get("Engangsavgift1"), LocalTestData.get("Manadsavgift1"), LocalTestData.get("TypAvForsaljning1"), LocalTestData.get("Avtalstid1"), LocalTestData.get("Antal1"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "0 kr", "244 kr", "244 kr", "0 kr");
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName2"), LocalTestData.get("Engangsavgift2"), LocalTestData.get("Manadsavgift2"), LocalTestData.get("TypAvForsaljning2"), LocalTestData.get("Avtalstid2"), LocalTestData.get("Antal2"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "244 kr", "488 kr", "244 kr", "244 kr");


  //Step 9 - Verify seller name and FOL values
  await opportunityPage.verifySellerName(LocalTestData, utilityFunctionLocal);
  LocalTestData.set("OpportunityName", OpportunityName);
  LocalTestData.set("OpportunityID", OpportunityID);
  LocalTestData.set("ContinuationSalesAmount", "244 kr");
  LocalTestData.set("NewSalesAmount", "244 kr");
  LocalTestData.set("SalesValueAmount", "244 kr");
  LocalTestData.set("Probability", "10 %");
  LocalTestData.set("WeightedNewSalesAmount", "24 kr");
  LocalTestData.set("WeightedContinuationSalesAmount", "24 kr");
  LocalTestData.set("UppsidaNewSales", "220 kr");
  LocalTestData.set("UppsidaContinuationSales", "220 kr");
  await opportunityPage.verifySalesValuesOnFOL(LocalTestData, utilityFunctionLocal);


  //Step 7 - Add contact and mandatory details for opportunity closure
  await opportunityPage.addContactOnOpportunity(LocalTestData);
  await page.getByLabel('Affärsinformation').getByRole('button', { name: 'Redigera Nuvarande avtalsvä' }).click();
  await page.getByLabel('Nuvarande avtalsvärde CS (12 mån)').fill('100');
  await page.getByLabel('Varför Vann/Förlorade vi affä').fill('Test');
  const todaysDate = await utilityFunctionLocal.TodaysDate();
  await page.getByLabel('Intäktsstart NS').fill(todaysDate);
  await page.getByLabel('Intäktsstart CS').fill(todaysDate);
  await page.getByLabel('Avtalsstartsdatum').fill(todaysDate);
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Huvudkonkurrent']").first().click();
  await page.getByLabel('Huvudkonkurrent', { exact: true }).getByRole('option', { name: 'Atea' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nuvarande avtalspart']").first().click();
  await page.getByLabel('Nuvarande avtalspart', { exact: true }).getByRole('option', { name: 'Atea' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();


  //Step 9 - Close the opportunity as won and verify FOL
  await opportunityPage.changeOpportunityStatus("Sluta avtal", "Vunnen");
  LocalTestData.set("ContinuationSalesAmount", "244 kr");
  LocalTestData.set("NewSalesAmount", "244 kr");
  LocalTestData.set("SalesValueAmount", "244 kr");
  LocalTestData.set("Probability", "100 %");
  LocalTestData.set("WeightedNewSalesAmount", "244 kr");
  LocalTestData.set("WeightedContinuationSalesAmount", "244 kr");
  LocalTestData.set("UppsidaNewSales", "0 kr");
  LocalTestData.set("UppsidaContinuationSales", "0 kr");
  await opportunityPage.verifySalesValuesOnFOL(LocalTestData, utilityFunctionLocal);


  //Close all browserss
  await context.close();

});


