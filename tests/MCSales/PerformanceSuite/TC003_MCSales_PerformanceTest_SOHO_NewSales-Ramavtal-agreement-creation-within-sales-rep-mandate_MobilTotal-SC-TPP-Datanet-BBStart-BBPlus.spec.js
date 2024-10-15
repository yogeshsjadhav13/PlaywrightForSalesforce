const { test } = require('@playwright/test');
const { POManager } = require('../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC003_MCSales_PerformanceTest';


test('TC003_MCSales_PerformanceTest_SOHO_NewSales-Ramavtal-agreement-creation-within-sales-rep-mandate_MobilTotal-SC-TPP-Datanet-BBStart-BBPlus', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();
  var timestamp1, timestamp2, timedifference;



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
  const today = new Date();
  await utilityFunctionLocal.WriteDataToExcel("TestDate", today.toLocaleDateString());
  await utilityFunctionLocal.WriteDataToExcel("TestTimeStamp", today.toLocaleTimeString());



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



  //Step 5 - Perform prisforhandling and verify performance
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await opportunityPage.performPrisforhandling(LocalTestData);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("PrisforhandlingTime", timedifference);



  //Step 6 - Add Mobil Product to the cart and verify performance
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  const cartFrame = faCartPage.cartFrame;
  const ProductName = "Mobilupplägg TOTAL";
  await faCartPage.AddSingleProductToTheCart(ProductName);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("MobilProductAdditionTime", timedifference);


  //Step 7 - Add Mobil sub offers to the cart and verify performance
  await cartFrame.locator("//span[@class='cpq-product-name' and text()='" + ProductName + "']").click();
  const klusters = ["Kluster SMALL", "Kluster MEDIUM", "Kluster LARGE", "Kluster XTRA-LARGE"];
  for (const kluster of klusters) {
    await faCartPage.toggleSubOffersInProduct(ProductName, kluster);
  }
  var subProductName = ["Jobbmobil 3 GB", "Jobbmobil 30 GB", "Jobbmobil 80 GB"];
  for (let i = 0; i < subProductName.length; i++) {
    timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
    await cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and text()='" + subProductName[i] + "']").click();
    await cartFrame.locator("//span[normalize-space(.)='" + ProductName + "']//ancestor::div[@class='cpq-product-cart-item']//div[@class='cpq-item-no-children' and text()='" + subProductName[i] + "']//ancestor::div[@class='cpq-item-base-product']//button[contains(text(),'Lägg till')]").click();
    await cartFrame.locator("//h2[contains(text(),'Tillagd tjänst: " + subProductName[i] + "')]").click();
    timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
    timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
    let offerNameWithoutSpace = subProductName[i].replace(/\s/g, "");
    await utilityFunctionLocal.WriteDataToExcel(offerNameWithoutSpace + "OfferAdditionTime", timedifference);
  }


  //Step 8 - Configure Mobil Product to the cart and verify performance
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await faCartPage.PerformProductConfiguration(LocalTestData, ProductName);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("MobilProductAttributeConfigurationTime", timedifference);


  //Step 9 - Delete Mobil Product in the cart and verify performance 
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await faCartPage.DeleteSingleProductToTheCart(ProductName);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("MobilProductDeletionTime", timedifference);



  //Step 10 - Add products in the cart and verify performance  
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await faCartPage.AddProductToTheCart(LocalTestData);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("AllProductsAdditionTime", timedifference);



  //Step 11 - Configure products in the cart and verify performance 
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await faCartPage.ConfigureMCSalesProductInTheCart(LocalTestData);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("ProductConfigurationTime", timedifference);



  //Step 12 - Perform validera priser, verify approval flags based on sales mandates, perform slutfor konfiguration and verify performance  
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await faCartPage.PerformValideraPriserAndVerifyApprovalFlags(LocalTestData);
  await faCartPage.searchbutton.click();
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("ValideraPriserAndFlagVerificationTime", timedifference);
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await faCartPage.PerformSlutforKonfigurationAndQuoteApproval(LocalTestData, OpportunityName);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("PerformSlutforKonfigurationAndQuoteApprovalSubmissionTime", timedifference);


  
  // Step 13 - Perform skapa offertdokument and verify performance 
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await quotePage.performSkapaOffertdokumentOnMCSalesQuote(LocalTestData, OpportunityName);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("SkapaOffertdokumentTime", timedifference);



  // Step 14 - Perform Skapa avtal on FA quote and verify performance  
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("SkapaAvtalTime", timedifference);



  // Step 15 - Perform Skapa avtalsdokument and verify performance 
  timestamp1 = await utilityFunctionLocal.getCurrentTimestamp();
   await contractPage.performMCSalesSkapaAvtalsdokument(LocalTestData);
  timestamp2 = await utilityFunctionLocal.getCurrentTimestamp();
  timedifference = await utilityFunctionLocal.getTimestampDifferenceInSeconds(timestamp1, timestamp2);
  await utilityFunctionLocal.WriteDataToExcel("SkapaAvtalsdokumentTime", timedifference);



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


