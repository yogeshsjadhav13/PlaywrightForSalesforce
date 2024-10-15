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
  await opportunityPage.prisforhanldingButton.click();
  if (LocalTestData.get("SalesFlowType") === "UtilizerBreakout") {
      await page.locator("//div[@role='alert']//p[text()='Kunden är nyttjare av ett aktivt Ramavtal, ska kunden brytas ut kan du välja att skapa ett eget Ramavtal, annars klicka på Avbryt.']").click();
      await page.locator("//span[contains(text(),'Skapa ett nytt eget Ramavtal till kunden. Kunden tas bort som nyttjare i gamla avtalet när det nya egna Ramavtalet blir aktivt.')]//preceding-sibling::span[@class='slds-radio_faux']").click();
      await opportunityPage.nextSwedishButton.click();
  }
  await opportunityPage.prisforhandlingHeader.click();
  const Products = (LocalTestData.get("Products")).split(";");
  var ITDaasFlag, ITSupportFlag, ConnectedOfficeFlag;
  for (let iteration = 0; iteration < Products.length; iteration++) {
      if (Products[iteration] === "IT-avdelning" || Products[iteration] === "IT-avdelning Start") {
          ITDaasFlag = "Yes";
      }
      if (Products[iteration] === "IT-support Standard" || Products[iteration] === "IT-support Plus") {
          ITSupportFlag = "Yes";
      }
      if (Products[iteration] === "Bredband Plus" || Products[iteration] === "Bredband Start" || Products[iteration] === "Bredband Pro" ||
          Products[iteration] === "Cloud VPN SD-Wan/Firewall" || Products[iteration] === "Datanet" || Products[iteration] === "Cloud VPN Wifi/Lan") {
          ConnectedOfficeFlag = "Yes";
      }
  }
  if (ITDaasFlag === "Yes") {
      await page.locator("//vlocity_cmt-omniscript-checkbox[not(contains(@class,'hide'))]//div/label[contains(normalize-space(.), 'IT-avdelning')]/span[@class='slds-checkbox_faux']").click();

  }
  if (ITSupportFlag === "Yes") {
      await page.locator("//vlocity_cmt-omniscript-checkbox[not(contains(@class,'hide'))]//div/label[contains(normalize-space(.), 'IT-support')]/span[@class='slds-checkbox_faux']").click();

  }
  if (ConnectedOfficeFlag === "Yes" && (LocalTestData.get("SalesFlowType") === "NewSales" || LocalTestData.get("SalesFlowType") === "LegacyNegotiation" || LocalTestData.get("SalesFlowType") === "UtilizerBreakout")) {
      await page.locator("//vlocity_cmt-omniscript-checkbox[not(contains(@class,'hide'))]//div/label[contains(normalize-space(.), 'Nätverkstjänster (leveranskontroll)')]/span[@class='slds-checkbox_faux']").click();
  } else if (ConnectedOfficeFlag === "Yes" && (LocalTestData.get("SalesFlowType") === "Renegotiation" || LocalTestData.get("SalesFlowType") === "Inforhandling" || LocalTestData.get("SalesFlowType") === "Tillaggsforhandling")) {
      await page.locator("//vlocity_cmt-omniscript-checkbox[(not(contains(@class,'hide'))) and (@data-omni-key='CheckBox_ModifyPrecheck')]//span[@class='slds-checkbox_faux']").click();
  }
  await opportunityPage.nextSwedishButton.click();
  if (ITDaasFlag === "Yes") {
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
      await opportunityPage.nastaButton.click();

  }
  if (ConnectedOfficeFlag === "Yes") {
      await page.locator("//button[text()='RADERA ALLA']").click();
      await page.locator("//button[text()='Ja']").click();
      if (LocalTestData.get("COLeveranskontrollType") === "Excel") {
          await page.getByLabel('BläddraRemove the file').setInputFiles('./resources/TestDataFiles/addresslist.csv');
          await page.getByRole('button', { name: 'Ladda Upp', exact: true }).click();
          await page.getByText('Filen har laddats upp').click();
          await page.getByRole('button', { name: 'VALIDERA ALLA' }).click();
          await page.getByText('Adressvalideringen pågår, var snäll och vänta').click();
          var addressListLength = await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr//select[@name='selectedServicePoint']").count();
          for (let i = 1; i <= addressListLength; i++) {
              await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr[" + i + "]//select[@name='selectedServicePoint']").selectOption({ index: 1 });
          }

      } else if (LocalTestData.get("COLeveranskontrollType") === "Manual") {
          const Address = (LocalTestData.get("COAddresses")).split("|");
          for (let i = 1; i <= Address.length; i++) {
              const AddressDetails = Address[i - 1].split(";");
              await page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='city']").fill(AddressDetails[0]);
              await page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='postalCode']").fill(AddressDetails[1]);
              await page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='streetName']").fill(AddressDetails[2]);
              await page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='streetNumber']").fill(AddressDetails[3]);
              await page.locator("//c-address-validation//table//tbody/tr[" + i + "]//button[text()='Validera']").click();
              await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr[" + i + "]//select[@name='selectedServicePoint']").selectOption({ index: 1 });
              await page.getByRole('button', { name: 'View More' }).click();
          }
          await page.locator("//c-address-validation//table//tbody/tr[" + (Address.length + 1) + "]//td//lightning-icon[contains(@class,'delete')]/span/lightning-primitive-icon").click();
          await page.getByRole('button', { name: 'Ja' }).click();
      }
      await page.locator("//button[text()='LEVERANSKONTROLL ALLA']").click();
      await page.locator('progress').click();
      await page.getByRole('article').locator('div').filter({ hasText: 'siter har bearbetats' }).nth(1).click();
      await page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='Precheck']//div[text()='Totalt antal adresser : " + LocalTestData.get("CONumberOfAddresses") + "']").click();
      await page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='Precheck']//div[text()='Antal adresser utan fel : " + LocalTestData.get("CONumberOfAddresses") + "']").click();
      await page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='Precheck']//div[text()='Antal adresser med fel : 0']").click();
      await page.locator("//button[@title='Updatera tabell']").click();
      await page.waitForTimeout(2000);
      await page.locator("//button[@title='Updatera tabell']").click();
      await page.waitForTimeout(2000);
      await page.locator("//button[@title='Updatera tabell']").click();
      await page.waitForTimeout(2000);
      const COAveragePrices = (LocalTestData.get("COAveragePrices")).split(";");
      await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Average Prices']//parent::tr/td[text()='" + COAveragePrices[0] + "']").click();
      await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Average Prices']//parent::tr/td[text()='" + COAveragePrices[1] + "']").click();
      await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Average Prices']//parent::tr/td[text()='" + COAveragePrices[2] + "']").click();
      await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Average Prices']//parent::tr/td[text()='" + COAveragePrices[3] + "']").click();
      await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Average Prices']//parent::tr/td[text()='" + COAveragePrices[4] + "']").click();
      await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Average Prices']//parent::tr/td[text()='" + COAveragePrices[5] + "']").click();
      for(let i = 1; i <= LocalTestData.get("CONumberOfAddresses"); i++){
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
          await page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
      }
      opportunityPage.nextSwedishButton.click();
  }
  await page.getByRole('heading', { name: 'Godkända/Icke godkända avtal' }).click();
  await page.getByText('Vissa avtal kan omförhandlas').click();
  await page.getByRole('button', { name: 'Nästa' }).click();
  await page.getByRole('heading', { name: 'Välj avtal att omförhandla' }).click();
  await page.getByRole('button', { name: 'Nästa' }).click();
  await page.locator("//*[@data-omni-key='CustomLWCMessage7']//span[normalize-space(.)='']//preceding-sibling::span[contains(@class,'slds-checkbox_faux')]").click();
  await page.getByRole('button', { name: 'Nästa' }).click();
  await page.getByRole('button', { name: 'Nästa' }).click();
  await page.getByRole('button', { name: 'Nästa' }).click();
  await page.getByRole('button', { name: 'Nästa' }).click();



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

