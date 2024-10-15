const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC033_MCSales_RegressionTest';


test('TC033_MCSales_RegressionTest_Verify-HW-document', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();


  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();


  // Get today's date
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  let formattedDate = `${year}/${day}/${month}`;
  

  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  //Step 2 - Run query to fetch opportunity id
  var OpportunityID = await utilityFunctionLocal.RunSOQLQuery("select id from opportunity where Account_Org_Nr__c = '" + LocalTestData.get("OrgNumber") + "' and Name = '" + LocalTestData.get("OpportunityName") + "' limit 1");
  await page.goto(secretsData.get("environmentURL") + "/" + OpportunityID);
  if (LocalTestData.get("OrgType") === "SOHO") {
    await page.locator("//span[text()='Details']//ancestor::a").click();
  }

/*
  LTAT-32328 - SFI upgrade issue
  //Step 3 - Download and Verify HW Word document content
  const contractWordLocator = "//a[contains(text(),'Prisförslag') and contains(text(),'docx')]//parent::th//preceding-sibling::td//a[text()='Download']";
  await page.locator(contractWordLocator).click();
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click(contractWordLocator)
  ]);
  filePath = await download.path();
expectedText = `PRISFÖRSLAG

Avser pris för mobiltelefon, med abonnemang



Södermöre Pastorat

Priserna gäller i 30 dagar från och med den ${formattedDate}

När ni köper telefon från Telia erbjuder vi möjligheten till subvention genom att teckna Jobbmobil i 24 eller 36 månader.

Utöver våra förmånliga priser erbjuder vi även: 

Service på distans eller i butik 

Kostnadsfri försäkring i 3 månader

Hjälp med uppstart och konfiguration

Upphämtning i din Telia butik



Prisförslaget visar priser för 24 månaders bindningtid. 





NEDAN FÖLJER PRISFÖRSLAG:



MOBILTELEFON

ORDINARIE PRIS

Jobbmobil 30 GB

Jobbmobil 50 GB

Jobbmobil 120 GB



Förhöjd engångsavgift + månadskostnad på mobiltelefon

Engångs-

avgift

Månads-

kostnad

Engångs-

avgift

Månads-

kostnad

Engångs-

avgift

Månads-

kostnad

Apple iPhone 12 128GB

7756 kr

0 kr

140 kr

0  kr

70 kr

0 kr

120 kr  

Apple iPhone 12 256GB

9590.4 kr

0 kr

320 kr

0  kr

250 kr

0 kr

300 kr  









PRODUKT

ORDINARIE PRIS

Apple AirPodsMax Rymdgrå

5596 kr`;
  await utilityFunctionLocal.VerifyWordDocumentContent(filePath, expectedText);



  //Step 3 - Download and Verify HW PDF document content
  const contractPDFLocator = "//a[contains(text(),'Prisförslag') and contains(text(),'pdf')]//parent::th//preceding-sibling::td//a[text()='Download']";
  await page.locator(contractPDFLocator).click();
  var [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click(contractPDFLocator)
  ]);
  var filePath = await download.path();
var expectedText = `1
PRISFÖRSLAG
Avser pris för mobiltelefon, med abonnemang
Södermöre Pastorat
Priserna gäller i 30 dagar från och med den ${formattedDate}
När ni köper telefon från Telia erbjuder vi möjligheten till 
subvention genom att teckna Jobbmobil i 24 eller 36 månader.
Utöver våra förmånliga priser erbjuder vi även: 
•Service på distans eller i butik 
•Kostnadsfri försäkring i 3 månader
•Hjälp med uppstart och konfiguration
•Upphämtning i din Telia butik
Prisförslaget visar priser för 24 månaders bindningtid. 
NEDAN FÖLJER PRISFÖRSLAG:
MOBILTELEFONORDINARIE PRISJOBBMOBIL 30 GBJOBBMOBIL 50 GBJOBBMOBIL 120 GB
Förhöjd engångsavgift + månadskostnad på mobiltelefon
Engångs-
avgift
Månads-
kostnad
Engångs-
avgift
Månads-
kostnad
Engångs-
avgift
Månads-
kostnad
Apple iPhone 12 128GB
7756 kr
0 kr140 kr0  kr70 kr0 kr120 kr  
Apple iPhone 12 256GB
9590.4 kr
0 kr320 kr0  kr250 kr0 kr300 kr  
PRODUKTORDINARIE PRIS
Apple AirPodsMax Rymdgrå5596 kr `;
  await utilityFunctionLocal.VerifyPDFDocumentContent(filePath, expectedText);
*/

  //Close all browserss
  await context.close();
});



