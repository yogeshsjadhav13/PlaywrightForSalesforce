const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC012_MCSales_RegressionTest';



test('TC012_MCSales_RegressionTest_SOHO_NewSales-Ramavtal-agreement-creation_BeyondSalesRepManadate_MobilPlus-SC', async function ({ browser }) {

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



  //Step 6 - Verify error message for IT-support Standard
  var ProductName = "IT-support Standard";
  await faCartPage.AddSingleProductToTheCart(ProductName);
  await faCartPage.PerformProductConfiguration(LocalTestData, ProductName);
  await faCartPage.cartValideraVarukorgenButton.click();
  await faCartPage.cartSlutforKonfiguration.click();
  await expect(faCartPage.cartSkapaOffertDokumentErrorMessage).toContainText('Du har valt ett IT-supporterbjudande och för att du skall kunna komma vidare behöver du klicka på Kvalificera produkter -> Kvalificera produkter och sedan markera kryssrutan för IT-support.');
  await faCartPage.cartSkapaOffertDokumentErrorMessageCloseButton.click();
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



  // Step 9 - Perform skapa offertdokument
  await quotePage.performSkapaOffertdokumentOnMCSalesQuote(LocalTestData, OpportunityName);



  // Step 10 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  await contractPage.performMCSalesSkapaAvtalsdokument(LocalTestData);
  await contractPage.performMCSalesContractApproval(LocalTestData);
  const ContractID = await utilityFunctionLocal.RunSOQLQuery("select id from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");



  //Step 11 - Perform prisforhandling, update only quanitity for Mobil product, and get the approved quote
  await page.getByRole('button', { name: ' Ändra prisförhandling' }).click();
  await expect(page.locator('#modal-content-id-1')).toContainText('Är du säker på att du vill ändra prisförhandlingen? Klicka på Fortsätt för att komma till varukorgen.');
  await page.getByText('Fortsätt', { exact: true }).click();
  await page.waitForTimeout(5000);
  LocalTestData.set("ProductOfferQuantity", 7);
  LocalTestData.set("WithinUserMandate", "WithinSalesRepMandate");
  LocalTestData.set("Products", "Mobilupplägg All-IN+");
  await page.reload();
  await faCartPage.ConfigureMCSalesProductForRenegotiationInTheCart(LocalTestData);
  LocalTestData.set("Products", "Mobilupplägg All-IN+;Smart Connect");
  await faCartPage.PerformValideraPriserAndVerifyApprovalFlags(LocalTestData);
  await faCartPage.PerformSlutforKonfigurationAndQuoteApproval(LocalTestData, OpportunityName);



  //Step 12 - Perform Skapa avtal and verify old contract is cancelled
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  const OldContractStatus = await utilityFunctionLocal.RunSOQLQuery("select status from Contract where id = '" + ContractID + "'");
  if (OldContractStatus !== "Cancelled") {
    expect(true).toBe(false);
  }



  //Step 13 - Perform Skapa avtalsdokument
  await contractPage.performMCSalesSkapaAvtalsdokument(LocalTestData);
  await contractPage.performMCSalesContractApproval(LocalTestData);



  //Step 14 - Sign the contract manually
  await contractPage.performMCSalesContractSendForSigning(LocalTestData);
  await contractPage.performMCSalesContractManualSigning(utilityFunctionLocal);


  //Step 15 - Execute Apex batch in AMANDA to send signing details in TUPP and verify Tupp interdace name
  const contextAdmin = await browser.newContext();
  const pageAdmin = await contextAdmin.newPage();
  await utilityFunctionLocal.executeApexCode(pageAdmin, `TeliaSE_ChangeAgreementBatch  p= New TeliaSE_ChangeAgreementBatch(); database.executeBatch(p,1);`)
  var TUPPInterfaceName = await utilityFunctionLocal.RunSOQLQuery("select TeliaSE_TUPP_Interface_Name__c from contract where Status != 'Cancelled' and vlocity_cmt__OpportunityId__c= '" + OpportunityID + "'");
  for (let i = 1; i <= 600; i++) {
    TUPPInterfaceName = await utilityFunctionLocal.RunSOQLQuery("select TeliaSE_TUPP_Interface_Name__c from contract where Status != 'Cancelled' and vlocity_cmt__OpportunityId__c= '" + OpportunityID + "'");
    if (TUPPInterfaceName === "ChangeAgreementCase") {
      break;
    }
    await page.waitForTimeout(1000);
  }
  await page.reload();
  await expect(quotePage.skapaAvtalTUPPInterfaceNameText).toContainText('ChangeAgreementCase');  


  
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
