const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC003_MCSales_RegressionTest';


test('TC003_MCSales_RegressionTest_LARGE_NewSales-Ramavtal-agreement-creation_BeyondSalesRepManadate_MobilTotal-TP-ICT-OC', async function ({ browser }) {

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



  await page.frameLocator('iframe[name*="vfFrameId"]').first().getByPlaceholder('Sök').click();
  await page.frameLocator('iframe[name*="vfFrameId"]').first().getByPlaceholder('Sök').fill("IT-support");
  await page.frameLocator('iframe[name*="vfFrameId"]').first().locator("//div[@class='cpq-product-list']//a[contains(text(),'Visa mer')]").click();
  await page.waitForTimeout(20000);
  expect(await page.frameLocator('iframe[name*="vfFrameId"]').first().locator("//p[normalize-space(.)='IT-support Standard' or normalize-space(.)='IT-support Plus']//..//..//..//button[normalize-space(.)='Lägg till']").count()).toEqual(2);

  
  //R23.04 - LTAT-25578 - Sales stop of TP Offering in AMANDA 
  await page.frameLocator('iframe[name*="vfFrameId"]').first().getByPlaceholder('Sök').click();
  await page.frameLocator('iframe[name*="vfFrameId"]').first().getByPlaceholder('Sök').fill("Touchpoint");
  await page.frameLocator('iframe[name*="vfFrameId"]').first().locator("//div[@class='cpq-product-list']//a[contains(text(),'Visa mer')]").click();
  await page.waitForTimeout(20000);
  expect(await page.frameLocator('iframe[name*="vfFrameId"]').first().locator("//p[normalize-space(.)='Touchpoint']//..//..//..//button[normalize-space(.)='Lägg till']").count()).toEqual(0);


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

    //Verify Approval pricing improvement of apending currency kr to 0
    const ProductName = "Nummerserie, 10 nummer (fast)";
    await pageCommercialManager.reload();
    //R23.04 - LTAART-410 - Grouping and sequencing in approval table
    //await pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/div[text()='" + ProductName + "']").nth(0).click();
    //await expect(pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/div[text()='" + ProductName + "']//parent::td//parent::tr/td[4]/p").nth(0)).toHaveText('0 kr');
    //await expect(pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/div[text()='" + ProductName + "']//parent::td//parent::tr/td[5]/p").nth(0)).toHaveText('0 kr');
    //await expect(pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/div[text()='" + ProductName + "']//parent::td//parent::tr/td[14]/p").nth(0)).toHaveText('1000 kr');
    await pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody//td[1 and contains(normalize-space(.),'" + ProductName + "')]").nth(0).click();
    await expect(pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody//td[1 and contains(normalize-space(.),'" + ProductName + "')]//parent::td//parent::tr/td[4]/p").nth(0)).toHaveText('0 kr');
    await expect(pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody//td[1 and contains(normalize-space(.),'" + ProductName + "')]//parent::td//parent::tr/td[5]/p").nth(0)).toHaveText('0 kr');
    await expect(pageCommercialManager.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody//td[1 and contains(normalize-space(.),'" + ProductName + "')]//parent::td//parent::tr/td[14]/p").nth(0)).toHaveText('1 000 kr');
    await contextCommercialManager.close();
  }



  // Step 9 - Perform skapa offertdokument
  await quotePage.performSkapaOffertdokumentOnMCSalesQuote(LocalTestData, OpportunityName);
  await expect(page.locator('#brandBand_2')).toContainText('FramgångsguideSyfte: Skapa avtal för att göra priserna tillgängliga för kunden och fortsätta processenObligatoriska aktiviteter i detta steg: Klicka på knappen Skapa avtalAktiviteter i detta steg:"Skapa offertdokument", ändringar av kvantitet i offerten görs inne i varukorgen – klicka på knappen Konfigurera för att komma dit');


  // Step 10 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  await contractPage.performMCSalesSkapaAvtalsdokument(LocalTestData);
  await expect(page.locator('#brandBand_2')).toContainText('FramgångsguideSyfte: Förbereda avtal för signeringObligatoriska aktiviteter:Klicka på Lägg till nyttjare i de fall det finnsSkapa avtalsdokument genom att klicka på Skapa avtalsdokumentVid behov av godkännande från ledare klicka på Skicka för godkännande annars ändra status till GodkäntKlicka på Skapa case i TUPP för att skapa ett ärende i TUPP (om det skapats tidigare visas inte denna knappen)Övriga aktiviteter:Skapa offert genom att klicka på Skapa offertFör att avbryta avtalet klicka på Avbryt avtalJustera prisförhandling genom att klicka pä Ändra prisförhandling');
 

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
