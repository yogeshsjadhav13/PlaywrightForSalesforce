const { Given, When, Then } = require('@cucumber/cucumber')
const { test, expect } = require('@playwright/test');
const { UtilityFunctions } = require('../../main/utilities/UtilityFunctions');

Given('a login to salesforce application for {string}', { timeout: 100 * 1000 }, async function (TestCaseName) {
  //Test data setup - Read test case Data
  this.utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  this.LocalTestData = await this.utilityFunctionLocal.ReadDataFromExcel();

  //Step 1 - Login into Salesforce as admin
  await this.loginPage.adminUserLogin(this.utilityFunctionLocal);
});


When('you create opportunity record', { timeout: 100 * 1000 }, async function () {
  //Step 2 - Creation salesforce opporunity
  this.Opportunity = await this.opportunityPage.salesforceOpportunityCreation(this.LocalTestData, this.utilityFunctionLocal);
});


Then('opportunity record should get created', { timeout: 100 * 1000 }, async function () {
  //Step 3 - Print the opportunity details
  const OpportunityName = this.Opportunity[0];
  const OpportunityID = this.Opportunity[1];
  console.log(OpportunityName + "   ----   " + OpportunityID);
});


Given('a login to salesforce application via salesforce API for {string}', { timeout: 100 * 1000 }, async function (TestCaseName) {

    //Test data setup - Read test case Data
    this.utilityFunctionLocal = new UtilityFunctions(TestCaseName);
    this.LocalTestData = await this.utilityFunctionLocal.ReadDataFromExcel();
    this.secretsData = await this.utilityFunctionLocal.fetchEnvironmentCreds();
    this.username = this.secretsData.get("username");
    this.password = this.secretsData.get("password");
    this.clientId = this.secretsData.get("clientId");
    this.clientSecret = this.secretsData.get("clientSecret");
    this.securityToken = this.secretsData.get("securityToken");
    this.URL = this.secretsData.get("environmentURL") + "/services/oauth2/token";
  
    //Salesforce connection api
    this.response = await this.requestContext.post(this.URL, 
      {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      params: {grant_type : "password", client_id : this.clientId, client_secret : this.clientSecret, username: this.username, password: this.password+this.securityToken}
    });
    this.data = await this.response.json();
    this.environmentURL = this.data.instance_url;
    this.environmentAccessToken = this.data.access_token;

});


When('you query account record ID', { timeout: 100 * 1000 }, async function () {
    //Salesforce query api
    this.query = "select Id from account where name = 'Test Account'";
    this.queryUrl = this.environmentURL + `/services/data/v51.0/query?q=${encodeURIComponent(this.query)}`;
    this.queryResponse = await this.requestContext.fetch(this.queryUrl, 
      {
      headers: {Authorization: `Bearer ${this.environmentAccessToken}`}
    });
    this.data = await this.queryResponse.json();
    this.accountId = this.data.records[0].Id;
});


When('create opportunity via salesforce API', { timeout: 100 * 1000 }, async function () {
  this.queryOpp = "select id from RecordType where SobjectType = 'Opportunity'";
  this.queryUrlOpp = this.environmentURL + `/services/data/v51.0/query?q=${encodeURIComponent(this.queryOpp)}`;
  this.queryResponseOpp = await this.requestContext.fetch(this.queryUrlOpp, 
    {
    headers: {Authorization: `Bearer ${this.environmentAccessToken}`}
  });
  this.data = await this.queryResponseOpp.json();
  this.OppRecordTypeId = this.data.records[0].Id;
  this.url = this.environmentURL + '/services/data/v52.0/sobjects/Opportunity/';
  this.accountData = {
      AccountId: this.accountId,
      CloseDate: '2024-11-06',
      Name: this.LocalTestData.get("OpportunityName"),
      RecordTypeId: this.OppRecordTypeId,
      StageName: 'Qualification'
  };
  this.requestContextPart = {
      headers: {
          'Authorization': `Bearer ${this.environmentAccessToken}`,
          'Content-Type': 'application/json'
      },
      data: JSON.stringify(this.accountData)
  };
  this.response = await this.requestContext.post(this.url, this.requestContextPart);
  this.result = await this.response.json();
  this.opportunityID = this.result.id;
  console.log(this.opportunityID);
  this.Opportunity = ["",""];
  this.Opportunity[0] = this.opportunityID;
  this.Opportunity[1] = this.LocalTestData.get("OpportunityName");
});


Then('cleanup the opportunity record via salesforce API', { timeout: 100 * 1000 }, async function () {
  this.apiUrl = this.environmentURL + `/services/data/v50.0/sobjects/Opportunity/`+this.opportunityID;
  await this.requestContext.delete(this.apiUrl, {
      headers: {
          Authorization: `Bearer ${this.environmentAccessToken}`
      }
  });
});