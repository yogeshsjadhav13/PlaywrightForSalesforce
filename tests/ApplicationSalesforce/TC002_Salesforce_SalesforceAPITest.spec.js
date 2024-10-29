const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../../main/utilities/POManager');
const { UtilityFunctions } = require('../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC001_Salesforce_RegressionTest';


test('TC001_Salesforce_Create-Opportunity.spec.js', async function ({ browser, request }) {

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
  const response = await request.post(URL, 
    {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    params: {grant_type : "password", client_id : clientId, client_secret : clientSecret, username: username, password: password+securityToken}
  });
  var data = await response.json();

  
  
  //Salesforce query api
  const query = "select Id, Name from opportunity limit 10";
  const queryUrl = data.instance_url + `/services/data/v51.0/query?q=${encodeURIComponent(query)}`;
  const queryResponse = await request.fetch(queryUrl, 
    {
    headers: {Authorization: `Bearer ${data.access_token}`}
  });
  data = await queryResponse.json();
  console.log(data.records[0].Id);
  console.log(data.records[0].Name);



  //Close all browserss
  await context.close();

});


