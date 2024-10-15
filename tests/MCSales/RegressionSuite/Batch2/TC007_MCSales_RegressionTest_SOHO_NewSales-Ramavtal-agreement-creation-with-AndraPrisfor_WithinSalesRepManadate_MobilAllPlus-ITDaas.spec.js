const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC007_MCSales_RegressionTest';



test('TC007_MCSales_RegressionTest_SOHO_NewSales-Ramavtal-agreement-creation-with-AndraPrisforhandling_WithinSalesRepManadate_MobilAllPlus-ITDaas', async function ({ browser }) {

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


  // Step 10 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  const ContractID = await utilityFunctionLocal.RunSOQLQuery("select id from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");



  //Step 12 - Cancel the contract and Perform Andra prisforhandling
  await page.getByRole('button', { name: ' Ändra prisförhandling' }).click();
  await expect(page.locator('#modal-content-id-1')).toContainText('Är du säker på att du vill ändra prisförhandlingen? Klicka på Fortsätt för att komma till varukorgen.');
  await page.getByText('Fortsätt', { exact: true }).click();



  //Step 13 - Configure and approve the cart for new discount percentage and quantity
  LocalTestData.set("Products", "IT-avdelning");
  await page.reload();
  await faCartPage.AddProductToTheCart(LocalTestData);
  await faCartPage.ConfigureMCSalesProductInTheCart(LocalTestData);
  await faCartPage.PerformValideraPriserAndVerifyApprovalFlags(LocalTestData);
  await faCartPage.cartSlutforKonfiguration.click();
  await expect(faCartPage.cartSkapaOffertDokumentErrorMessage).toContainText('Du har valt ett IT-avdelningerbjudande och för att du skall kunna komma vidare behöver du klicka på Kvalificera produkter -> Kvalificera produkter, markera kryssrutan för IT-avdelning och fyll sedan i kundinformationen.');
  /*
  await faCartPage.cartStangKonfiguration.click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//a[contains(normalize-space(.),'"+OpportunityName+"')]").first().click();
  await opportunityPage.prisforhanldingButton.click();
  */
  await faCartPage.cartKvalificeraProdukter.click();
  await faCartPage.KvalificeraProdukterHeading.click();
  const page1Promise = page.waitForEvent('popup');
  await faCartPage.KvalificeraProdukterLeveranskontroll.click();
  const page1 = await page1Promise;
  await page1.getByRole('heading', { name: 'Leveranskontroll' }).click();
  const page2Promise = page.waitForEvent('popup');
  await faCartPage.KvalificeraProdukterSammanstallning.click();
  const page2 = await page2Promise;
  await page2.getByRole('heading', { name: 'Sammanställning' }).click();
  await faCartPage.avbrytButton.first().click();
  await faCartPage.cartKvalificeraProdukter.click();
  await faCartPage.KvalificeraProdukterHeading.click();
  await faCartPage.KvalificeraProdukter.click();
  await page.getByRole('heading', { name: 'VÄLJ TJÄNSTER ATT KVALIFICERA' }).click();
  await page.locator("//vlocity_cmt-omniscript-checkbox[not(contains(@class,'hide'))]//div/label[contains(normalize-space(.), 'IT-avdelning')]/span[@class='slds-checkbox_faux']").click();
  await page.getByRole('button', { name: 'Nästa', exact: true }).click();
  await page.getByLabel('*Kontor- ort/orter/utland').fill('Test Automation Kontor- ort/orter/utland');
  await page.getByLabel('*Nuvarande IT-Partner').fill('Test Automation Nuvarande IT-Partner');
  await page.getByLabel('*Kundens behov').fill('Test Automation Kundens behov');
  await page.getByLabel('*Ange antal användare').fill('Test Automation Ange antal användare');
  await page.getByLabel('*Ange antal datorer').fill('Test Automation Ange antal datorer');
  await page.getByLabel('*Nätverksenheter (Ex switch, brandvägg, accesspunkt)').fill('Test Automation Nätverksenheter (Ex switch, brandvägg, accesspunkt)');
  await page.getByLabel('*Servers (egna lokalt och/eller externt)').fill('Test Automation Servers (egna lokalt och/eller externt)');
  await page.getByLabel('*Office eller Microsoft 365 (mandatory, text area)').fill('Test Automation Office eller Microsoft 365');
  await page.getByLabel('*Ytterligare information').fill('Test Automation Ytterligare information');
  await page.getByText('MARKERA OM DU ÄR FÄRDIG (SKICKA TILL IT-AVDELNING TAM)').click();
  await page.getByRole('button', { name: 'Nästa', exact: true }).click();
  /*
  await page.getByRole('button', { name: ' Ändra prisförhandling' }).click();
  await expect(page.locator('#modal-content-id-1')).toContainText('Är du säker på att du vill ändra prisförhandlingen? Klicka på Fortsätt för att komma till varukorgen.');
  await page.getByText('Fortsätt', { exact: true }).click();
  */
  await faCartPage.PerformSlutforKonfigurationAndQuoteApproval(LocalTestData, OpportunityName);



  //Step 15 - Perform Skapa avtal and verify old contract is cancelled
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  const OldContractStatus = await utilityFunctionLocal.RunSOQLQuery("select status from Contract where id = '" + ContractID + "'");
  if (OldContractStatus !== "Cancelled") {
    expect(true).toBe(false);
  }



  //Step 15 - Perform Skapa avtalsdokument
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
