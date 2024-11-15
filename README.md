# PlaywrightForSalesforce

## Pre-requisites

1. Visual Studio installed
2. Node.js installed
3. Access to Github.com
4. Salesforce credentials (Username and Password) and Connected App created in Salesforce (clientid, clientsecret)
5. Generate security token in Salesforce by using below URL. Just replace your org URL in place of `https://xxxx-dev-ed.develop.my.salesforce.com`
for e.g. 
```sh
https://xxxx-dev-ed.develop.my.salesforce.com/_ui/system/security/ResetApiTokenEdit?retURL=%2Fui%2Fsetup%2FSetup%3Fsetupid%3DPersonalInfo&setupid=ResetApiToken
```

## Configuration Steps for Playwright and Test Automation Repository

1. In Visual Studio, open a new window, navigate to the Source Control section, and clone the repository:
    ```sh
    https://github.com/yogeshsjadhav13/PlaywrightForSalesforce.git
    ```
2. Once the repository is cloned, open the terminal, select PowerShell, and run the following command to install all the required dependencies:
    ```sh
    npm install
    ```
3. Once the dependencies are installed, run the following command to install the required browsers for Playwright:
    ```sh
    npx playwright install --with-deps
    ```
4. To set up credentials in your local environment for Playwright tests to use:
    1. Create a `resources-credentials` folder.
    2. Add `environmentParameters.json` and `credentialsUATEnvironment.json` files.
    3. In `environmentParameters.json`, add the following content (e.g. UATEnvironment):
        ```json
        {
            "environment": "UATEnvironment"
        }
        ```
    4. In `credentialsUATEnvironment.json`, provide the following parameters:
        ```json
        {
            "username": "XXXXXXXX",
            "password": "XXXXXXXX",
            "clientId": "XXXXXXXX",
            "clientSecret": "XXXXXXXX",
            "securityToken": "XXXXXXXX",
            "environmentURL": "https://XXXXXXXXX--dev-ed.develop.my.salesforce.com",
            "JIRABaseURL": "https://jira.atlassian.XXX.net",
            "JIRAusername": "XXXXXXXX",
            "JIRApassword": "XXXXXXXX",
            "eCommerceUsername" : "XXXXXXXX",
            "eCommercePassword" : "XXXXXXXX"
        }
        ```
5. Run the test with the following command, replacing `TESTNAME` with the name of the test you want to run:
    ```sh
    npx playwright test TESTNAME.spec.js
    ```
