const { test } = require('@playwright/test');
const { POManager } = require('../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../main/utilities/UtilityFunctions');
const { expect } = require('@playwright/test');
const TestCaseName = 'TC001_SalesEnabler_SanityTest';


test('TC001_SalesEnabler_SanityTest_Verify-creation-editing-and-closure-of-Forenklad-process-opp-for-SME', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const opportunityPage = poManager.getOpportunityPage();
  const contractPage = poManager.getContractPage();


  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();


  //Step 1 - Login as Salesforce admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Försäljning");


  // Step 3 - Test data cleanup for contract
  await contractPage.testDataCleanupSalesEnablerOpportunity(LocalTestData, utilityFunctionLocal);


  //Step 4 - Create standard process Opportunity, add contact and Product on Opportunity
  const Opportunity = await opportunityPage.createProfileRecordTypeBasedOpportunity(LocalTestData, utilityFunctionLocal);
  const OpportunityName = Opportunity[0];
  const OpportunityID = Opportunity[1];
  console.log(OpportunityName +"   ----   "+OpportunityID);


  //Step 5 - Perform revenue change calculation
  await opportunityPage.IntaktseffektkalkylCreation();


  //Step 6 - Close the opportunity as won and verify error
  await opportunityPage.changeOpportunityStatusAndVerifyError("Vunnen", "För att vara i fas Vunnen måste du lägga till några produkter");


  //Step 7 - Add product 1 on opportunity and verify sales value
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName1"), LocalTestData.get("Engangsavgift1"), LocalTestData.get("Manadsavgift1"), LocalTestData.get("TypAvForsaljning1"), LocalTestData.get("Avtalstid1"), LocalTestData.get("Antal1"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr","244 kr","0 kr","244 kr","244 kr","0 kr" );


  //Step 8 - Add product 2 on opportunity and verify sales value
  await opportunityPage.addProductOnOpportunity(LocalTestData.get("ProductName2"), LocalTestData.get("Engangsavgift2"), LocalTestData.get("Manadsavgift2"), LocalTestData.get("TypAvForsaljning2"), LocalTestData.get("Avtalstid2"), LocalTestData.get("Antal2"));
  await opportunityPage.verifySalesValuesOnOpportunity("244 kr","244 kr","244 kr","488 kr","244 kr","244 kr" );


  //Step 9 - Close the opportunity as won 
  await opportunityPage.changeOpportunityStatus("Sluta avtal", "Vunnen");
  await opportunityPage.verifyOpportunityClosedDate(LocalTestData, utilityFunctionLocal);

  
  //Step 10 - Close the opportunity as lost and verify error
  await opportunityPage.changeOpportunityStatusAndVerifyError("Förlorad", "Vid förlorad affär, ange en motivering och en kommentar kring varför vi förlorat affären.");


  //Step 11 - Close the opportunity as cancelled
  await opportunityPage.changeOpportunityStatus("Vunnen", "Avbruten");


  //Step 12 - Enter mandatory details for Opportunity to be lost and change the status as lost
  await page.getByRole('button', { name: 'Redigera Fas' }).click();
  await page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Motivering']").first().click();
  await page.getByRole('option', { name: 'Funktionalitet' }).click();
  await page.getByLabel('Varför Vann/Förlorade vi affären').fill('Test Automation Comment');
  await page.getByRole('button', { name: 'Spara' }).click();
  await opportunityPage.changeOpportunityStatus("Avbruten", "Förlorad");  

  
  //Close all browserss
  await context.close();

});


