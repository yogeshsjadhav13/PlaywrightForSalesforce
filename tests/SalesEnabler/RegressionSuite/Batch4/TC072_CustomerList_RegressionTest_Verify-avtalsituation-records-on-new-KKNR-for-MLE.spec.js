const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC072_CustomerList_RegressionTest';


test.skip('TC072_CustomerList_RegressionTest_Verify-avtalsituation-records-on-new-KKNR-for-MLE', async function ({ browser }) {

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

  const contextAdmin = await browser.newContext();
  const pageAdmin = await contextAdmin.newPage();
  await utilityFunctionLocal.executeApexCode(pageAdmin, `BatchToAddAgreSitnOnNewlyCreatedKKNR  p= New BatchToAddAgreSitnOnNewlyCreatedKKNR (); database.executeBatch(p,50);`);
  await page.waitForTimeout(20000);
  await page.reload();
  await expect(page.frameLocator('iframe[name*="vfFrameId"]').first().locator("//table[contains(@id,'agreementPage')]")).toContainText('AvtalskategoriLeverantörStartdatumSlutdatumPåminnelse (dagar innan)PåminnelseKommentarAvtalssituationspost aktivNetworks - Mobile TelephonyNetworks - Fixed TelephonyCollaboration&UC-Cloud Com SolutionsNetworks - BroadbandCustomer Meeting (Contact Center)EquipmentCollaboration&UC - Meeting ServicesServicesIT-Service (Cygate) ServiceeID & SecurityIoTIT-Service (Telia)IT-Service (Cygate) Hardware');

  //Close all browserss
  await context.close();

});


