const { test } = require('@playwright/test');
const { UtilityFunctions } = require('../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC001_MCSales_RegressionTest';



test('TC001_MCSales_RegressionTest_SOHO', async function ({ browser }) {

  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  var orgNumbers = "5599987012;5599988010;5599989018;5599980074;5599988077;5599916797;5599982948;5599935102;5599936100;5599938106;5565198420;5599941126;5599967121;5599971123";
  var orgNumber = orgNumbers.split(";");

  for(let i = 0; i < orgNumber.length; i++){
    console.log(orgNumber[i]);
    const accountID = await utilityFunctionLocal.RunSOQLQuery("select id from account where Org_Nr__c= '" + orgNumber[i] + "'");
    const AccountName = "DoNotUse_PlaywrightTestAccount " + Math.floor(Math.random() * 90000 + 10000);
    console.log(AccountName);
    var updatedData = {
      Name: AccountName
    };
    await utilityFunctionLocal.RunUpdateDML("Account", accountID, updatedData);
  }


});
