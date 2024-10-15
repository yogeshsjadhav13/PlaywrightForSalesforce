const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC019_MCSales_RegressionTest';



test('TC019_MCSales_RegressionTest_SOHO_Renegotiation-Ramavtal-agreement-creation_BeyondSalesRepManadate_MobilTotal-OC-ITDaas', async function ({ browser }) {

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


  //Step 4 - Create standard process Opportunity, add contact and Product on Opportunity
  const Opportunity = await opportunityPage.createMCSalesOpportunityWithContactAndProduct(LocalTestData, utilityFunctionLocal);
  const OpportunityName = Opportunity[0];
  const OpportunityID = Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);


  //Step 5 - Perform prisforhandling
  await opportunityPage.performPrisforhandling(LocalTestData);


  //Getting the quote approved from Manager and landing in the cart
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


  //Verify Bundle benefits for Microsfot 365
  var ProductName = "Microsoft 365";
  var subProductName = "Microsoft 365 Business Basic";
  var subProductName1 = "Microsoft 365 Business Premium";
  var subProductName2= "Microsoft 365 Business Standard";
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName + "']//ancestor::div[@class='cpq-item-base-product']//child::div[6]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'7')]").click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName1 + "']//ancestor::div[@class='cpq-item-base-product']//child::div[6]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'7')]").click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName2 + "']//ancestor::div[@class='cpq-item-base-product']//child::div[6]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'7')]").click();



  //Verify bundle benefit for Operator connect product
  var ProductName = "Operator Connect";
  var subProductName = "Mobil användare";
  var subProductName1 = "Servicenummer";
  await faCartPage.cartFrame.locator("//span[text()='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-alignment']//a[contains(@ng-click,'config')]").first().click({ timeout: 5000 });
  await faCartPage.configureSparaSavingButton.click();
  await faCartPage.cartFrame.locator("//h2[contains(text(),'Golvpris sänks med ytterligare 2% vid bundling')]").first().click();
  await faCartPage.configureCloseButton.click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName + "']//ancestor::div[@class='cpq-item-base-product']//child::div[5]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'72')]").click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName1 + "']//ancestor::div[@class='cpq-item-base-product']//child::div[5]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'87')]").click();



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


  //Step 11 - Verify if document is attached on Opportunity or not
  await opportunityPage.VerifyOfferDocOnOpportunity(OpportunityID, utilityFunctionLocal);



  //Step 12 - Verify ITDaas status on prisforhandling
  await page.getByRole('button', { name: 'Prisförhandling' }).click();
  await page.getByRole('heading', { name: 'VÄLJ TJÄNSTER ATT KVALIFICERA' }).click();
  await expect(page.locator("//vlocity_cmt-omniscript-text-block[contains(@data-omni-key,'ITDaaS_Status') and not(contains(@class,'hide'))]//p")).toContainText('Färdigställd');
  await expect(page.locator("//vlocity_cmt-omniscript-text-block[contains(@data-omni-key,'ITSupport_Status') and not(contains(@class,'hide'))]//p")).toContainText('Färdigställd');


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