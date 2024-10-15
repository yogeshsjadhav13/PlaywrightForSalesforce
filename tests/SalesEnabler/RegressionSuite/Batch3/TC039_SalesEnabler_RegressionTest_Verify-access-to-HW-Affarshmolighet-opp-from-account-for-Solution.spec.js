const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC039_SalesEnabler_RegressionTest';


test('TC039_SalesEnabler_RegressionTest_Verify-access-to-HW-Affarshmolighet-opp-from-account-for-Solution', async function ({ browser }) {

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
  const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
  const accountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where Org_Nr__c= \'" + LocalTestData.get("OrgNumber") + "\'");
  await page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
  await page.getByRole('button', { name: 'Ny HW affärsmöjlighet' }).click();
  await page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(LocalTestData.get("OpportunityName"));
  await opportunityPage.opportunityCloseDateTextbox.click();
  const todaysDate = await utilityFunctionLocal.getWeekdayFromSpecifiedDaysFromToday(5);
  await opportunityPage.opportunityCloseDateTextbox.type(todaysDate);
  await page.getByLabel('New Sales (12 mån)').fill('123');
  await page.getByLabel('Continuation Sales (12 mån)').fill('123');
  await page.locator("//div[contains(normalize-space(.),'Nuvarande avtalspart') and contains(@class,'uiInput')]//a").first().click();
  await page.getByRole('option', { name: 'Atea' }).click();
  await opportunityPage.saveButton.click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[@class='pageLevelErrors']//a[text()='Affärsmöjlighetstypen HW Affärsmöjlighet får endast registreras av Device Sales.']").click();


  //Close all browserss
  await context.close();

});


