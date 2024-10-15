const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC010_MCSales_RegressionTest';



test('TC010_MCSales_RegressionTest_SOHO_NewSales-Ramavtal-agreement-creation_BeyondSalesRepManadate_MobilTotal-ITSupport-ICT', async function ({ browser }) {

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



  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);



  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupCancelMCSalesContract(LocalTestData, utilityFunctionLocal);
  const accountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where Org_Nr__c= \'" + LocalTestData.get("OrgNumber") + "\'");
  const userID = await utilityFunctionLocal.RunSOQLQuery("select Id from User where Email ='yogesh-sahebrao.jadhav@sogeti.se'");
  var updatedData = {
    OwnerId: userID
  };
  await utilityFunctionLocal.RunUpdateDML("Account", accountID, updatedData);



  //Step 4 - Create standard process Opportunity, add contact and Product on Opportunity
  const Opportunity = await opportunityPage.createMCSalesOpportunityWithContactAndProduct(LocalTestData, utilityFunctionLocal);
  const OpportunityName = Opportunity[0];
  const OpportunityID = Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);



  //Step 5 - Perform prisforhandling
  await opportunityPage.performPrisforhandling(LocalTestData);
  if (LocalTestData.get("SalesFlowType") === "Renegotiation") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "Försäljning");
    await quotePageSalesManager.performOmforhandlingQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityName);
    await contextSalesManager.close();
    const QuoteID = await utilityFunctionLocal.RunSOQLQuery("select id from Quote where OpportunityId = '" + OpportunityID + "'");
    const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
    await page.goto(secretsData.get("environmentURL") + "/lightning/r/Quote/" + QuoteID + "/view");
    await quotePage.quoteKonfigureraButton.click();
  }



  //Step 6 - Add Products to the cart and configure withing sales rep mandate
  await faCartPage.AddProductToTheCart(LocalTestData);
  await faCartPage.ConfigureMCSalesProductInTheCart(LocalTestData);
  if (LocalTestData.get("SalesFlowType") === "Renegotiation") {
    await faCartPage.ConfigureMCSalesProductForRenegotiationInTheCart(LocalTestData);
  }



  //Step 7 - Perform validera priser, verify approval flags based on sales mandates and perform slutfor konfiguration
  await faCartPage.PerformValideraPriserAndVerifyApprovalFlags(LocalTestData);
  await faCartPage.PerformSlutforKonfigurationAndQuoteApproval(LocalTestData, OpportunityName);
  if (LocalTestData.get("WithinUserMandate") === "WithinSalesManagerMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "Försäljning");
    await quotePageSalesManager.performQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityName);
    await contextSalesManager.close();

  } else if (LocalTestData.get("WithinUserMandate") === "WithinSalesDirectorMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "Försäljning");
    await quotePageSalesManager.performQuoteApprovalAndPeerAssignment(utilityFunctionLocal, LocalTestData, OpportunityName, LocalTestData.get("SalesDirectorUser"));
    await contextSalesManager.close();

    const contextSalesDirector = await browser.newContext();
    const pageSalesDirector = await contextSalesDirector.newPage();
    const poManagerSalesDirector = new POManager(pageSalesDirector);
    const loginPageSalesDirector = poManagerSalesDirector.getLoginPage();
    const quotePageSalesDirector = poManagerSalesDirector.getQuotePage();
    await loginPageSalesDirector.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesDirector.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesDirectorUser"), "Försäljning");
    await quotePageSalesDirector.performQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityName);
    await contextSalesDirector.close();

  } else if (LocalTestData.get("WithinUserMandate") === "WithinCommercialManagerMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "Försäljning");
    await quotePageSalesManager.performQuoteApprovalAndPeerAssignment(utilityFunctionLocal, LocalTestData, OpportunityName, LocalTestData.get("SalesDirectorUser"));
    await contextSalesManager.close();

    const contextSalesDirector = await browser.newContext();
    const pageSalesDirector = await contextSalesDirector.newPage();
    const poManagerSalesDirector = new POManager(pageSalesDirector);
    const loginPageSalesDirector = poManagerSalesDirector.getLoginPage();
    const quotePageSalesDirector = poManagerSalesDirector.getQuotePage();
    await loginPageSalesDirector.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesDirector.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesDirectorUser"), "Försäljning");
    await quotePageSalesDirector.performQuoteApprovalAndPeerAssignment(utilityFunctionLocal, LocalTestData, OpportunityName, LocalTestData.get("CommercialManagerUser"));
    await contextSalesDirector.close();

    const contextCommercialManager = await browser.newContext();
    const pageCommercialManager = await contextCommercialManager.newPage();
    const poManagerCommercialManager = new POManager(pageCommercialManager);
    const loginPageCommercialManager = poManagerCommercialManager.getLoginPage();
    const quotePageCommercialManager = poManagerCommercialManager.getQuotePage();
    await loginPageCommercialManager.adminUserLogin(utilityFunctionLocal);
    await loginPageCommercialManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("CommercialManagerUser"), "Försäljning");
    await quotePageCommercialManager.performQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityName);
    await contextCommercialManager.close();
  }



  //Step 8 - Verify Autotask ID is received on Opportunity and Quote record
  const QuoteAutoTaskID = await utilityFunctionLocal.RunSOQLQuery("Select TeliaSE_Autotask_QuoteId__c from Quote where OpportunityId = '" + OpportunityID + "'");
  const OpportuityAutoTaskID = await utilityFunctionLocal.RunSOQLQuery("Select MC_Autotask_OppId__c from Opportunity where id='" + OpportunityID + "'");
  if (!(Boolean(OpportuityAutoTaskID))) {
    console.log("OpportuityAutoTaskID is NULL");
    expect(true).toBe(false);
  };
  if (!(Boolean(QuoteAutoTaskID))) {
    console.log("QuoteAutoTaskID is NULL");
    expect(true).toBe(false);
  };



  // Step 9 - Perform skapa offertdokument
  await quotePage.performSkapaOffertdokumentOnMCSalesQuote(LocalTestData, OpportunityName);



  // Step 10 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  await contractPage.performMCSalesSkapaAvtalsdokument(LocalTestData);
  await contractPage.performMCSalesContractApproval(LocalTestData);



  //Step 11 - Sign the contract manually
  await contractPage.performMCSalesContractSendForSigning(LocalTestData);
  await contractPage.performMCSalesContractManualSigning(utilityFunctionLocal);



  //Step 12 - Make contract active using admin
  const TodaysDate = await utilityFunctionLocal.TodaysDate();
  const ContractID = await utilityFunctionLocal.RunSOQLQuery("Select id from Contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  updatedData = {
    StartDate: TodaysDate,
    TeliaSE_TUPP_Status__c: 'Active'
  };
  await utilityFunctionLocal.RunUpdateDML("Contract", ContractID, updatedData);
  const ContractLineItemID = await utilityFunctionLocal.RunSOQLQuery("Select id from vlocity_cmt__ContractLineItem__c where vlocity_cmt__ContractId__c = '" + ContractID + "' and Name = 'Mobilupplägg TOTAL'");



  //Step 13 - Update Mobil total product end date to 240
  let today = new Date();
  let futureDate = new Date();
  futureDate.setDate(today.getDate() + 240);
  let formattedFutureDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
  updatedData = {
    TeliaSE_End_Date__c: formattedFutureDate
  };
  await utilityFunctionLocal.RunUpdateDML("vlocity_cmt__ContractLineItem__c", ContractLineItemID, updatedData);



  //Step 14 - Perform contract activation and execute batch to trigger email
  const contextAdmin = await browser.newContext();
  const pageAdmin = await contextAdmin.newPage();
  await utilityFunctionLocal.executeApexCode(pageAdmin, `TeliaSE_ContractBatch p= New TeliaSE_ContractBatch(); database.executeBatch(p,1);`)
  await page.waitForTimeout(10000);



  //Step 15 - Verify Autotask ID is received on Opportunity and Quote record
  const ContractAutoTaskID = await utilityFunctionLocal.RunSOQLQuery("Select MC_AutoTask_ContractId__c from Contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  if (!(Boolean(ContractAutoTaskID))) {
    console.log("ContractAutoTaskID is NULL");
    expect(true).toBe(false);
  };



  //Close all browserss
  await context.close();


});


test.afterEach(async ({ page }, testInfo) => {
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  var TestCaseStatus;
  if (testInfo.status === 'passed') {
    TestCaseStatus = "PASS";
  } else if (testInfo.status === 'failed') {
    TestCaseStatus = "FAIL";
  }
  try {
    await utilityFunctionLocal.UpdateJIRAWithTestResult(TestCaseName, TestCaseName, TestCaseStatus);
  } catch (error) {
    console.error('An error occurred:', error);
    console.log(`Finished ${testInfo.title} with status --- ${testInfo.status} but without JIRA result upload`);
  }
  console.log(`Finished ${testInfo.title} with status --- ${testInfo.status}`);
});
