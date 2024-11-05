const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../../main/utilities/POManager');
const { UtilityFunctions } = require('../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC001_Salesforce_RegressionTest';


test('TC002_Salesforce_SalesforceAPITest', async function ({ browser, request }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const opportunityPage = poManager.getOpportunityPage();


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
  const query = "select Id, Name from opportunity limit 10";
  const queryUrl = environmentURL + `/services/data/v51.0/query?q=${encodeURIComponent(query)}`;
  const queryResponse = await request.fetch(queryUrl, 
    {
    headers: {Authorization: `Bearer ${environmentAccessToken}`}
  });
  data = await queryResponse.json();
  console.log(data.records[0].Id);
  console.log(data.records[0].Name);


  const url = environmentURL + '/services/data/v52.0/sobjects/Account/';
  const accountData = {
      Name: 'Test Account',
      Industry: 'Technology'
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
  console.log(result);


  //Close all browserss
  await context.close();

});


