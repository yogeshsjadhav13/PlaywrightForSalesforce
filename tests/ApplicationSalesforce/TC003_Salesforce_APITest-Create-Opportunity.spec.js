const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../../main/utilities/POManager');
const { UtilityFunctions } = require('../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC001_Salesforce_RegressionTest';


test('TC003_Salesforce_SalesforceAPITest-Create-Opportunity', async function ({request }) {

  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
  const username = secretsData.get("username");
  const password = secretsData.get("password");
  const clientId = secretsData.get("clientId");
  const clientSecret = secretsData.get("clientSecret");
  const securityToken = secretsData.get("securityToken");
  const URL = secretsData.get("environmentURL") + "/services/oauth2/token";



  //Salesforce connection api
  var response = await request.post(URL, 
    {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    params: {grant_type : "password", client_id : clientId, client_secret : clientSecret, username: username, password: password+securityToken}
  });
  var data = await response.json();
  var environmentURL = data.instance_url;
  var environmentAccessToken = data.access_token;
  
  
  //Salesforce query api
  const query = "select Id from account where name = 'Test Account'";
  const queryUrl = environmentURL + `/services/data/v51.0/query?q=${encodeURIComponent(query)}`;
  const queryResponse = await request.fetch(queryUrl, 
    {
    headers: {Authorization: `Bearer ${environmentAccessToken}`}
  });
  data = await queryResponse.json();
  const accountId = data.records[0].Id;


  const url = environmentURL + '/services/data/v52.0/sobjects/Opportunity/';
  const accountData = {
      AccountId: accountId,
      CloseDate: '2024-11-06',
      Name: 'Playwright Opportunity 12345',
      RecordTypeId: '012dL000000rJNtQAM',
      StageName: 'Qualification'
  };
  const requestPart = {
      headers: {
          'Authorization': `Bearer ${environmentAccessToken}`,
          'Content-Type': 'application/json'
      },
      data: JSON.stringify(accountData)
  };
  response = await request.post(url, requestPart);
  const result = await response.json();
  const opportunityID = result.id;
  console.log(opportunityID);


  const apiUrl = environmentURL + `/services/data/v50.0/sobjects/Opportunity/`+opportunityID;
  await request.delete(apiUrl, {
      headers: {
          Authorization: `Bearer ${environmentAccessToken}`
      }
  });

});


