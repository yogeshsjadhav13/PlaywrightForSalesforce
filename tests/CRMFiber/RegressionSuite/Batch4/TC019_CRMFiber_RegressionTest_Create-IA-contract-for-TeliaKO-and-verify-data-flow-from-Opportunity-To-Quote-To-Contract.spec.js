const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC019_CRMFiber_RegressionTest';



test('TC019_CRMFiber_RegressionTest_Create-IA-contract-for-TeliaKO-withinAMMandate-and-verify-data-flow-from-Opportunity-To-Quote-To-Contract', async function ({ browser }) {


  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();



  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const opportunityPage = poManager.getOpportunityPage();
  const faCartPage = poManager.getFACartPage();
  const quotePage = poManager.getQuotePage();
  const contractPage = poManager.getContractPage();



  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  const userID = await utilityFunctionLocal.RunSOQLQuery("select id from User where name = '" + LocalTestData.get("SalesRepUser") + "'");
  const userRoleId = await utilityFunctionLocal.RunSOQLQuery("select id from UserRole where name = '" + LocalTestData.get("SalesRepRole") + "'");
  var updatedData = {
    UserRoleId: userRoleId
  };
  await utilityFunctionLocal.RunUpdateDML("User", userID, updatedData);



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
  console.log(OpportunityName +"   ----   "+OpportunityID);



  //Step 5 - Perform offer creation
  await opportunityPage.offertCreation(LocalTestData, OpportunityName);
  if (LocalTestData.get("WithinUserMandate") === "WithinSalesDirectorMandate" || LocalTestData.get("QuoteRecordType") === "Offert - Skapa ett nytt Ramavtal") {
    await faCartPage.BlakalkylGaTillbaka.click();
    await quotePage.EnterBlakalkylOnQuote();
    await opportunityPage.CRMFiberQuoteVarukorgButton.click();
  }


  //Step 6 and 7 - Add Products to the cart and configure withing sales rep mandate, approve the quote
  await faCartPage.AddProductToTheCart(LocalTestData);
  await faCartPage.ConfigureCRMFiberProductInTheCart(LocalTestData);
  await faCartPage.enterBlakalkylDetails(LocalTestData, OpportunityName);
  await faCartPage.PerformGaVidareAndQuoteApproval(LocalTestData);



  // Step 8 - Perform skapa offertdokument
  await quotePage.verifyCRMFiberOpportunityToQuoteDataFlow(LocalTestData, utilityFunctionLocal);
  await quotePage.performSkapaOffertdokumentOnCRMFiberQuote(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);



  // Step 9 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnCRMFiberQuote(OpportunityName);
  await contractPage.verifyCRMFiberQuoteToContractDataFlow(LocalTestData, utilityFunctionLocal);
  


  //Close all browserss
  await context.close();



});