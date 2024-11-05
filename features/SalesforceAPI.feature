Feature: API tests

  Scenario: Create opportunity via API
    Given a login to salesforce application via salesforce API for "TC001_Salesforce_RegressionTest"
    When you query account record ID
    When create opportunity via salesforce API
    Then opportunity record should get created
    Then cleanup the opportunity record via salesforce API