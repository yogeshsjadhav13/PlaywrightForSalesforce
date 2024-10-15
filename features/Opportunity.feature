Feature: Opportunity tests

  Scenario: Create opportunity
    Given a login to salesforce application for "TC001_Salesforce_RegressionTest"
    When you create opportunity record
    Then opportunity record should get created