const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC022_CRMFiber_RegressionTest';



test('TC022_CRMFiber_RegressionTest_Create-Fiber-Opportunity-unti-closure', async function ({ browser }) {


  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();



  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const contractPage = poManager.getContractPage();
  const opportunityPage = poManager.getOpportunityPage();


  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();


  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);



  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "C&SB");



  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupCRMFiberOpportunityContract(LocalTestData, utilityFunctionLocal);



  //Step 4 - Create standard process Opportunity, add contact and Product on Opportunity
  var Opportunity = await opportunityPage.createCRMFiberOpportunity(LocalTestData, utilityFunctionLocal);
  var OpportunityName = Opportunity[0];
  var OpportunityID = Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);


  // Step 5 - Close the opportunity and then cancel it
  await page.locator('button').filter({ hasText: 'Markera Fas som färdig(t)' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fas']//..//..//..//lightning-formatted-text[text()='Offert skickad']").click();
  await page.locator('button').filter({ hasText: 'Markera Fas som färdig(t)' }).click();
  await page.getByLabel('Fas*').selectOption('Vunnen');
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fas']//..//..//..//lightning-formatted-text[text()='Vunnen']").click();
  await page.locator('button').filter({ hasText: 'Ändra stängda Fas' }).click();
  await page.getByLabel('Fas*').selectOption('Förlorad');
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.getByText('Motivering: Vid avbruten behö').click();
  await page.locator('button').filter({ hasText: 'Ändra stängda Fas' }).click();
  await page.getByLabel('Fas*').selectOption('Avbruten');
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.getByText('Motivering: Vid avbruten behö').click();
  await page.getByRole('button', { name: 'Redigera Motivering' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Motivering']").first().click();
  await page.getByText('Priset', { exact: true }).click();
  await page.getByLabel('Varför Vann/Förlorade vi affä').fill('Test cancel');
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fas']//..//..//..//lightning-formatted-text[text()='Vunnen']").click();
  await page.locator('button').filter({ hasText: 'Ändra stängda Fas' }).click();
  await page.getByLabel('Fas*').selectOption('Förlorad');
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fas']//..//..//..//lightning-formatted-text[text()='Förlorad']").click();
  await page.locator('button').filter({ hasText: 'Ändra stängda Fas' }).click();
  await page.getByLabel('Fas*').selectOption('Avbruten');
  await page.getByRole('button', { name: 'Spara' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fas']//..//..//..//lightning-formatted-text[text()='Avbruten']").click();


  //Close all browserss
  await context.close();



});