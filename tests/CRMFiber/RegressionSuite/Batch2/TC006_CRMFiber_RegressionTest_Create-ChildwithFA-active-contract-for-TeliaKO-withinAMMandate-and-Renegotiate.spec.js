const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC006_CRMFiber_RegressionTest';



test('TC006_CRMFiber_RegressionTest_Create-ChildwithFA-active-contract-for-TeliaKO-withinAMMandate-with-TeliaMDUSDUKundagtNat-XLAN-document-and-Renegotiate', async function ({ browser }) {



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
  LocalTestData.set("QuoteRecordType", "Offert - Skapa ett nytt Ramavtal");
  LocalTestData.set("QuoteRecordTypeName", "Offert - Ramavtal");



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
  console.log(OpportunityName + "   ----   " + OpportunityID);



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
  if (LocalTestData.get("WithinUserMandate") === "WithinSalesManagerMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "C&SB");
    await quotePageSalesManager.performCRMFiberQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityID);
    await contextSalesManager.close();
  } else if (LocalTestData.get("WithinUserMandate") === "WithinSalesDirectorMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "C&SB");
    await quotePageSalesManager.performCRMFiberQuoteApprovalAndPeerAssignment(utilityFunctionLocal, LocalTestData, OpportunityID, LocalTestData.get("SalesDirectorUser"));
    await contextSalesManager.close();
    const contextSalesDirector = await browser.newContext();
    const pageSalesDirector = await contextSalesDirector.newPage();
    const poManagerSalesDirector = new POManager(pageSalesDirector);
    const loginPageSalesDirector = poManagerSalesDirector.getLoginPage();
    const quotePageSalesDirector = poManagerSalesDirector.getQuotePage();
    await loginPageSalesDirector.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesDirector.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesDirectorUser"), "C&SB");
    await quotePageSalesDirector.performCRMFiberQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityID);
    await contextSalesDirector.close();
  }



  // Step 8 - Perform skapa offertdokument
  await quotePage.performSkapaOffertdokumentOnCRMFiberQuote(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);



  // Step 9 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnCRMFiberQuote(OpportunityName);
  await contractPage.performCRMFiberSkapaAvtalsdokument(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);




  //Step 10 - Send the contrct for signing and sign the contract
  await contractPage.performCRMFiberContractSigning(utilityFunctionLocal, OpportunityName);



  //Step 11 - Perform contract activation
  const contextAdmin = await browser.newContext();
  const pageAdmin = await contextAdmin.newPage();



  //Step 11a - Login into Salesforce as admin
  await utilityFunctionLocal.executeApexCode(pageAdmin, `Fiber_Automatic_Extension_Contracts  p= New Fiber_Automatic_Extension_Contracts (); database.executeBatch(p,50);`)
  await page.waitForTimeout(20000);



  //Step 12 - Verify contract status as Active
  await contractPage.performCRMFiberContractActivation(utilityFunctionLocal, OpportunityName);


  var LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  var FAOpportunityName = OpportunityName;
  var FAOpportunityID = OpportunityID;


  //Step 4 - Create standard process Opportunity, add contact and Product on Opportunity
  Opportunity = await opportunityPage.createCRMFiberOpportunity(LocalTestData, utilityFunctionLocal);
  OpportunityName = Opportunity[0];
  OpportunityID = Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);



  //Step 5 - Perform offer creation
  await opportunityPage.offertCreation(LocalTestData, FAOpportunityName);
  if (LocalTestData.get("WithinUserMandate") === "WithinSalesDirectorMandate") {
    await faCartPage.BlakalkylGaTillbaka.click();
    await quotePage.EnterBlakalkylOnQuote();
    await opportunityPage.CRMFiberQuoteVarukorgButton.click();
  }



  //Step 6 and 7 - Add Products to the cart and configure withing sales rep mandate, approve the quote
  await faCartPage.AddProductToTheCart(LocalTestData);
  await faCartPage.ConfigureCRMFiberProductInTheCart(LocalTestData);
  await faCartPage.enterBlakalkylDetails(LocalTestData, OpportunityName);
  await faCartPage.PerformGaVidareAndQuoteApproval(LocalTestData);
  if (LocalTestData.get("WithinUserMandate") === "WithinSalesManagerMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "C&SB");
    await quotePageSalesManager.performCRMFiberQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityID);
    await contextSalesManager.close();
  } else if (LocalTestData.get("WithinUserMandate") === "WithinSalesDirectorMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "C&SB");
    await quotePageSalesManager.performCRMFiberQuoteApprovalAndPeerAssignment(utilityFunctionLocal, LocalTestData, OpportunityID, LocalTestData.get("SalesDirectorUser"));
    await contextSalesManager.close();
    const contextSalesDirector = await browser.newContext();
    const pageSalesDirector = await contextSalesDirector.newPage();
    const poManagerSalesDirector = new POManager(pageSalesDirector);
    const loginPageSalesDirector = poManagerSalesDirector.getLoginPage();
    const quotePageSalesDirector = poManagerSalesDirector.getQuotePage();
    await loginPageSalesDirector.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesDirector.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesDirectorUser"), "C&SB");
    await quotePageSalesDirector.performCRMFiberQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityID);
    await contextSalesDirector.close();
  }



  // Step 8 - Perform skapa offertdokument
  await quotePage.performSkapaOffertdokumentOnCRMFiberQuote(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);



  // Step 9 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnCRMFiberQuote(OpportunityName);
  await contractPage.performCRMFiberSkapaAvtalsdokument(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);



  //Step 10 - Send the contrct for signing and sign the contract
  await contractPage.performCRMFiberContractSigning(utilityFunctionLocal, OpportunityName);



  //Step 11a - Login into Salesforce as admin
  await utilityFunctionLocal.executeApexCode(pageAdmin, `Fiber_Automatic_Extension_Contracts  p= New Fiber_Automatic_Extension_Contracts (); database.executeBatch(p,50);`)
  await page.waitForTimeout(20000);



  //Step 12 - Verify contract status as Active
  await contractPage.performCRMFiberContractActivation(utilityFunctionLocal, OpportunityName);



  var ActiveOpportunityName = OpportunityName;
  var ActiveOpportunityID = OpportunityID;
  LocalTestData.set("DiscountPercentage", 0.90);
  LocalTestData.set("SalesFlowType", "Renegotiation");
  LocalTestData.set("FAOpportunityName", FAOpportunityName);


  //Step 4 - Create standard process Opportunity, add contact and Product on Opportunity
  Opportunity = await opportunityPage.createCRMFiberOpportunity(LocalTestData, utilityFunctionLocal);
  OpportunityName = Opportunity[0];
  OpportunityID = Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);



  //Step 5 - Perform offer creation
  await opportunityPage.offertCreation(LocalTestData, ActiveOpportunityName);
  if (LocalTestData.get("WithinUserMandate") === "WithinSalesDirectorMandate") {
    await faCartPage.BlakalkylGaTillbaka.click();
    await quotePage.EnterBlakalkylOnQuote();
    await opportunityPage.CRMFiberQuoteVarukorgButton.click();
  }



  //Step 6 and 7 - Add Products to the cart and configure withing sales rep mandate, approve the quote
  await faCartPage.ConfigureCRMFiberProductInTheCart(LocalTestData);
  await faCartPage.enterBlakalkylDetails(LocalTestData, OpportunityName);
  await faCartPage.PerformGaVidareAndQuoteApproval(LocalTestData);
  if (LocalTestData.get("WithinUserMandate") === "WithinSalesManagerMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "C&SB");
    await quotePageSalesManager.performCRMFiberQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityID);
    await contextSalesManager.close();
  } else if (LocalTestData.get("WithinUserMandate") === "WithinSalesDirectorMandate") {
    const contextSalesManager = await browser.newContext();
    const pageSalesManager = await contextSalesManager.newPage();
    const poManagerSalesManager = new POManager(pageSalesManager);
    const loginPageSalesManager = poManagerSalesManager.getLoginPage();
    const quotePageSalesManager = poManagerSalesManager.getQuotePage();
    await loginPageSalesManager.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesManager.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesManagerUser"), "C&SB");
    await quotePageSalesManager.performCRMFiberQuoteApprovalAndPeerAssignment(utilityFunctionLocal, LocalTestData, OpportunityID, LocalTestData.get("SalesDirectorUser"));
    await contextSalesManager.close();
    const contextSalesDirector = await browser.newContext();
    const pageSalesDirector = await contextSalesDirector.newPage();
    const poManagerSalesDirector = new POManager(pageSalesDirector);
    const loginPageSalesDirector = poManagerSalesDirector.getLoginPage();
    const quotePageSalesDirector = poManagerSalesDirector.getQuotePage();
    await loginPageSalesDirector.adminUserLogin(utilityFunctionLocal);
    await loginPageSalesDirector.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesDirectorUser"), "C&SB");
    await quotePageSalesDirector.performCRMFiberQuoteApproval(utilityFunctionLocal, LocalTestData, OpportunityID);
    await contextSalesDirector.close();
  }



  // Step 8 - Perform skapa offertdokument
  await quotePage.performSkapaOffertdokumentOnCRMFiberQuote(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);



  // Step 9 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnCRMFiberQuote(OpportunityName);
  await contractPage.performCRMFiberSkapaAvtalsdokument(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);



  //Step 10 - Send the contrct for signing and sign the contract
  await contractPage.performCRMFiberContractSigning(utilityFunctionLocal, OpportunityName);



  //Step 11a - Login into Salesforce as admin
  await utilityFunctionLocal.executeApexCode(pageAdmin, `Fiber_Automatic_Extension_Contracts  p= New Fiber_Automatic_Extension_Contracts (); database.executeBatch(p,50);`)
  await page.waitForTimeout(20000);



  //Step 12 - Verify contract status as Active
  await contractPage.performCRMFiberContractActivation(utilityFunctionLocal, OpportunityName);



  //Close all browserss
  await context.close();

});


