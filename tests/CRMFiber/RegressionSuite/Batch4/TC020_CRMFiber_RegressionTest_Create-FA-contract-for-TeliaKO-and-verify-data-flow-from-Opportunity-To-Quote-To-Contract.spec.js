const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC020_CRMFiber_RegressionTest';



test('TC020_CRMFiber_RegressionTest_Create-FA-contract-for-TeliaKO-withinAMMandate-and-verify-data-flow-from-Opportunity-To-Quote-To-Contract', async function ({ browser }) {


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



  // Step 8 - Perform skapa offertdokument
  await quotePage.verifyCRMFiberOpportunityToQuoteDataFlow(LocalTestData, utilityFunctionLocal);
  await expect(quotePage.QuoteBlakalkylEBITPercentageText).toContainText('33,35 %');
  await expect(quotePage.QuoteBlakalkylRevenuesText).toContainText('544 151,00');
  await expect(quotePage.QuoteBlakalkylOPEXText).toContainText('272 475,00');
  await expect(quotePage.QuoteBlakalkylCapexInfraText).toContainText('83 772,00');
  await expect(quotePage.QuoteBlakalkylKontraktsperiodYText).toContainText('5');
  await expect(quotePage.QuoteBlakalkylUpsellText).toContainText('34 000,00');
  await expect(quotePage.QuoteBlakalkylKollektivaIntakterText).toContainText('21 600');
  await expect(quotePage.QuoteBlakalkylPrisTVexklmomsText).toContainText('24 kr');
  await expect(quotePage.QuoteBlakalkylRevenueB2BText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevSmartBuildingServicesText).toContainText('55 090');
  await expect(quotePage.QuoteBlakalkylRevWiFiiAllmännautrText).toContainText('105 300');
  await expect(quotePage.QuoteBlakalkylRevMobileXsellText).toContainText('21 781');
  await expect(quotePage.QuoteBlakalkylAccespunkterWiFiText).toContainText('5');
  await expect(quotePage.QuoteBlakalkylRevenuecontractarligenText).toContainText('108 830');
  await expect(quotePage.QuoteBlakalkylACKDCFarligenText).toContainText('18 794');
  await expect(quotePage.QuoteBlakalkylAsisACKDCFText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylPrisBBexklmomsAsiscaseText).toContainText('0');
  await expect(quotePage.QuoteBlakalkyl3PlayPrisAsisexklmomsText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylForandringintaktnyttavtalText).toContainText('39 854 886');
  await expect(quotePage.QuoteBlakalkylNathyrapassivportmanText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylKoncernincrcostEBITackText).toContainText('74');
  await expect(quotePage.QuoteBlakalkylDepreciationText).toContainText('90 213,00');
  await expect(quotePage.QuoteBlakalkylKundplaceradutrustningText).toContainText('20 925,00');
  await expect(quotePage.QuoteBlakalkylACKDCFText).toContainText('93 972,00');
  await expect(quotePage.QuoteBlakalkylReturnOfInvestementText).toContainText('38,31 %');
  await expect(quotePage.QuoteBlakalkylPaybackYText).toContainText('3,10');
  await expect(quotePage.QuoteBlakalkylEngangFastighetsagareText).toContainText('0,00');
  await expect(quotePage.QuoteBlakalkylPrisBBexklmomsText).toContainText('0 kr');
  await expect(quotePage.QuoteBlakalkylRevenueB2CText).toContainText('353 160');
  await expect(quotePage.QuoteBlakalkylExternalRevenueINFRAText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevFastighetsITText).toContainText('8 820');
  await expect(quotePage.QuoteBlakalkylRevTeliaSmartHomeText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylByggnadermedFastighetsITText).toContainText('1');
  await expect(quotePage.QuoteBlakalkylPris3PlayexklmomsText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylAsisavtalstidkvarText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevAsiskvarvarandetidText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevAsiskvarvtidarligenText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylAsisACKDCFarligenText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylPrisTVexklmomsAsiscaseText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylNathyraaktivportmanText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylFindersFeehushallText).toContainText('0');
  await quotePage.performSkapaOffertdokumentOnCRMFiberQuote(LocalTestData, LocalTestData.get("Avtalstype"), LocalTestData.get("Accesstyp"), OpportunityName);



  // Step 9 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnCRMFiberQuote(OpportunityName);

  await contractPage.verifyCRMFiberQuoteToContractDataFlow(LocalTestData, utilityFunctionLocal);
  await expect(quotePage.QuoteBlakalkylEBITPercentageText).toContainText('33,35 %');
  await expect(quotePage.QuoteBlakalkylRevenuesText).toContainText('544 151,00');
  await expect(quotePage.QuoteBlakalkylOPEXText).toContainText('272 475,00');
  await expect(quotePage.QuoteBlakalkylCapexInfraText).toContainText('83 772,00');
  await expect(quotePage.QuoteBlakalkylKontraktsperiodYText).toContainText('5');
  await expect(quotePage.QuoteBlakalkylUpsellText).toContainText('34 000,00');
  await expect(quotePage.QuoteBlakalkylKollektivaIntakterText).toContainText('11 121 600');
  await expect(quotePage.QuoteBlakalkylPrisTVexklmomsText).toContainText('24 kr');
  await expect(quotePage.QuoteBlakalkylRevenueB2BText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevSmartBuildingServicesText).toContainText('55 090');
  await expect(quotePage.QuoteBlakalkylRevWiFiiAllmännautrText).toContainText('105 300');
  await expect(quotePage.QuoteBlakalkylRevMobileXsellText).toContainText('21 781');
  await expect(quotePage.QuoteBlakalkylAccespunkterWiFiText).toContainText('5');
  await expect(quotePage.QuoteBlakalkylRevenuecontractarligenText).toContainText('108 830');
  await expect(quotePage.QuoteBlakalkylACKDCFarligenText).toContainText('18 794');
  await expect(quotePage.QuoteBlakalkylAsisACKDCFText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylPrisBBexklmomsAsiscaseText).toContainText('0');
  await expect(quotePage.QuoteBlakalkyl3PlayPrisAsisexklmomsText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylForandringintaktnyttavtalText).toContainText('39 854 886');
  await expect(quotePage.QuoteBlakalkylNathyrapassivportmanText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylKoncernincrcostEBITackText).toContainText('74');
  await expect(quotePage.QuoteBlakalkylDepreciationText).toContainText('90 213,00');
  await expect(quotePage.QuoteBlakalkylKundplaceradutrustningText).toContainText('20 925,00');
  await expect(quotePage.QuoteBlakalkylACKDCFText).toContainText('93 972,00');
  await expect(quotePage.QuoteBlakalkylReturnOfInvestementText).toContainText('38,31 %');
  await expect(quotePage.QuoteBlakalkylPaybackYText).toContainText('3,10');
  await expect(quotePage.QuoteBlakalkylEngangFastighetsagareText).toContainText('0,00');
  await expect(quotePage.QuoteBlakalkylPrisBBexklmomsText).toContainText('0 kr');
  await expect(quotePage.QuoteBlakalkylRevenueB2CText).toContainText('353 160');
  await expect(quotePage.QuoteBlakalkylExternalRevenueINFRAText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevFastighetsITText).toContainText('8 820');
  await expect(quotePage.QuoteBlakalkylRevTeliaSmartHomeText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylByggnadermedFastighetsITText).toContainText('1');
  await expect(quotePage.QuoteBlakalkylPris3PlayexklmomsText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylAsisavtalstidkvarText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevAsiskvarvarandetidText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylRevAsiskvarvtidarligenText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylAsisACKDCFarligenText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylPrisTVexklmomsAsiscaseText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylNathyraaktivportmanText).toContainText('0');
  await expect(quotePage.QuoteBlakalkylFindersFeehushallText).toContainText('0');


  //Close all browserss
  await context.close();



});