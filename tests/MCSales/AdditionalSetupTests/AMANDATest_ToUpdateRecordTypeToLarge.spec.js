const { test } = require('@playwright/test');
const { UtilityFunctions } = require('../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC001_MCSales_RegressionTest';



test('TC001_MCSales_RegressionTest_SOHO', async function ({ browser }) {

  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  var orgNumbers = "5599921987";
  var orgNumber = orgNumbers.split(";");
  var recordTypeId = await utilityFunctionLocal.RunSOQLQuery("Select id from RecordType where Name = 'Large Organisation'");

  for(let i = 0; i < orgNumber.length; i++){
    console.log(orgNumber[i]);
    const accountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where Org_Nr__c= '" + orgNumber[i] + "'");
    var updatedData = {
      Business_Unit_Code__c: "221",
      RecordTypeId: recordTypeId
    };
    await utilityFunctionLocal.RunUpdateDML("Account", accountID, updatedData);
  }


});
