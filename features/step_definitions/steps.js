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