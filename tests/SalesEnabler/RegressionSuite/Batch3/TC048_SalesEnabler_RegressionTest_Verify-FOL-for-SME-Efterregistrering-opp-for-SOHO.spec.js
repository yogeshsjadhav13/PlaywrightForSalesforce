const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC048_SalesEnabler_RegressionTest';


test.skip('TC048_SalesEnabler_RegressionTest_Verify-FOL-for-SME-Efterregistrering-opp-for-SOHO', async function ({ browser }) {

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


  //Step 7 - Add product 1 on opportunity and verify sales value
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName1"), LocalTestData.get("Engangsavgift1"), LocalTestData.get("Manadsavgift1"), LocalTestData.get("TypAvForsaljning1"), LocalTestData.get("Avtalstid1"), LocalTestData.get("Antal1"));
  await opportunityPage.verifySalesValuesOnOpportunity("0 kr", "244 kr", "0 kr", "244 kr", "244 kr", "0 kr");


  //Step 8 - Add product 2 on opportunity and verify sales value
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName2"), LocalTestData.get("Engangsavgift2"), LocalTestData.get("Manadsavgift2"), LocalTestData.get("TypAvForsaljning2"), LocalTestData.get("Avtalstid2"), LocalTestData.get("Antal2"));
  await opportunityPage.verifySalesValuesOnOpportunity("0 kr", "244 kr", "244 kr", "488 kr", "244 kr", "244 kr");


  //Step 9 - Verify seller name and FOL values
  await opportunityPage.verifySellerName(LocalTestData, utilityFunctionLocal);
  LocalTestData.set("OpportunityName", OpportunityName);
  LocalTestData.set("OpportunityID", OpportunityID);
  LocalTestData.set("ContinuationSalesAmount", "244 kr");
  LocalTestData.set("NewSalesAmount", "244 kr");
  LocalTestData.set("SalesValueAmount", "244 kr");
  LocalTestData.set("Probability", "80 %");
  LocalTestData.set("WeightedNewSalesAmount", "195 kr");
  LocalTestData.set("WeightedContinuationSalesAmount", "195 kr");
  LocalTestData.set("UppsidaNewSales", "49 kr");
  LocalTestData.set("UppsidaContinuationSales", "49 kr");
  await opportunityPage.verifySalesValuesOnFOL(LocalTestData, utilityFunctionLocal);


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


