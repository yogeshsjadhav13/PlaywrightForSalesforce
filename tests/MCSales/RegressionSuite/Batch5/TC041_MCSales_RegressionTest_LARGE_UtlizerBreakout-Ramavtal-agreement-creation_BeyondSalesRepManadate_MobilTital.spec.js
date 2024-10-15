const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC041_MCSales_RegressionTest';



test('TC041_MCSales_RegressionTest_LARGE_UtlizerBreakout-Ramavtal-agreement-creation_BeyondSalesRepManadate_MobilTital', async function ({ browser }) {

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
  LocalTestData.set("UtilizerBreakoutContractStatus", "Draft");


  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);



  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupCancelMCSalesContract(LocalTestData, utilityFunctionLocal);
  var accountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where Org_Nr__c= '" + LocalTestData.get("OrgNumber") + "'");
  var parentAgreementOrgNumber = "5599997995";
  var parentAgreementContractID = await utilityFunctionLocal.RunSOQLQuery("select FA_Contract__c from account where Org_Nr__c= '" + parentAgreementOrgNumber + "'");
  var updatedData = {
    FA_Contract__c: parentAgreementContractID,
    TeliaSE_Utilzer_Role__c: 'Utilizer'
  };
  await utilityFunctionLocal.RunUpdateDML("Account", accountID, updatedData);



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


  //Verify bundle benefit for Operator Connect and Microsoft 365
  var ProductName = "Operator Connect";
  await faCartPage.AddSingleProductToTheCart(ProductName);
  var ProductName = "Microsoft 365";
  var subProductName = "Microsoft 365 Business Basic";
  await faCartPage.AddSingleProductToTheCart(ProductName);
  await faCartPage.cartFrame.locator("//span[@class='cpq-product-name' and text()='" + ProductName + "']").click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and text()='" + subProductName + "']").click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and text()='" + subProductName + "']//ancestor::div[@class='cpq-item-base-product']//button[contains(text(),'Lägg till')]").click();
  await faCartPage.cartFrame.locator("//h2[contains(text(),'Tillagd tjänst: " + subProductName + "')]").click();
  await faCartPage.PerformProductConfiguration(LocalTestData, ProductName);
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName + "']//ancestor::div[@class='cpq-item-base-product']//child::div[6]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'7')]").click();


  var ProductName = "Operator Connect";
  var subProductName = "Mobil användare";
  await faCartPage.cartFrame.locator("//span[@class='cpq-product-name' and text()='" + ProductName + "']").click();
  await faCartPage.toggleSubOffersInProduct(ProductName, "Huvudabonnemang");
  await faCartPage.PerformProductConfiguration(LocalTestData, ProductName);
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName + "']//ancestor::div[@class='cpq-item-base-product']//child::div[5]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'67')]").click();
  await faCartPage.DeleteSingleProductToTheCart(ProductName);
  var ProductName = "Microsoft 365";
  var subProductName = "Microsoft 365 Business Basic";
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='" + subProductName + "']//ancestor::div[@class='cpq-item-base-product']//child::div[6]//child::div[1]//child::div[contains(@ng-if,'TeliaSE_Approved_Price__c') and contains(normalize-space(.),'5')]").click();
  await faCartPage.DeleteSingleProductToTheCart(ProductName);


  //Step 7 - Add Products to the cart and configure withing sales rep mandate
  await faCartPage.AddProductToTheCart(LocalTestData);
  await faCartPage.ConfigureMCSalesProductInTheCart(LocalTestData);
  if (LocalTestData.get("SalesFlowType") === "Renegotiation") {
    await faCartPage.ConfigureMCSalesProductForRenegotiationInTheCart(LocalTestData);
  }



  //Step 8 - Perform validera priser, verify approval flags based on sales mandates and perform slutfor konfiguration
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


  //Verfiy Forman% for bundle benefit
  await page.locator("//span[text()='Systeminformation']").click();
  await page.locator("//span[text()='Systeminformation']").click();
  await page.locator("//ul[@class='uiAbstractList']//a[text()='Assignment']").first().click();
  const SubProducts = ("Mobil användare;Fast användare;Servicenummer;Microsoft 365 Business Basic;Microsoft 365 Business Standard;Microsoft 365 Business Premium").split(";");
  for (let iteration = 0; iteration < SubProducts.length; iteration++){
    //R23.04 - LTAART-410 - Grouping and sequencing in approval table
    //await expect(page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/div[text()='" + SubProducts[iteration] + "']//parent::td//parent::tr/td[8]/p").nth(0)).toHaveText('2 %');
    await expect(page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody//td[1 and contains(normalize-space(.),'" + SubProducts[iteration] + "')]//parent::td//parent::tr/td[8]/p").nth(0)).toHaveText('2 %');
  }
  await page.locator("//div[contains(@class,'active')]//span[text()='Offertnamn']//parent::dt//following-sibling::dd//a[contains(normalize-space(.),'" + OpportunityName + "')]").click();



  // Step 9 - Perform skapa offertdokument
  await quotePage.performSkapaOffertdokumentOnMCSalesQuote(LocalTestData, OpportunityName);



  // Step 10 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  await contractPage.performMCSalesSkapaAvtalsdokument(LocalTestData);



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
