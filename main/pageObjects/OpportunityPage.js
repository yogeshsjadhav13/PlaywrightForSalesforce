const { expect } = require('@playwright/test');


class OpportunityPage {



    constructor(page) {
        this.page = page;
        this.cartFrameScrive = this.page.frameLocator('//div[contains(@class,"normal")]//iframe[contains(@name,"vfFrameId")]').first();
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
        await this.page.getByRole('link', { name: 'Opportunities' }).click();
        await this.page.getByRole('button', { name: 'New' }).click();
        await this.page.getByLabel('Amount').fill('');
        await this.page.getByLabel('*Opportunity Name').click();
        const OpportunityName = TestData.get("OpportunityName") + "_" +  + Math.floor(Math.random() * 90000 + 10000);
        await this.page.getByLabel('*Opportunity Name').fill(OpportunityName);
        await this.page.getByPlaceholder('Search Accounts...').click();
        await this.page.getByPlaceholder('Search Accounts...').fill('Adam');
        await this.page.getByRole('option', { name: 'Adams25 Inc' }).locator('span').nth(2).click();
        await this.page.getByPlaceholder('Adams25 Inc').click();
        await this.page.getByRole('combobox', { name: 'Stage' }).click();
        await this.page.getByRole('option', { name: 'Prospecting' }).click();
        var todaysDate = await utilityFunction.getWeekdayFromSpecifiedDaysFromToday(5);
        await this.page.getByLabel('*Close Date').type(todaysDate);
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.getByRole('tab', { name: 'Details' }).click();
        await expect(this.page.locator('records-record-layout-block')).toContainText(OpportunityName);
        await this.page.locator('button').filter({ hasText: 'Mark Stage as Complete' }).click();
        await this.page.locator('lightning-formatted-text').filter({ hasText: 'Qualification' }).click();
        const OpportunityID = await utilityFunction.RunSOQLQuery("select id from opportunity where name= '" + OpportunityName + "'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        await utilityFunction.WriteDataToExcel("OpportunityID", OpportunityID);
        return [OpportunityName, OpportunityID];
    }


}
module.exports = { OpportunityPage };