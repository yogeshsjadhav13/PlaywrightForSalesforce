const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC056_SalesEnabler_RegressionTest';


test.skip('TC056_SalesEnabler_RegressionTest_Verify-Lead-To-Cygate-Affar-Opportunity-converison-for-Cygate', async function ({ browser }) {

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


  //Step 5 - Change the opportunity status until Ta fram lösning stage
  await opportunityPage.VerifyErrorOnOpportunityStageChange('Dessa obligatoriska fält måste fyllas i: Lösningsområden, Affärskategori, Cygate Affär');
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[contains(@class,'main')]//button[@title='Redigera Affärskategori']").click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Affärskategori']").first().click();
  await page.getByRole('option', { name: 'Standard' }).click();
  await page.getByRole('option', { name: 'Cygate Nätverk' }).click();
  await page.locator("//lightning-dual-listbox[contains(normalize-space(.),'Lösningsområden')]//button[contains(@title,'Flytta') and contains(@title,'till Vald')]").first().click();
  //await page.getByLabel('*Lösningsområden').getByRole('button', { name: 'Flytta till Vald' }).click();
  await page.getByRole('option', { name: 'Consulting' }).click();
  await page.locator("//lightning-dual-listbox[contains(normalize-space(.),'Cygate Affär')]//button[contains(@title,'Flytta') and contains(@title,'till Vald')]").first().click();
  //await this.page.getByLabel('*Cygate Affär').getByRole('button', { name: 'Flytta till Vald' }).click();
  await page.getByRole('button', { name: 'Spara', exact: true }).click();	
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Affärskategori']//..//..//..//lightning-formatted-text").first().click();


  await opportunityPage.VerifyErrorOnOpportunityStageChange('Kammarkollegiet: Dessa obligatoriska fält måste fyllas i: Kammarkollegiet');
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[contains(@class,'main')]//button[@title='Redigera Affärskategori']").click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Kammarkollegiet']").first().click();
  await page.getByText('Ej Kammarkollegiet').click();
  await page.getByRole('button', { name: 'Spara', exact: true }).click();	
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Affärskategori']//..//..//..//lightning-formatted-text").first().click();


  await opportunityPage.VerifyErrorOnOpportunityStageChange('New Sales eller Continuation Sales måste vara större än 0 kr.');
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[contains(@class,'main')]//button[@title='Redigera Affärskategori']").click();
  await page.getByLabel('Cygate Continuation Sales').fill('0123');
  await page.getByLabel('Cygate New Sales').fill('0123');
  await page.getByRole('button', { name: 'Spara', exact: true }).click();	
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Affärskategori']//..//..//..//lightning-formatted-text").first().click();
  await opportunityPage.changeOpportunityStatus("Kvalificera", "Ta fram lösning");


  //Step 6 - Verify contact role on opportunity post lead conversion
  await opportunityPage.verifyOpportunityContactRoleOnLeadConversion(LocalTestData, utilityFunctionLocal);
  

  //Close all browserss
  await context.close();

});