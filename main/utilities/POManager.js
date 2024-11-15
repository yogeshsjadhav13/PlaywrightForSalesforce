const { LoginPage } = require('../pageObjects/LoginPage');
const { OpportunityPage } = require('../pageObjects/OpportunityPage');
const { QuotePage } = require('../pageObjects/QuotePage');
const { ContractPage } = require('../pageObjects/ContractPage');
const { ContactPage } = require('../pageObjects/ContactPage');
const { AccountPage } = require('../pageObjects/AccountPage');
const { LoginPageObjects } = require('../pageObjectLocators/LoginPageObjects');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.opportunityPage = new OpportunityPage(this.page);
        this.quotePage = new QuotePage(this.page);
        this.contractPage = new ContractPage(this.page);
        this.contactPage = new ContactPage(this.page);
        this.accountPage = new AccountPage(this.page);
        this.loginPageObjects = new LoginPageObjects(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getOpportunityPage() {
        return this.opportunityPage;
    }

    getQuotePage() {
        return this.quotePage;
    }

    getContractPage() {
        return this.contractPage;
    } 

    getContactPage() {
        return this.contactPage;
    } 
    
    getAccountPage() {
        return this.accountPage;
    } 

    getLoginPageObjects(){
        return this.loginPageObjects;
    }
}
module.exports = { POManager };