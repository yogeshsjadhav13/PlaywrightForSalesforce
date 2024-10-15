const { test } = require('@playwright/test');
const { POManager } = require('../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC001_MCSales_TERESTestData';



test('AMANDA_MCSales_Ramavtal_Contract_Creation_as_TestData', async function ({ browser }) {

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
  await utilityFunctionLocal.SetTERESProductsAndSubProducts(LocalTestData);


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
  LocalTestData.set("OpportunityName", OpportunityName);
  LocalTestData.set("OpportunityID", OpportunityID);
  console.log(OpportunityName + "   ----   " + OpportunityID);

  //Step 5 - Perform prisforhandling
  await opportunityPage.performPrisforhandling(LocalTestData);


  //Step 6 - Add Products to the cart and configure withing sales rep mandate
  await faCartPage.AddProductToTheCart(LocalTestData);
  await faCartPage.ConfigureMCSalesProductInTheCart(LocalTestData);


  //Step 7 - Perform validera priser, verify approval flags based on sales mandates and perform slutfor konfiguration
  await faCartPage.PerformValideraPriserAndVerifyApprovalFlags(LocalTestData);
  await faCartPage.PerformSlutforKonfigurationAndQuoteApproval(LocalTestData, OpportunityName);


  // Step 10 - Perform Skapa avtal on FA quote and approve the contract
  await quotePage.performSkapaAvtalOnMCSalesQuote(LocalTestData, utilityFunctionLocal);
  await contractPage.performMCSalesSkapaAvtalsdokument(LocalTestData);
  await contractPage.performMCSalesContractApproval(LocalTestData);


  //Step 11 - Sign the contract manually
  await contractPage.performMCSalesContractSendForSigning(LocalTestData);
  await contractPage.performMCSalesContractManualSigning(utilityFunctionLocal);


  var accountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where Org_Nr__c= \'" + LocalTestData.get("OrgNumber") + "\'");
  var contractID = await utilityFunctionLocal.RunSOQLQuery("select Id from Contract where AccountId =\'" + accountID + "\' and Status != \'Cancelled\' and Contract_Record_Type__c = \'Ramavtal\'");
  var ContractNumber = await utilityFunctionLocal.RunSOQLQuery("select ContractNumber from Contract where Id = '" + contractID + "'");
  var MADAMAgreementNumber = await utilityFunctionLocal.RunSOQLQuery("select Agreement_Nr__c from Contract where Id = '" + contractID + "'");
  var TUPPCaseID = await utilityFunctionLocal.RunSOQLQuery("select TeliaSE_Case_Id__c from Contract where Id = '" + contractID + "'");
  console.log("---------------------- REPORT START --------------------------")
  console.log("Salesforce Opportunity name is --- " + OpportunityName);
  console.log("Salesforce contract number is --- " + ContractNumber);
  console.log("MADAM agreement number is --- " + MADAMAgreementNumber);
  console.log("TUPP case ID is --- " + TUPPCaseID);
  console.log("---------------------- REPORT END --------------------------") 



  //Close all browserss
  await context.close();


});

