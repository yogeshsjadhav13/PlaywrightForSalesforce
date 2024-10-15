const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC073_CustomerList_RegressionTest';


test.skip('TC073_CustomerList_RegressionTest_Verify-actual-segmentation-values-as-KKNR-suggested-segmentation-for-small', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const contractPage = poManager.getContractPage();
  const accountPage = poManager.getAccountPage();

  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();


  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupCustomerListAvtalSituation(LocalTestData, utilityFunctionLocal);
  await contractPage.testDataCleanupCustomerListAccounts(LocalTestData, utilityFunctionLocal);


  //Step 4 - Create KKNR account as Business controller
  await accountPage.createKKnrAsBusinessController(LocalTestData, utilityFunctionLocal);


  await page.getByRole('button', { name: 'Redigera Nytt Kontoägare' }).click();
  await page.locator("//button[@title='Rensa val']").first().click();
  await page.locator("//label[text()='Nytt Kontoägare']//..//input[@placeholder='Sök Personer...']").first().click();
  await page.locator("//label[text()='Nytt Kontoägare']//..//input[@placeholder='Sök Personer...']").first().fill(LocalTestData.get("ChangedAccountOwner"));
  await page.getByRole('option', { name: LocalTestData.get("ChangedAccountOwner") + " Sales"}).click();
  await page.getByLabel('Nytt värde godkänt').check();
  await page.getByRole('button', { name: 'Spara' }).click();
  await expect(page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Godkänd av']//..//..//..//lightning-formatted-text")).toContainText(LocalTestData.get("SalesRepUser"));
  const todaysDate = await utilityFunctionLocal.TodaysDate();
  await expect(page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Godkänd av']//..//..//..//lightning-formatted-text")).toContainText(todaysDate);


  const contextAdmin = await browser.newContext();
  const pageAdmin = await contextAdmin.newPage();
  await utilityFunctionLocal.executeApexCode(pageAdmin, `Database.executeBatch(new BatchAccountSegmention('reparent'), 20);`);
  await page.waitForTimeout(60000);
  await page.reload();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Enhet']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'Enterprise')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='BusinessUnit']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewBusinessUnit") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='SubBusinessUnitLvl1']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubBusinessUnitLvl1") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='SubBusinessUnitLvl2']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubBusinessUnitLvl2") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Business Sales Unit']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSector") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Säljenhet']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSalesUnit") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontots Säljteam']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewCanamn") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Delsegment ID']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubSegmentID") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='CA']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("CA") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Delsegment namn']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("SubSegmentnName") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Bransch']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("Industry") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontotyp ID']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("AccountTypeID") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontoposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Kundkonto')]").first().hover();
  

  //Close all browserss
  await context.close();

});


