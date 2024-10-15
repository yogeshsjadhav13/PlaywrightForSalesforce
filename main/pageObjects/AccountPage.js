const { expect } = require('@playwright/test');


class AccountPage {

    constructor(page) {
        this.page = page;
    }



    async createKKnrAsBusinessController(LocalTestData, utilityFunctionLocal) {
        const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/o/Account/list");
        await this.page.getByRole('button', { name: 'Ny' }).click();
        await this.page.getByLabel('*Kontonamn').fill(LocalTestData.get("AccountName"));
        await this.page.getByLabel('Nytt Kontoägare').click();
        await this.page.getByLabel('Nytt Kontoägare').fill(LocalTestData.get("NewAccountOwner"));
        await this.page.waitForTimeout(2000);
        await this.page.getByLabel('Nytt Kontoägare').click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewAccountOwner") + ' Account Manager' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nytt BusinessUnit']").click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewBusinessUnit") }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nytt SubBusinessUnitLvl1']").click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewSubBusinessUnitLvl1") }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nytt SubBusinessUnitLvl2']").click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewSubBusinessUnitLvl2") }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nytt Sektor']").click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewSector") }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nytt Sales Unit']").click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewSalesUnit") }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nytt Canamn']").click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewCanamn") }).click();
        await this.page.getByRole('button', { name: 'Spara', exact: true }).click();
        await expect(this.page.locator("//div[@class='pageLevelErrors']")).toContainText('Populate all suggested values on KKNR Creation. Or if Approved, check if any suggested value is not populated');
        await this.page.locator("//button[@title='Stäng felmeddelande']").click();
        await this.page.waitForTimeout(2000);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nytt Delsegment ID']").click();
        await this.page.getByRole('option', { name: LocalTestData.get("NewSubSegmentID") }).click();
        await this.page.getByRole('button', { name: 'Spara', exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Kontoägare']//..//..//..//records-hoverable-link[contains(normalize-space(.),'" + LocalTestData.get("NewAccountOwner") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Enhet']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'Enterprise')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt BusinessUnit']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewBusinessUnit") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt SubBusinessUnitLvl1']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubBusinessUnitLvl1") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt SubBusinessUnitLvl2']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubBusinessUnitLvl2") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Sektor']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSector") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Sales Unit']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSalesUnit") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Canamn']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewCanamn") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Delsegment ID']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("NewSubSegmentID") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nytt Ca']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("CA") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Delsegment namn']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("SubSegmentnName") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Bransch']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("Industry") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontotyp ID']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("AccountTypeID") + "')]").first().hover();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontoposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Kundkonto')]").first().hover();
        await this.page.locator("//button[@title='Byt ägare']").first().click();
        await this.page.getByPlaceholder('Sök Användare...').click();
        await this.page.getByPlaceholder('Sök Användare...').fill(LocalTestData.get("ChangedAccountOwner"));
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Delete');
        await this.page.waitForTimeout(2000);
        await this.page.getByPlaceholder('Sök Användare...').click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Delete');
        await this.page.getByPlaceholder('Sök Användare...').fill(LocalTestData.get("ChangedAccountOwner"));
        await this.page.getByRole('option', { name: LocalTestData.get("ChangedAccountOwner")  + ' Sales' }).click();
        await this.page.getByRole('button', { name: 'Byt ägare' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontoägare']//..//..//..//records-hoverable-link[contains(normalize-space(.),'" + LocalTestData.get("ChangedAccountOwner") + "')]").first().hover();
    }


    
}
module.exports = { AccountPage };