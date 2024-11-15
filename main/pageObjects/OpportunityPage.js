const { expect } = require('@playwright/test');


class OpportunityPage {



    constructor(page) {
        this.page = page;
        this.cartFrameScrive = this.page.frameLocator('//div[contains(@class,"normal")]//iframe[contains(@name,"vfFrameId")]').first();
        this.OpportunitiesLink = this.page.getByRole('link', { name: 'Opportunities' });
        this.newButton = this.page.getByRole('button', { name: 'New' });
        this.amountText = this.page.getByLabel('Amount');
        this.opportunityNameText = this.page.getByLabel('*Opportunity Name');
        this.AccountLookup = this.page.getByPlaceholder('Search Accounts...');
        this.closeDate = this.page.getByLabel('*Close Date');
        this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true });
        this.markStageAsComplete = this.page.locator('button').filter({ hasText: 'Mark Stage as Complete' });
    }

    async testDataCleanupOpportunity(TestData, utilityFunction) {
        for (let iteration = 0; iteration <= 10; iteration++) {
            const opportunityIDs = await utilityFunction.RunSOQLQuery("select id from opportunity where name like '%" + TestData.get("OpportunityName") + "%'");
            let opportunityIDIsNotNullOrEmpty = Boolean(opportunityIDs);
            if (opportunityIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("Opportunity", opportunityIDs);
            }
            if (!opportunityIDIsNotNullOrEmpty) {
                break;
            }
        }
    }

    async salesforceOpportunityCreation(TestData, utilityFunction){
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.OpportunitiesLink.click();
        await this.newButton.click();
        await this.amountText.fill('');
        await this.opportunityNameText.click();
        const OpportunityName = TestData.get("OpportunityName") + "_" +  + Math.floor(Math.random() * 90000 + 10000);
        await this.opportunityNameText.fill(OpportunityName);
        await this.AccountLookup.click();
        await this.AccountLookup.fill('Adam');
        await this.page.getByRole('option', { name: TestData.get("AccountName") }).locator('span').nth(2).click();
        await this.page.getByPlaceholder(TestData.get("AccountName")).click();
        await this.page.getByRole('combobox', { name: 'Stage' }).click();
        await this.page.getByRole('option', { name: 'Prospecting' }).click();
        var todaysDate = await utilityFunction.getWeekdayFromSpecifiedDaysFromToday(5);
        await this.closeDate.type(todaysDate);
        await this.saveButton.click();
        await this.page.getByRole('tab', { name: 'Details' }).click();
        await expect(this.page.locator('records-record-layout-block')).toContainText(OpportunityName);
        await this.markStageAsComplete.click();
        await this.page.locator('lightning-formatted-text').filter({ hasText: 'Qualification' }).click();
        const OpportunityID = await utilityFunction.RunSOQLQuery("select id from opportunity where name= '" + OpportunityName + "'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        await utilityFunction.WriteDataToExcel("OpportunityID", OpportunityID);
        return [OpportunityName, OpportunityID];
    }


}
module.exports = { OpportunityPage };