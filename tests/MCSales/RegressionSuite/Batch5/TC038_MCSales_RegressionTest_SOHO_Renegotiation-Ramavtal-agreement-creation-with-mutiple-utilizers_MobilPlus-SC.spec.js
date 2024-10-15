const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC038_MCSales_RegressionTest';
const csvFileName = 'UtilizerAccounts_TC038';


test('TC038_MCSales_RegressionTest_SOHO_Renegotiation-Ramavtal-agreement-creation-with-mutiple-utilizers_MobilPlus-SC', async function ({ browser }) {

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
  var LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();



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



  //Step 7 - Add Products to the cart and configure withing sales rep mandate
  await faCartPage.AddProductToTheCart(LocalTestData);
  await faCartPage.ConfigureMCSalesProductInTheCart(LocalTestData);
  if (LocalTestData.get("SalesFlowType") === "Renegotiation") {
    await faCartPage.ConfigureMCSalesProductForRenegotiationInTheCart(LocalTestData);
  }


  //LTAART-141 Enable negotiation in "införhandling" for Mobile Portfolio in MC sales
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='Mobilupplägg TOTAL']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and text()='Jobbmobil 15 GB']//ancestor::div[@class='cpq-item-base-product']//button[contains(text(),'Lägg till')]").first().click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='Mobilupplägg TOTAL']//ancestor::div[@class='cpq-product-cart-item']//div[contains(@class,'cpq-item') and contains(@class,'children') and text()='Jobbmobil 15 GB']//ancestor::div[@class='cpq-item-base-product']//div[@class='cpq-product-icon-block']/div[@title='Add']").first().click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='Mobilupplägg TOTAL']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and text()='Jobbmobil 10 GB']//ancestor::div[@class='cpq-item-base-product']//button[contains(text(),'Lägg till')]").first().click();
  await page.waitForTimeout(5000);
  await expect(faCartPage.cartFrame.locator("//div[@class='slds-col slds-align-middle']/h2[@ng-if='title']")).toContainText('Jobbmobil 10 GB');
  await expect(faCartPage.cartFrame.locator("//div[@class='slds-col slds-align-middle']/h2[@ng-if='message']")).toContainText('Det är inte tillåtet att lägga till fler abonnemang i detta kluster.');
  await faCartPage.cartSkapaOffertDokumentErrorMessageCloseButton.click();
  await faCartPage.cartFrame.locator("//span[normalize-space(.)='Mobilupplägg TOTAL']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and @ng-class and text()='Jobbmobil 15 GB']//..//..//..//a[contains(@ng-click,'delete')]").click();
  await faCartPage.cartFrame.locator("//button[text()='Ta bort']").click();
  await faCartPage.cartFrame.locator("//h2[contains(text(),'Borttagen tjänst: Jobbmobil 15 GB')]").click();


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
  await quotePage.skapaAvtalButton.click();
  await quotePage.skapaAvtalHeading.click();
  await quotePage.skapaAvtalDatesSelectionPageMessage1.click();
  var productList = (LocalTestData.get("Products")).split(";");
  const WorkingDate = await utilityFunctionLocal.getWeekdayFromSpecifiedDaysFromToday(70);
  var productStartDateTextbox, productEndDateTextbox;
  for (let i = 0; i < productList.length; i++) {
    productStartDateTextbox = quotePage.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
    productEndDateTextbox = quotePage.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#endDate');
    if (productList[i] === 'Mobilupplägg TOTAL' || productList[i] === 'Mobilupplägg All-IN+') {
      await productStartDateTextbox.click();
      await productStartDateTextbox.clear();
      await productStartDateTextbox.fill(WorkingDate);
      break;
    }
  }
  for (let i = 0; i < productList.length; i++) {
    productStartDateTextbox = quotePage.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
    if (productList[i] !== 'Mobilupplägg TOTAL' && productList[i] !== 'Mobilupplägg All-IN+' && productList[i] !== 'Försäkring Mobiltelefon' && productList[i] !== 'Övrigt') {
      await productStartDateTextbox.click();
      await productStartDateTextbox.clear();
      await productStartDateTextbox.fill(WorkingDate);
    }
  }
  if (LocalTestData.get("SalesFlowType") === "Renegotiation") {
    productList = (LocalTestData.get("NewProductsToAddDuringRenegotiation")).split(";");
    for (let i = 0; i < productList.length; i++) {
      productStartDateTextbox = quotePage.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
      productEndDateTextbox = quotePage.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#endDate');
      if (productList[i] === 'Mobilupplägg TOTAL' || productList[i] === 'Mobilupplägg All-IN+') {
        await productStartDateTextbox.click();
        await productStartDateTextbox.clear();
        await productStartDateTextbox.fill(WorkingDate);
        break;
      }
    }
    for (let i = 0; i < productList.length; i++) {
      productStartDateTextbox = quotePage.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
      if (productList[i] !== 'Mobilupplägg TOTAL' && productList[i] !== 'Mobilupplägg All-IN+' && productList[i] !== 'Försäkring Mobiltelefon' && productList[i] !== 'Övrigt') {
        await productStartDateTextbox.click();
        await productStartDateTextbox.clear();
        await productStartDateTextbox.fill(WorkingDate);
      }
    }
  }
  await quotePage.skapaAvtalDatesSelectionPageMessage10.click();
  await quotePage.nextButtonInsideFrame.click();
  await quotePage.skapaAvtalAddUtilizerHeading.click();
  await quotePage.skapaAvtalAddUtilizerJaCheckbox.click();
  await quotePage.nextButtonInsideFrame.click();
  await quotePage.skapaAvtalAddUtilizerMessage1.click();
  await quotePage.skapaAvtalAddUtilizerSearchWithOrgNumberCheckbox.click();
  await quotePage.skapaAvtalAddUtilizerOrgNumberTextbox.type((LocalTestData.get("UtilizerAccountOrgNumber")).toString(), { delay: 100 });
  await quotePage.skapaAvtalAddUtilizerFirstOption.click({ timeout: 180000 });
  await quotePage.skapaAvtalAddUtilizerMessage2.click();
  await quotePage.nextSwedishButton.click();
  await quotePage.skapaAvtalAddiUtilizerResultHeading.click();
  await quotePage.skapaAvtalAddiUtilizerResultMessage1.click();
  await quotePage.skapaAvtalAddiUtilizerResultMessage2.click();
  await page.getByRole('button', { name: 'Lägg till fler' }).click();
  await page.locator('label').filter({ hasText: 'Sök med namn' }).locator('span').first().click();
  await page.getByLabel('Namn', { exact: true }).click();
  await page.getByLabel('Namn', { exact: true }).fill(LocalTestData.get("UtilizerAccountOrgName"));
  await page.getByText(LocalTestData.get("UtilizerAccountOrgName")).click();
  await quotePage.nextSwedishButton.click();
  await quotePage.skapaAvtalAddiUtilizerResultHeading.click();
  await quotePage.skapaAvtalAddiUtilizerResultMessage1.click();
  await quotePage.skapaAvtalAddiUtilizerResultMessage2.click();
  await page.getByRole('button', { name: 'Lägg till fler' }).click();
  await page.locator('label').filter({ hasText: 'Lägg till med fil' }).locator('span').first().click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//label[contains(normalize-space(.),'Ladda upp filer')]//preceding-sibling::input").first().setInputFiles('./resources/TestDataFiles/' + csvFileName + '.csv');
  //await page.getByLabel('Ladda upp filerEller släpp').first().setInputFiles('./resources/TestDataFiles/' + csvFileName + '.csv');
  await page.getByRole('button', { name: 'Klart' }).click();
  await page.getByText(csvFileName + '.csv', { exact: true }).click();
  await quotePage.nextSwedishButton.click();
  await expect(page.locator("//vlocity_cmt-omniscript-text-block[@data-omni-key='displayUtilizer_FileUpload']")).toContainText('Tillagda nyttjare');
  await expect(page.locator("//vlocity_cmt-omniscript-text-block[@data-omni-key='displayUtilizer_FileUpload']")).toContainText('Klicka här');
  await expect(page.locator("//vlocity_cmt-omniscript-text-block[@data-omni-key='displayUtilizer_FileUpload']")).toContainText('för att se vilka nyttjare som lagts till i avtalet.');
  await quotePage.nextSwedishButton.click();
  await quotePage.skapaAvtalAreYouDonePageHeading.click();
  await quotePage.nextSwedishButton.click();
  await quotePage.skapaAvtalTUPPSubscriptionCreationHeading.click();
  await quotePage.skapaAvtalTUPPSubscriptionGoToContractButton.click();
  await quotePage.skapaAvtalTUPPInterfaceStatusSuccessful.click();
  await quotePage.skapaAvtalUtkastStatusText.click();
  await expect(page.getByLabel('Anteckningar och bilagor').getByRole('listitem')).toContainText(csvFileName);
  //await expect(page.locator("//article[@aria-label='Anteckningar och bilagor']//span[@title='"+csvFileName+"']")).toContainText(csvFileName);
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='TUPP Ärendenummer']//..//..//..//lightning-formatted-text").click();
  await page.locator("//flexipage-component2[@slot='sidebar']//article[@aria-label='Nyttjare']//a[contains(normalize-space(.),'Nyttjare(')]").click();
  const AllUtilizersOrgNumbers = (LocalTestData.get("AllUtilizersOrgNumbers")).split(";");
  for (let iteration = 0; iteration < AllUtilizersOrgNumbers.length; iteration++) {
    await page.locator("//table[@aria-label='Nyttjare']//span[text()='" + AllUtilizersOrgNumbers[iteration] + "']").click();
  }
  const ContractID = await utilityFunctionLocal.RunSOQLQuery("select id from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
  await page.goto(secretsData.get("environmentURL") + "/lightning/r/Contract/" + ContractID + "/view");



  //Spte 11 - Perform Skapa avtalsdokument
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
