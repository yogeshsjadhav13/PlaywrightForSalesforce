const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC010_SalesEnabler_RegressionTest';


test('TC010_SalesEnabler_RegressionTest_Verify-creation-editing-and-closure-of-Forenklad-affarsmojlighet-opp-for-Large', async function ({ browser }) {

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
  await opportunityPage.changeOpportunityStatus("Offerera och förhandla", "Sluta avtal");
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "Du måsta lägga till en Beställare innan du registrerar en affärsmöjlighet som vunnen.");
  await opportunityPage.newContactRoleButton.click();
  await opportunityPage.searchContactTextbox.type(LocalTestData.get("ContactName"));
  await opportunityPage.page.waitForTimeout(5000);
  await opportunityPage.page.locator("//input[@title='Sök Kontakter']//parent::div//div[contains(@class,'list')]//ul//li[contains(normalize-space(.),'" + LocalTestData.get("ContactName") + "')]").first().click();
  await page.locator("//a[text()='Avtalstecknare']").click();
  await page.getByRole('option', { name: 'Beställare' }).click();
  await opportunityPage.saveButton.click();


  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "Ange vilken konkurrent");
  await page.getByRole('button', { name: 'Redigera Fas' }).click();
  await page.getByRole('option', { name: 'Atea' }).click();
  await page.locator("//lightning-dual-listbox[contains(normalize-space(.),'Konkurrenter')]//button[contains(@title,'Flytta') and contains(@title,'till Vald')]").first().click();        
  //await page.getByLabel('Konkurrenter').getByRole('button', { name: 'Flytta till Vald' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();


  await page.getByRole('button', { name: 'Redigera Fas' }).click();
  await opportunityPage.FasPicklist.click();
  await page.getByLabel('Fas', { exact: true }).getByRole('option', { name: 'Vunnen' }).click();
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.locator("//div[contains(@id,'help-text') and text()='För att vara i fas Vunnen måste du lägga till några produkter']").click();
  await page.getByRole('button', { name: 'Avbryt' }).click();
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName1"), LocalTestData.get("Engangsavgift1"), LocalTestData.get("Manadsavgift1"), LocalTestData.get("TypAvForsaljning1"), LocalTestData.get("Avtalstid1"), LocalTestData.get("Antal1"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "0 kr", "244 kr", "244 kr", "0 kr");
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName2"), LocalTestData.get("Engangsavgift2"), LocalTestData.get("Manadsavgift2"), LocalTestData.get("TypAvForsaljning2"), LocalTestData.get("Avtalstid2"), LocalTestData.get("Antal2"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr", "244 kr", "244 kr", "488 kr", "244 kr", "244 kr");


  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "Vänligen fyll i Intäktsstart NS eller Intäktsstart CS");
  await page.getByRole('button', { name: 'Redigera Fas' }).click();
  const todaysDate = await utilityFunctionLocal.TodaysDate();
  await page.getByLabel('Intäktsstart NS').fill(todaysDate);
  await page.getByLabel('Intäktsstart CS').fill(todaysDate);
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Sluta avtal", "Vunnen");
  await opportunityPage.verifyOpportunityClosedDate(LocalTestData, utilityFunctionLocal);


  //Step 7 - Move the opportunity to Forlorad stage
  await opportunityPage.changeOpportunityStatus("Vunnen", "Förlorad");


  //Step 7 - Move the opportunity to Forlorad stage
  await opportunityPage.changeOpportunityStatus("Förlorad", "Avbruten");


  //Close all browserss
  await context.close();

});


