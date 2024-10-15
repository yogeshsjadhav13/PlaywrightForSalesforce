const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC021_CRMFiber_RegressionTest';



test('TC021_CRMFiber_RegressionTest_Create-Customer-contact-record', async function ({ browser }) {


  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();



  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const ContactPage = poManager.getContactPage();



  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();


  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);



  //Step 2 - Login as SOHO Ds Sales rep
  await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "C&SB");


  //Step 3 - Cleanup the contact records
  for (let iteration = 0; iteration <= 10; iteration++) {
    const AccountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where Org_Nr__c= '" + LocalTestData.get("OrgNumber") + "'");
    const contactIDs = await utilityFunctionLocal.RunSOQLQuery("select id from contact where  Name like '%ContactFirstName%' and AccountId = '" + AccountID + "'");
    let contactIsNotNullOrEmpty = Boolean(contactIDs);
    if (contactIsNotNullOrEmpty) {
      await utilityFunctionLocal.deleteRecordFromOrg("Contact", contactIDs);
    }
    if (!contactIsNotNullOrEmpty) {
      break;
    }
  }


  //Step 4 - Create contact record using Fiber user
  await ContactPage.createCustomerContactAndEdit(LocalTestData, utilityFunctionLocal);


  //Close all browserss
  await context.close();



});