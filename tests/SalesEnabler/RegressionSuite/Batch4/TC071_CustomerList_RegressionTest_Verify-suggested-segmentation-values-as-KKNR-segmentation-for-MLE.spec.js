const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC071_CustomerList_RegressionTest';


test('TC071_CustomerList_RegressionTest_Verify-suggested-segmentation-values-as-KKNR-segmentation-for-MLE', async function ({ browser }) {

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


  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupCustomerListAvtalSituation(LocalTestData, utilityFunctionLocal);
  await contractPage.testDataCleanupCustomerListAccounts(LocalTestData, utilityFunctionLocal);

  const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
  await page.goto(secretsData.get("environmentURL") + "/lightning/page/home");
  await page.getByRole('link', { name: 'Accounts' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('New Account').getByText('Large Organisation', { exact: true }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('*Account Name').fill(LocalTestData.get("AccountName") + '_LargeOrganisation');
  await page.getByRole('textbox', { name: 'Org. nr' }).fill('1234567890');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByText('Account "' + LocalTestData.get("AccountName") + '_LargeOrganisation' + '" was').click();


  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  //Step 4 - Create KKNR account as Business controller
  await accountPage.createKKnrAsBusinessController(LocalTestData, utilityFunctionLocal);

  const AccountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where name = '" + LocalTestData.get("AccountName") + "_LargeOrganisation'");
  await page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + AccountID + "/view");
  await page.getByRole('button', { name: 'Redigera Nytt Överordnat konto' }).click();
  await page.getByPlaceholder('Sök Konton...').click();
  await page.getByPlaceholder('Sök Konton...').fill(LocalTestData.get("AccountName"));
  await page.getByRole('option', { name: LocalTestData.get("AccountName") , exact: true}).click();
  await page.getByLabel('Nytt värde godkänt').check();
  await page.getByRole('button', { name: 'Spara' }).click();
  await expect(page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Godkänd av']//..//..//..//lightning-formatted-text")).toContainText(LocalTestData.get("SalesRepUser"));
  const todaysDate = await utilityFunctionLocal.TodaysDate();
  await expect(page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Godkänd av']//..//..//..//lightning-formatted-text")).toContainText(todaysDate);
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Kontoägare']//..//..//..//records-hoverable-link[contains(normalize-space(.),'" + LocalTestData.get("ChangedAccountOwner") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Enhet']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'Enterprise')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt BusinessUnit']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewBusinessUnit") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt SubBusinessUnitLvl1']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubBusinessUnitLvl1") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt SubBusinessUnitLvl2']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubBusinessUnitLvl2") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Sektor']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSector") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Sales Unit']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSalesUnit") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Canamn']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewCanamn") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Delsegment ID']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubSegmentID") + "')]").first().hover();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Ca']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("CA") + "')]").first().hover();
  //await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Delsegment namn']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("SubSegmentnName") + "')]").first().hover();
  //await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Bransch']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("Industry") + "')]").first().hover();


  //Close all browserss
  await context.close();

});


