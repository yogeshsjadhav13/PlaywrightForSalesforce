class ContactPage {

    constructor(page) {
        this.page = page;
    }



    async createCustomerContactAndEdit(TestData, utilityFunction) {
        const accountName = await utilityFunction.RunSOQLQuery("select Name from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        const ContactFirstName = "ContactFirstName" + Math.floor(Math.random() * 90000 + 10000);
        const ContactLastName = "ContactLastName" + Math.floor(Math.random() * 90000 + 10000);
        const ContactName = ContactFirstName + " "+ ContactLastName;
        await this.page.getByRole('link', { name: 'Kontakter' }).click();
        await this.page.getByRole('button', { name: 'Ny' }).click();
        await this.page.getByPlaceholder('Förnamn').click();
        await this.page.getByPlaceholder('Förnamn').fill(ContactFirstName);
        await this.page.getByPlaceholder('Efternamn').click();
        await this.page.getByPlaceholder('Efternamn').fill(ContactLastName);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Roll']").first().click();
        await this.page.getByText('Ekonomichef/CFO').click();
        await this.page.getByPlaceholder('Sök Konton...').type(accountName, { delay: 300 });
        await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
        await this.page.getByLabel('*E-post').click();
        await this.page.getByLabel('*E-post').fill(ContactFirstName + "@" + ContactLastName + ".com");
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ytterligare roll']").first().click();
        await this.page.getByLabel('Ytterligare roll', { exact: true }).getByText('Administratör').click();
        await this.page.getByRole('button', { name: 'Spara', exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//p[text()='Roll']//..//..//..//lightning-formatted-text[text()='Ekonomichef/CFO']").click();
        await this.page.getByRole('tab', { name: 'Detaljer' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Namn']//..//..//..//lightning-formatted-name[text()='"+ContactName+"']").click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontaktstatus']//..//..//..//lightning-formatted-rich-text[contains(normalize-space(.),'Active')]").click();
        await this.page.getByRole('button', { name: 'Redigera Roll' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Roll']").first().click();
        await this.page.getByTitle('Driftchef').click();
        await this.page.getByRole('button', { name: 'Spara' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Roll']//..//..//..//lightning-formatted-text[text()='Driftchef']").click();
    }


    
}
module.exports = { ContactPage };