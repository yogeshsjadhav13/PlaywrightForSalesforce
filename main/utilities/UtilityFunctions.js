//const XLSX = require('xlsx');
const axios = require('axios');
const { expect } = require('@playwright/test');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const mammoth = require('mammoth');
const ExcelJS = require('exceljs');

class UtilityFunctions {



    constructor(TestCaseName) {
        this.TestCaseName = TestCaseName;
    }



    async fetchEnvironmentCreds() {
        var secretsData = new Map();
        if (process.env.ENVIRONMENT) {
            secretsData.set("environment", process.env.ENVIRONMENT);
            secretsData.set("username", process.env.USERNAME);
            secretsData.set("password", process.env.PASSWORD);
            secretsData.set("clientId", process.env.CLIENTID);
            secretsData.set("clientSecret", process.env.CLIENTSECRET);
            secretsData.set("securityToken", process.env.SECURITYTOKEN);
            secretsData.set("environmentURL", process.env.ENVIRONMENTURL);
            secretsData.set("JIRABaseURL", process.env.JIRABaseURL);
            secretsData.set("JIRAusername", process.env.JIRAusername);
            secretsData.set("JIRApassword", process.env.JIRApassword);
            secretsData.set("eCommerceUsername", process.env.eCommerceUsername);
            secretsData.set("eCommercePassword", process.env.eCommercePassword);
        } else {
            try {
                const environmentParameters = require('../../resources-credentials/environmentParameters.json');
                const environment = environmentParameters.environment;
                const credentials = require('../../resources-credentials/credentials' + environment + '.json');
                secretsData.set("environment", environment);
                secretsData.set("username", credentials.username);
                secretsData.set("password", credentials.password);
                secretsData.set("clientId", credentials.clientId);
                secretsData.set("clientSecret", credentials.clientSecret);
                secretsData.set("securityToken", credentials.securityToken);
                secretsData.set("environmentURL", credentials.environmentURL);
                secretsData.set("JIRABaseURL", credentials.JIRABaseURL);
                secretsData.set("JIRAusername", credentials.JIRAusername);
                secretsData.set("JIRApassword", credentials.JIRApassword);
                secretsData.set("eCommerceUsername", credentials.eCommerceUsername);
                secretsData.set("eCommercePassword", credentials.eCommercePassword);
            } catch (error) {
                console.error('Failed to load credentials:', error);
                process.exit(1);
            }
        }
        return secretsData;
    }




    async ReadDataFromExcel() {
        const secretsData = await this.fetchEnvironmentCreds();
        var TestDataPath = "./resources/TestDataSheet_";
        var Sheet;
        switch (secretsData.get("environment")) {
            case "TrainingEnvironment":
                TestDataPath = TestDataPath + "TrainingEnvironment.xlsx";
                break;
            case "UATEnvironment":
                TestDataPath = TestDataPath + "UATEnvironment.xlsx";
                break;
            case "ST1Environment":
                TestDataPath = TestDataPath + "ST1Environment.xlsx";
                break;
            case "ST2Environment":
                TestDataPath = TestDataPath + "ST2Environment.xlsx";
                break;
            case "DEV1Environment":
                TestDataPath = TestDataPath + "DEV1Environment.xlsx";
                break;
            case "DEV2Environment":
                TestDataPath = TestDataPath + "DEV2Environment.xlsx";
                break;
        }
        if (this.TestCaseName === "Global") {
            Sheet = 'Global';
        }
        const testName = this.TestCaseName;
        if (testName.includes('Salesforce')) {
            Sheet = 'Salesforce';
        }
        if (testName.includes('Ecommerce')) {
            Sheet = 'Ecommerce';
        }
        const workbook = new ExcelJS.Workbook();
        try {
            await workbook.xlsx.readFile(TestDataPath);
            const worksheet = workbook.getWorksheet(Sheet);
            const headerRow = worksheet.getRow(1);
            const headers = [];
            headerRow.eachCell({ includeEmpty: true }, (cell) => {
                headers.push(cell.value);
            });
            const testData = new Map();
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                const currentTestCase = row.getCell(1).value; // Assuming test case name is in the first column (column A)
                if (currentTestCase === testName) {
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        testData.set(headers[colNumber - 1], cell.value);
                    });
                }
            });
            return testData;
        } catch (error) {
            console.error('Error reading Excel file:', error);
            throw error;
        }
    }





    async WriteDataToExcel(columnName, dataToWrite) {
        const secretsData = await this.fetchEnvironmentCreds();
        var TestDataPath = "./resources/TestDataSheet_";
        var Sheet;
        switch (secretsData.get("environment")) {
            case "TrainingEnvironment":
                TestDataPath = TestDataPath + "TrainingEnvironment.xlsx";
                break;
            case "UATEnvironment":
                TestDataPath = TestDataPath + "UATEnvironment.xlsx";
                break;
            case "ST1Environment":
                TestDataPath = TestDataPath + "ST1Environment.xlsx";
                break;
            case "ST2Environment":
                TestDataPath = TestDataPath + "ST2Environment.xlsx";
                break;
            case "DEV1Environment":
                TestDataPath = TestDataPath + "DEV1Environment.xlsx";
                break;
            case "DEV2Environment":
                TestDataPath = TestDataPath + "DEV2Environment.xlsx";
                break;
        }
        if (this.TestCaseName === "Global") {
            Sheet = 'Global';
        }
        const testName = this.TestCaseName;
        if (testName.includes('Salesforce')) {
            Sheet = 'Salesforce';
        }
        if (testName.includes('Ecommerce')) {
            Sheet = 'Ecommerce';
        }
        // Example usage
        var testCaseName = this.TestCaseName;
        var columnName = columnName;
        var workbook = new ExcelJS.Workbook();
        // Load an existing workbook or create a new one
        await workbook.xlsx.readFile(TestDataPath);
        // Assuming you have only one sheet; you can modify this based on your needs
        var worksheet = workbook.getWorksheet(Sheet);
        // Find the column index based on the column name
        var columnIndex = worksheet.getRow(1).values.indexOf(columnName);
        // Iterate through rows to find the row index based on the test case name
        let rowIndex = null;
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (row.getCell(1).value === testCaseName) {
                rowIndex = rowNumber;
            }
        });
        if (rowIndex && columnIndex) {
            // Write data to the specified cell
            worksheet.getCell(rowIndex, columnIndex).value = dataToWrite;
            // Save the changes to the workbook
            await workbook.xlsx.writeFile(TestDataPath);
            //console.log(`Data "${dataToWrite}" written to cell ${columnName}`);
        } else {
            console.log(`Test case "${testCaseName}" or column "${columnName}" not found`);
        }

    }




    async RunSOQLQuery(Query) {
        const secretsData = await this.fetchEnvironmentCreds();
        const username = secretsData.get("username");
        const password = secretsData.get("password");
        const clientId = secretsData.get("clientId");
        const clientSecret = secretsData.get("clientSecret");
        const securityToken = secretsData.get("securityToken");
        const URL = secretsData.get("environmentURL") + "/services/oauth2/token";
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}${securityToken}`
        });
        const { access_token, instance_url, } = await response.json();
        const query = Query;
        const queryUrl = `${instance_url}/services/data/v51.0/query?q=${encodeURIComponent(query)}`;
        const queryResponse = await fetch(queryUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const ArrRecords = await queryResponse.json();
        let RecordNotNull = Boolean((ArrRecords.records).length);
        var secondValue = null;
        if (RecordNotNull) {
            const jsonString = JSON.stringify((ArrRecords.records)[0]);
            const jsonObject = JSON.parse(jsonString);
            const valuesArray = Object.values(jsonObject);
            secondValue = valuesArray[1];
        }
        return secondValue;
    }




    async TodaysDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return yyyy + '-' + mm + '-' + dd;
    }



    async getCurrentTimestamp() {
        var timestamp = new Date();
        return timestamp;
    }



    async getTimestampDifferenceInSeconds(timestamp1, timestamp2) {
        // Calculate the difference in milliseconds
        var timeDifference = timestamp2 - timestamp1;
        // Convert the difference to seconds
        var secondsDifference = timeDifference / 1000;
        secondsDifference = Math.round(secondsDifference);
        return secondsDifference;
    }



    async getWeekdayFromSpecifiedDaysFromToday(Days) {
        function addWorkingDays(startDate, daysToAdd) {
            var currentDate = new Date(startDate);
            var addedDays = 0;
            while (addedDays < daysToAdd) {
                currentDate.setDate(currentDate.getDate() + 1);
                if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
                    addedDays++;
                }
            }
            var year = currentDate.getFullYear();
            var month = String(currentDate.getMonth() + 1).padStart(2, '0');
            var day = String(currentDate.getDate()).padStart(2, '0');
            //return year + '-' + month + '-' + day;
            //03/10/2024
            return day + '/' + month + '/' + year;
        }
        var startDate = new Date();
        var daysToAdd = Days;
        var resultDate = addWorkingDays(startDate, daysToAdd);
        return resultDate
    }



    async RunUpdateDML(ObjectAPIName, RecordId, updatedData) {
        const secretsData = await this.fetchEnvironmentCreds();
        const username = secretsData.get("username");
        const password = secretsData.get("password");
        const clientId = secretsData.get("clientId");
        const clientSecret = secretsData.get("clientSecret");
        const securityToken = secretsData.get("securityToken");
        const URL = secretsData.get("environmentURL") + "/services/oauth2/token";
        var response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}${securityToken}`
        });
        const { access_token, instance_url, } = await response.json();
        response = await axios.patch(`${instance_url}/services/data/v51.0/sobjects/${ObjectAPIName}/${RecordId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });
    }



    async deleteRecordFromOrg(object, recordId) {
        const secretsData = await this.fetchEnvironmentCreds();
        const username = secretsData.get("username");
        const password = secretsData.get("password");
        const clientId = secretsData.get("clientId");
        const clientSecret = secretsData.get("clientSecret");
        const securityToken = secretsData.get("securityToken");
        const URL = secretsData.get("environmentURL") + "/services/oauth2/token";
        var response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}${securityToken}`
        });
        const { access_token, instance_url, } = await response.json();

        const apiUrl = `${instance_url}/services/data/v50.0/sobjects/${object}/${recordId}`;
        response = await axios.delete(apiUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        expect(response.status).toBe(204);
    }



    async executeApexCode(adminPage, apexCode) {
        const secretsData = await this.fetchEnvironmentCreds();
        //await adminPage.goto(secretsData.get("environmentURL"));
        await adminPage.goto("https://test.salesforce.com/");
        await adminPage.locator("#username").type(secretsData.get("username"));
        await adminPage.locator("#password").type(secretsData.get("password"));
        await adminPage.locator("#Login").click();
        await adminPage.waitForLoadState('networkidle');
        await adminPage.goto(secretsData.get("environmentURL") + '/_ui/common/apex/debug/ApexCSIPage');
        await adminPage.waitForTimeout(1000);
        await adminPage.getByRole('button', { name: 'Debug' }).click();
        await adminPage.getByRole('link', { name: 'Open Execute Anonymous Window CTRL+E' }).click();
        await adminPage.locator('.CodeMirror-lines').click();
        await adminPage.keyboard.press('Control+A');
        await adminPage.keyboard.press('Delete');
        await adminPage.waitForTimeout(2000);
        await adminPage.locator("//div[@id='ExecAnon']//div[contains(@id, 'panel-') and contains(@id, 'body')]").getByRole('textbox').fill(apexCode);
        await adminPage.getByRole('button', { name: 'Execute', exact: true }).click();
    }



    async UpdateJIRAWithTestResult(TestCaseSummary, TestCaseName, TestCaseStatus) {
        const secretsData = await this.fetchEnvironmentCreds();
        const JIRABaseURL = secretsData.get("JIRABaseURL");
        const JIRAusername = secretsData.get("JIRAusername");
        const JIRApassword = secretsData.get("JIRApassword");
        const environment = secretsData.get("environment");
        if (environment === "UATEnvironment") {
            const auth = {
                username: JIRAusername,
                password: JIRApassword,
            };
            //Get the JIRA test case key based on test case name/number
            let response = await axios.get(JIRABaseURL + `/rest/raven/1.0/api/test?jql=summary~%20${TestCaseName}`, { auth });
            let data = response.data;
            var TestKey = null;
            data.forEach(record => {
                TestKey = (`${record.key}`);
            });
            console.log(TestKey);
            const today = new Date();
            const LocalDate = today.toLocaleDateString();
            //Create Test Execution in JIRA 
            response = await axios.post(JIRABaseURL + '/rest/api/2/issue/', {
                "fields": {
                    "project": {
                        "key": "B2XSET"
                    },
                    "summary": `${TestCaseSummary}`,
                    "issuetype": {
                        "name": "Test Execution [XRAY]"
                    },
                    "customfield_12725": {
                        "id": "67144"
                    },
                    "labels": ["AMANDATestAutomation", "Playwright", "MCDrop23.4AutomatedRegressionTestExecutions"],
                    "environment": "RATM",
                    "assignee": {
                        "name": ""
                    },
                    "customfield_24953": ["B2XSET-277432"],
                    "description": `${LocalDate} - Test run executed`
                }
            }, { auth });
            var TestExecutionKey = response.data.key;
            console.log(response.data.key);
            //Link the Test execution with the Test case key
            response = await axios.post(JIRABaseURL + `/rest/raven/1.0/api/testexec/${TestExecutionKey}/test`, {
                "add": [
                    `${TestKey}`
                ]
            }, { auth });
            //Get Test Run ID that is generated in JIRA
            response = await axios.get(JIRABaseURL + `/rest/raven/1.0/api/testrun?testExecIssueKey=${TestExecutionKey}&testIssueKey=${TestKey}`, { auth });
            var TestRunID = response.data.id;
            console.log(TestRunID);
            //Update the test run as Pass in JIRA
            response = await axios.put(JIRABaseURL + `/rest/raven/1.0/api/testrun/${TestRunID}/status?status=${TestCaseStatus}`, {}, { auth });
        }
    }



    async VerifyPDFDocumentContent(Path, ExpectedText) {
        const pdfData = await fs.promises.readFile(Path);
        const { text } = await pdfParse(pdfData);
        var expectedText = ExpectedText;
        //const strippedString1 = text.replace(/\s/g, '');
        //const strippedString2 = expectedText.replace(/\s/g, '');
        const strippedString1 = text;
        const strippedString2 = expectedText;
        console.log("-----------Actual content without spaces starts------------\n" + strippedString1 + "\n-----------Actual content without spaces ends------------");
        console.log("------------------------------------------------------------------------------------------------------------------");
        console.log("-----------Expected content without spaces starts------------\n" + strippedString2 + "\n-----------Expected content without spaces ends------------");
        if (strippedString1.includes(strippedString2)) {
            console.log('----------------------- \n\n\n PDF Document content includes expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n PDF Document content does not include expected text \n\n\n ----------------------- ');
        }
        /*
        if (strippedString1 === strippedString2) {
            console.log('----------------------- \n\n\n PDF Document content matches expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n PDF Document content is not matching with expected text \n\n\n ----------------------- ');
        }
        */
    }



    async VerifyWordDocumentContent(Path, ExpectedText) {
        const docPath = Path;
        const result = await mammoth.extractRawText({ path: docPath });
        const text = result.value.trim();
        var expectedText = ExpectedText;
        //const strippedString1 = text.replace(/\s/g, '');
        //const strippedString2 = expectedText.replace(/\s/g, '');
        const strippedString1 = text;
        const strippedString2 = expectedText;
        console.log("-----------Actual content without spaces starts------------\n" + strippedString1 + "\n-----------Actual content without spaces ends------------");
        console.log("------------------------------------------------------------------------------------------------------------------");
        console.log("-----------Expected content without spaces starts------------\n" + strippedString2 + "\n-----------Expected content without spaces ends------------");
        if (strippedString1.includes(strippedString2)) {
            console.log('----------------------- \n\n\n Word Document content includes expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n Word Document content does not include expected text \n\n\n ----------------------- ');
        }
        /*
        if (strippedString1 === strippedString2) {
            console.log('----------------------- \n\n\n Word Document content matches with expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n Word Document content is not matching with expected text \n\n\n ----------------------- ');
        }
        */
    }



    async VerifyContractPDFDocumentContent(page, ExpectedText) {
        const contractPDFLocator = "//a[contains(text(),'Contract ') and contains(text(),'pdf')]//parent::td//preceding-sibling::td//a[text()='Download']";
        await page.locator(contractPDFLocator).click();
        var [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(contractPDFLocator)
        ]);
        await page.waitForTimeout(2000);
        var Path = await download.path();
        const pdfData = await fs.promises.readFile(Path);
        const { text } = await pdfParse(pdfData);
        var expectedText = ExpectedText;
        const strippedString1 = text;
        const strippedString2 = expectedText;
        console.log("-----------Actual content without spaces starts------------\n" + strippedString1 + "\n-----------Actual content without spaces ends------------");
        console.log("------------------------------------------------------------------------------------------------------------------");
        console.log("-----------Expected content without spaces starts------------\n" + strippedString2 + "\n-----------Expected content without spaces ends------------");
        if (strippedString1.includes(strippedString2)) {
            console.log('----------------------- \n\n\n Contract PDF Document content includes expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n Contract PDF Document content does not include expected text \n\n\n ----------------------- ');
        }
        /*
        if (strippedString1 === strippedString2) {
            console.log('----------------------- \n\n\n PDF Document content matches expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n PDF Document content is not matching with expected text \n\n\n ----------------------- ');
        }
        */
    }



    async VerifyInitialOrderPDFDocumentContent(page, ExpectedText) {
        const contractPDFLocator = "//a[contains(text(),'Initial ') and contains(text(),'pdf')]//parent::td//preceding-sibling::td//a[text()='Download']";
        await page.locator(contractPDFLocator).click();
        var [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(contractPDFLocator)
        ]);
        await page.waitForTimeout(2000);
        var Path = await download.path();
        const pdfData = await fs.promises.readFile(Path);
        const { text } = await pdfParse(pdfData);
        var expectedText = ExpectedText;
        const strippedString1 = text;
        const strippedString2 = expectedText;
        console.log("-----------Actual content without spaces starts------------\n" + strippedString1 + "\n-----------Actual content without spaces ends------------");
        console.log("------------------------------------------------------------------------------------------------------------------");
        console.log("-----------Expected content without spaces starts------------\n" + strippedString2 + "\n-----------Expected content without spaces ends------------");
        if (strippedString1.includes(strippedString2)) {
            console.log('----------------------- \n\n\n Contract Initial order PDF Document content includes expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n Contract Initial order PDF Document content does not include expected text \n\n\n ----------------------- ');
        }
        /*
        if (strippedString1 === strippedString2) {
            console.log('----------------------- \n\n\n PDF Document content matches expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n PDF Document content is not matching with expected text \n\n\n ----------------------- ');
        }
        */
    }



    async VerifyQuoteWordDocumentContent(page, ExpectedText) {
        const contractWordLocator = "//a[contains(text(),'Quote') and contains(text(),'doc')]//parent::th//preceding-sibling::td//a[text()='Download']";
        await page.locator(contractWordLocator).click();
        var [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(contractWordLocator)
        ]);
        await page.waitForTimeout(2000);
        const docPath = await download.path();
        const result = await mammoth.extractRawText({ path: docPath });
        const text = result.value.trim();
        var expectedText = ExpectedText;
        //const strippedString1 = text.replace(/\s/g, '');
        //const strippedString2 = expectedText.replace(/\s/g, '');
        const strippedString1 = text;
        const strippedString2 = expectedText;
        console.log("-----------Actual content without spaces starts------------\n" + strippedString1 + "\n-----------Actual content without spaces ends------------");
        console.log("------------------------------------------------------------------------------------------------------------------");
        console.log("-----------Expected content without spaces starts------------\n" + strippedString2 + "\n-----------Expected content without spaces ends------------");
        if (strippedString1.includes(strippedString2)) {
            console.log('----------------------- \n\n\n Quote Word Document content includes expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n Quote Word Document content does not include expected text \n\n\n ----------------------- ');
        }
        /*
        if (strippedString1 === strippedString2) {
            console.log('----------------------- \n\n\n Word Document content matches with expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n Word Document content is not matching with expected text \n\n\n ----------------------- ');
        }
        */
    }



    async VerifyExcelDocumentContent(Path, SheetName, ExpectedText) {
        const sheetPath = Path;
        const sheetName = SheetName;
        const workbook = new ExcelJS.Workbook();
        var text;
        try {
            // Load the workbook
            await workbook.xlsx.readFile(sheetPath);
            // Access the first worksheet (you can modify this if you have multiple sheets)
            const worksheet = workbook.getWorksheet(sheetName);
            // Convert worksheet to JSON
            const sheetData = [];
            worksheet.eachRow((row) => {
                console.log(row);
                if (row.number <= worksheet.rowCount && row.hasValues) {
                    console.log(row.values);
                    const rowData = row.values.map(cell => cell ? cell.toString() : '');
                    sheetData.push(rowData);
                }
            });
            // Convert sheet data to tab-separated text
            text = sheetData.map(row => row.join('\t')).join('\n');
            console.log(text);
            const expectedText = ExpectedText;
            const strippedString1 = text.replace(/\s/g, '');
            const strippedString2 = expectedText.replace(/\s/g, '');
            if (strippedString1.includes(strippedString2)) {
                console.log('----------------------- \n\n\n PDF Document content includes expected text \n\n\n ----------------------- ');
            } else {
                console.log('----------------------- \n\n\n PDF Document content does not include expected text \n\n\n ----------------------- ');
            }
            if (strippedString1 === strippedString2) {
                console.log('----------------------- \n\n\n Excel sheet content matches with expected text \n\n\n ----------------------- ');
            } else {
                console.log('----------------------- \n\n\n Excel sheet content is not matching with expected text \n\n\n ----------------------- ');
            }
        } catch (error) {
            console.error('Error reading the Excel file:', error.message);
        }
        /*
        const sheetPath = Path;
        const workbook = XLSX.readFile(sheetPath);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const text = sheetData.map(row => row.join('\t')).join('\n');
        */
        /*
         const expectedText = ExpectedText;
         const strippedString1 = text.replace(/\s/g, '');
         const strippedString2 = expectedText.replace(/\s/g, '');
         */
        //const strippedString1 = text;
        //const strippedString2 = expectedText;
        //console.log("-----------Actual content without spaces starts------------\n" + strippedString1 + "\n-----------Actual content without spaces ends------------");
        //console.log("------------------------------------------------------------------------------------------------------------------");
        //console.log("-----------Expected content without spaces starts------------\n" + strippedString2 + "\n-----------Expected content without spaces ends------------");
        /*
        if (strippedString1 === strippedString2) {
            console.log('----------------------- \n\n\n Excel sheet content matches with expected text \n\n\n ----------------------- ');
        } else {
            console.log('----------------------- \n\n\n Excel sheet content is not matching with expected text \n\n\n ----------------------- ');
        }
        */
    }



    async RunInsertDML(ObjectAPIName, insertData) {
        const secretsData = await this.fetchEnvironmentCreds();
        const username = secretsData.get("username");
        const password = secretsData.get("password");
        const clientId = secretsData.get("clientId");
        const clientSecret = secretsData.get("clientSecret");
        const securityToken = secretsData.get("securityToken");
        const URL = secretsData.get("environmentURL") + "/services/oauth2/token";
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}${securityToken}`
        });
        const { access_token, instance_url, } = await response.json();
        const url = 'https://YOUR_INSTANCE.salesforce.com/services/data/v52.0/sobjects/Account/';
        const accountData = {
            Name: 'Test Account',
            Industry: 'Technology'
        };
        const request = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        };
        response = await fetch(url, request);
        const result = await response.json();
        //console.log(result);
    }

}
module.exports = { UtilityFunctions };