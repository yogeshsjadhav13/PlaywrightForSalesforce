const { expect } = require('@playwright/test');


class OpportunityPage {



    constructor(page) {
        this.page = page;
        this.cartFrameScrive = this.page.frameLocator('//div[contains(@class,"normal")]//iframe[contains(@name,"vfFrameId")]').first();
        // Opportunity Page objects
        this.AffarsmojligheterTab = this.page.getByRole('tab', { name: 'Affärsmöjligheter' });
        this.newStandardButton = this.page.getByRole('button', { name: 'Ny standard' });
        this.opportunityNameTextbox = this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").first();
        this.FasPicklist = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Fas']");
        this.NuvarandeAvtalspartPicklist = this.page.getByRole('combobox', { name: 'Nuvarande avtalspart' });
        this.AterforsaljarePicklist = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Återförsäljare']");
        this.AffarsmojlighetskallaPicklist = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Affärsmöjlighets källa']");
        //this.opportunityCloseDateTextbox = this.page.getByLabel('AvslutsdatumDatum då affärsmöjligheten bedöms stängas.*');
        this.opportunityCloseDateTextbox = this.page.locator("//label[contains(normalize-space(.),'Avslutsdatum')]//..//input").first();
        this.saveButton = this.page.getByRole('button', { name: 'Spara', exact: true });
        this.nastaButton = this.page.getByRole('button', { name: 'Nästa' });
        this.newContactRoleButton = this.page.getByRole('button', { name: 'Ny kontaktroll' });
        this.searchContactTextbox = this.page.getByPlaceholder('Sök Kontakter...');
        this.searchAccountTextbox = this.page.getByPlaceholder('Sök Konton...');
        this.selectContactOption = this.page.locator("//div[@class='listContent']/ul[contains(@class,'visible')]/li[not(contains(@class,'invisible'))]");
        //Add Products on Opportunity Page objects
        this.laggTillProduktButton = this.page.getByRole('button', { name: 'Lägg till produkt' });
        this.searchProductLookup = this.page.locator("//input[contains(@title,'Sök Products') or contains(@title,'Sök Produkter')]").first();
        this.firstOptionFromSearchProductLookup = this.page.getByRole('option', { name: /Prisbokpost / }).first();
        this.typeOfForsaljning = this.page.locator("//span[text()='Typ av försäljning']//..//..//a[@class='select']");
        this.firstTypeOfSalesOption = this.page.getByRole('option', { name: /Sales/ }).first();
        this.antalTextbox = this.page.locator("//label[contains(normalize-space(.),'Antal*')]//following-sibling::input");
        this.manadsavgiftTextbox = this.page.locator("//label[contains(normalize-space(.),'Månadsavgift*')]//following-sibling::input");
        this.engangsavgiftTextbox = this.page.locator("//label[contains(normalize-space(.),'Engångsavgift*')]//following-sibling::input");
        this.avtalstidTextbox = this.page.locator("//label[contains(normalize-space(.),'Avtalstid')]//following-sibling::input");
        //Prisforhandling Page objects
        this.prisforhanldingButton = this.page.getByRole('button', { name: 'Prisförhandling' });
        this.prisforhandlingHeader = this.page.getByRole('heading', { name: 'VÄLJ TJÄNSTER ATT KVALIFICERA' });
        this.nextSwedishButton = this.page.getByRole('button', { name: 'Nästa', exact: true });
        this.madamNewSalesTextMessage1 = this.page.getByRole('heading', { name: 'Finns tidigare avtal? (Madam)' });
        this.madamNewSalesTextMessage2 = this.page.getByText('Inga tidigare avtal finns i MADAM för denna kund.');
        this.searchbutton = this.page.frameLocator('iframe[name*="vfFrameId"]').getByPlaceholder('Sök').first();
        //CRM Fiber Opportunity page objects
        this.AffarerAndAvtalTab = this.page.getByRole('tab', { name: 'AFFÄRER & AVTAL' });
        this.NewButton = this.page.locator('//button[@name="New"]');
        this.OpportunityNameTextbox = this.page.getByLabel('*Affärsmöjlighetsnamn');
        this.ContactNameLookup = this.page.getByPlaceholder('Sök Kontakter...');
        this.CRMFiberVarumarkePicklist = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Varumärke']").first();
        this.CRMFiberFasPicklist = this.page.getByRole('combobox', { name: 'Fas, --Inga--' });
        this.CRMFiberIntakterNSTextbox = this.page.getByLabel('*Intäkter NS');
        this.CRMFiberIntakterCSTextbox = this.page.getByLabel('*Intäkter CS');
        this.AvslutsdatumDateField = this.page.getByLabel('*Avslutsdatum');
        this.CRMFiberAdresstypPicklsit = this.page.getByRole('combobox', { name: 'Adresstyp, --Inga--' });
        this.CRMFiberAntalFastigheterTextbox = this.page.getByLabel('Antal fastigheter');
        this.CRMFiberAntalportarTextbox = this.page.getByLabel('Antal portar');
        this.CRMFiberAntalhushallTextbox = this.page.getByLabel('Antal hushåll');
        this.CRMFiberAntalFastighetsbeteckningTextbox = this.page.getByLabel('*Fastighetsbeteckning');
        this.CRMFiberKommunPicklist = this.page.getByRole('combobox', { name: 'Kommun, --Inga--' });
        this.CRMFiberHERATextbox = this.page.getByLabel('HERA/FMO');
        this.OnskatleveransdatumDateField = this.page.getByLabel('Önskat leveransdatum');
        this.CRMFiberBefintligtFastighetsnatFTTBFTTHPicklist = this.page.getByRole('combobox', { name: 'Befintligt Fastighetsnät FTTB/FTTH, --Inga--' });
        this.CRMFiberNyproduktionPicklist = this.page.getByRole('combobox', { name: 'Nyproduktion, --Inga--' });
        this.CRMFiberFastighetsnatPicklist = this.page.getByRole('combobox', { name: 'Fastighetsnät, --Inga--' });
        this.CRMFiberSwitchbytePicklist = this.page.getByRole('combobox', { name: 'Switchbyte, --Inga--' });
        this.CRMFiberQuoteVarukorgButton = this.page.getByRole('button', { name: ' VARUKORG' });
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


    async createMCSalesOpportunityWithContactAndProduct(TestData, utilityFunction) {
        var Opportunity;
        if (TestData.get("OrgType") === "SOHO") {
            Opportunity = await this.createStandardProcessOpportunity(TestData, utilityFunction);
        }
        else if (TestData.get("OrgType") === "LARGE") {
            Opportunity = await this.createAffarsmojlighetOpportunity(TestData, utilityFunction);
        }
        await this.addContactOnOpportunity(TestData);
        await this.addProductOnOpportunity(TestData.get("ProductName1"), TestData.get("Engangsavgift1"), TestData.get("Manadsavgift1"), TestData.get("TypAvForsaljning1"), TestData.get("Avtalstid1"), TestData.get("Antal1"));
        return Opportunity;
    }



    async createStandardProcessOpportunity(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const OpportunityName = TestData.get("OpportunityName") + "_" + Math.floor(Math.random() * 90000 + 10000);
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
        await this.newStandardButton.click();
        await this.opportunityNameTextbox.fill(OpportunityName);
        const todaysDate = await utilityFunction.TodaysDate();
        await this.opportunityCloseDateTextbox.click();
        await this.opportunityCloseDateTextbox.type(todaysDate);
        await this.page.getByLabel('New Sales (12 mån)').fill('123');
        await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
        await this.page.locator("//div[contains(normalize-space(.),'Återförsäljare') and contains(@class,'uiInput')]//a").first().click();
        await this.page.getByRole('option', { name: 'Nej' }).click();
        await this.saveButton.click();
        await this.page.getByRole('link', { name: 'Konton', exact: true }).click();
        const OpportunityID = await utilityFunction.RunSOQLQuery("select id from opportunity where name= \'" + OpportunityName + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        return [OpportunityName, OpportunityID];
    }



    async createAffarsmojlighetOpportunity(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const OpportunityName = TestData.get("OpportunityName") + "_" + Math.floor(Math.random() * 90000 + 10000);
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
        await this.page.getByRole('button', { name: 'Ny affärsmöjlighet' }).click();
        await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
        const todaysDate = await utilityFunction.TodaysDate();
        await this.opportunityCloseDateTextbox.click();
        await this.opportunityCloseDateTextbox.type(todaysDate);
        await this.page.getByLabel('New Sales (12 mån)').fill('123');
        await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
        await this.page.locator("//div[contains(normalize-space(.),'Nuvarande avtalspart') and contains(@class,'uiInput')]//a").first().click();
        await this.page.getByRole('option', { name: 'Atea' }).click();
        await this.page.locator("//div[contains(normalize-space(.),'Återförsäljare') and contains(@class,'uiInput')]//a").first().click();
        await this.page.getByRole('option', { name: 'Nej' }).click();
        await this.saveButton.click();
        await this.page.getByRole('link', { name: 'Konton', exact: true }).click();
        const OpportunityID = await utilityFunction.RunSOQLQuery("select id from opportunity where name= \'" + OpportunityName + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        return [OpportunityName, OpportunityID];
    }



    async createProfileRecordTypeBasedOpportunity(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const OpportunityName = TestData.get("OpportunityName") + "_" + Math.floor(Math.random() * 90000 + 10000);
        const todaysDate = await utilityFunction.getWeekdayFromSpecifiedDaysFromToday(5);
        const accountName = await utilityFunction.RunSOQLQuery("select name from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        if (TestData.get("Profile") == "SME" && TestData.get("OpportunityRecordType") == "Förenklad process" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText(TestData.get("OpportunityRecordType"), { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            //await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny förenklad' }).click();
            await this.page.getByLabel('*Affärsmöjlighetsnamn').fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.FasPicklist.click();
            await this.page.getByTitle('Sluta avtal').click();
            //await this.searchAccountTextbox.click();
            //await this.searchAccountTextbox.type(accountName, { delay: 300 });
            //await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.AffarsmojlighetskallaPicklist.click();
            await this.page.getByRole('option', { name: 'Whisbi' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SME" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText(TestData.get("OpportunityRecordType"), { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            //await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Visa fler åtgärder' }).click();
            //await this.page.getByRole('menuitem', { name: 'Nytt prospect' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            //await this.searchAccountTextbox.click();
            //await this.searchAccountTextbox.type(accountName, { delay: 300 });
            //await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.FasPicklist.click();
            await this.page.getByText('Aktivt prospekt').click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SME" && TestData.get("OpportunityRecordType") == "SME Efterregistrering" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText(TestData.get("OpportunityRecordType"), { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            //await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Visa fler åtgärder' }).click();
            //await this.page.getByRole('menuitem', { name: 'Ny Efterregistrering' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            //await this.searchAccountTextbox.click();
            //await this.searchAccountTextbox.type(accountName, { delay: 300 });
            //await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Sluta avtal' }).click();
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Ja', exact: true }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Återförsäljare Namn']").click();
            await this.page.getByRole('option', { name: 'Dital' }).click();
            await this.page.getByLabel('Annan Återförsäljare').fill('Telenor');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SME" && TestData.get("OpportunityRecordType") == "Förenklad process" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny förenklad' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.locator("//div[contains(normalize-space(.),'Affärsmöjlighets källa') and contains(@class,'uiInput')]//a").click();
            await this.page.getByRole('option', { name: 'Whisbi' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SME" && TestData.get("OpportunityRecordType") == "SME Efterregistrering" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny efterregistrering' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SME" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Nytt Prospect' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SOHO" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText(TestData.get("OpportunityRecordType"), { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            //await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Visa fler åtgärder' }).click();
            //await this.page.getByRole('menuitem', { name: 'Nytt prospect' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            //await this.searchAccountTextbox.click();
            //await this.searchAccountTextbox.type(accountName, { delay: 300 });
            //await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.FasPicklist.click();
            await this.page.getByText('Aktivt prospekt').click();
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SOHO" && TestData.get("OpportunityRecordType") == "Standard process" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText(TestData.get("OpportunityRecordType"), { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            //await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny standard' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            //await this.searchAccountTextbox.click();
            //await this.searchAccountTextbox.type(accountName, { delay: 300 });
            //await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.FasPicklist.click();
            await this.page.getByTitle('Kvalificera').click();
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SOHO" && TestData.get("OpportunityRecordType") == "SME Efterregistrering" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText(TestData.get("OpportunityRecordType"), { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            //await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Visa fler åtgärder' }).click();
            //await this.page.getByRole('menuitem', { name: 'Ny Efterregistrering' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            //await this.searchAccountTextbox.click();
            //await this.searchAccountTextbox.type(accountName, { delay: 300 });
            //await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Sluta avtal' }).click();
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Ja', exact: true }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Återförsäljare Namn']").click();
            await this.page.getByRole('option', { name: 'Dital' }).click();
            await this.page.getByLabel('Annan Återförsäljare').fill('Telenor');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SOHO" && TestData.get("OpportunityRecordType") == "Standard process" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.newStandardButton.click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.page.locator("//div[contains(normalize-space(.),'Återförsäljare') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SOHO" && TestData.get("OpportunityRecordType") == "Affärsmöjlighet" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny affärsmöjlighet' }).click();
            await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.page.locator("//div[contains(normalize-space(.),'Nuvarande avtalspart') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Atea' }).click();
            await this.page.locator("//div[contains(normalize-space(.),'Återförsäljare') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "SOHO" && TestData.get("OpportunityRecordType") == "SME Efterregistrering" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny Efterregistrering' }).click();
            await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "Affärsmöjlighet" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.NuvarandeAvtalspartPicklist.click();
            await this.page.getByLabel('Nuvarande avtalspart', { exact: true }).getByRole('option', { name: 'Atea' }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Affärskategori']").click();
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Kvalificera' }).click();
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "Förenklad affärsmöjlighet" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText(TestData.get("OpportunityRecordType"), { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Offerera och förhandla' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "HW Affärsmöjlighet" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('HW Affärsmöjlighet', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Kvalificera' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('Prospect', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Aktivt prospekt' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "Affärsmöjlighet" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny affärsmöjlighet' }).click();
            await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.page.locator("//div[contains(normalize-space(.),'Nuvarande avtalspart') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Atea' }).click();
            await this.page.locator("//div[contains(normalize-space(.),'Återförsäljare') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "Förenklad affärsmöjlighet" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny förenklad' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "HW Affärsmöjlighet" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny HW affärsmöjlighet' }).click();
            await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.page.locator("//div[contains(normalize-space(.),'Nuvarande avtalspart') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Atea' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Large" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Nytt prospect' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Cygate" && TestData.get("OpportunityRecordType") == "Cygate affär" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByRole('article', { name: 'Affärsmöjligheter' }).getByRole('button').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Kvalificera' }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Affärskategori']").first().click();
            await this.page.getByRole('option', { name: 'Standard' }).click();
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByRole('option', { name: 'Cygate Nätverk' }).click();
            await this.page.locator("//lightning-dual-listbox[contains(normalize-space(.),'Lösningsområden')]//button[contains(@title,'Flytta') and contains(@title,'till Vald')]").first().click();
            //await this.page.getByLabel('*Lösningsområden').getByRole('button', { name: 'Flytta till Vald' }).click();
            await this.page.getByRole('option', { name: 'Consulting' }).click();
            await this.page.locator("//lightning-dual-listbox[contains(normalize-space(.),'Cygate Affär')]//button[contains(@title,'Flytta') and contains(@title,'till Vald')]").first().click();
            //await this.page.getByLabel('*Cygate Affär').getByRole('button', { name: 'Flytta till Vald' }).click();
            await this.page.getByRole('button', { name: 'Spara', exact: true }).click();
            await expect(this.page.locator('records-record-edit-error')).toContainText('Granska felen på den här sidan.New Sales eller Continuation Sales måste vara större än 0 kr.Lägg till kontaktGranska följande fältKammarkollegiet');
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Kammarkollegiet']").first().click();
            await this.page.getByText('Ej Kammarkollegiet').click();
            await this.page.getByLabel('Cygate Continuation Sales').fill('0123');
            await this.page.getByLabel('Cygate New Sales').fill('0123');
            await this.page.getByPlaceholder('Sök Kontakter...').first().type(TestData.get("ContactName"), { delay: 300 });
            await this.page.locator("//records-record-layout-lookup[contains(normalize-space(.),'Kontakt')]//div[contains(@class,'list')]//ul//li[contains(normalize-space(.),'" + TestData.get("ContactName") + "')]").first().click();
            await this.page.locator("//button[text()='Spara']").first().click();
        } else if (TestData.get("Profile") == "Cygate" && TestData.get("OpportunityRecordType") == "Affärsmöjlighet" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByRole('article', { name: 'Affärsmöjligheter' }).getByRole('button').click();
            await this.page.getByLabel('Ny affärsmöjlighet').getByText('Affärsmöjlighet', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.NuvarandeAvtalspartPicklist.click();
            await this.page.getByLabel('Nuvarande avtalspart', { exact: true }).getByRole('option', { name: 'Atea' }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Affärskategori']").click();
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Kvalificera' }).click();
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Cygate" && TestData.get("OpportunityRecordType") == "Cygate affär" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny Cygate affär' }).click();
            await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.locator("//div[contains(normalize-space(.),'Affärskategori') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Standard' }).click();
            await this.page.locator("//div[contains(normalize-space(.),'Kammarkollegiet') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Ej Kammarkollegiet' }).click();
            await this.page.getByRole('option', { name: 'Cygate Nätverk' }).click();
            await this.page.locator("//lightning-dual-listbox[contains(normalize-space(.),'Lösningsområden')]//button[contains(@title,'Flytta') and contains(@title,'till Vald')]").first().click();
            //await this.page.getByLabel('*Lösningsområden').getByRole('button', { name: 'Flytta till Vald' }).click();
            await this.page.getByRole('option', { name: 'Consulting' }).click();
            await this.page.locator("//lightning-dual-listbox[contains(normalize-space(.),'Cygate Affär')]//button[contains(@title,'Flytta') and contains(@title,'till Vald')]").first().click();
            //await this.page.getByLabel('*Cygate Affär').getByRole('button', { name: 'Flytta till Vald' }).click();
            await this.page.getByRole('button', { name: 'Spara', exact: true }).click();
            await this.page.getByPlaceholder('Sök Kontakter...').type(TestData.get("ContactName"), { delay: 300 });
            await this.page.locator("//*[contains(normalize-space(.),'Kontakt')]//div[contains(@class,'list')]//ul//li[contains(@class,'lookup') and contains(normalize-space(.),'" + TestData.get("ContactName") + "')]").first().click();
            await this.page.getByLabel('Cygate Continuation Sales').fill('0123');
            await this.page.getByLabel('Cygate New Sales').fill('0123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Cygate" && TestData.get("OpportunityRecordType") == "Affärsmöjlighet" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny affärsmöjlighet' }).click();
            await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.page.locator("//div[contains(normalize-space(.),'Nuvarande avtalspart') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Atea' }).click();
            await this.page.locator("//div[contains(normalize-space(.),'Återförsäljare') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Service" && TestData.get("OpportunityRecordType") == "Förenklad affärsmöjlighet" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarsmojligheterTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('Förenklad affärsmöjlighet', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Offerera och förhandla' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Service" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarsmojligheterTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('Prospect', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Aktivt prospekt' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Service" && TestData.get("OpportunityRecordType") == "Förenklad affärsmöjlighet" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny förenklad' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Service" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Nytt prospect' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Solution" && TestData.get("OpportunityRecordType") == "Affärsmöjlighet" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.NuvarandeAvtalspartPicklist.click();
            await this.page.getByLabel('Nuvarande avtalspart', { exact: true }).getByRole('option', { name: 'Atea' }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Affärskategori']").click();
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Kvalificera' }).click();
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Solution" && TestData.get("OpportunityRecordType") == "Förenklad process" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('Förenklad process', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.FasPicklist.click();
            await this.page.getByTitle('Sluta avtal').click();
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Solution" && TestData.get("OpportunityRecordType") == "Efterregistrering" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('Efterregistrering', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.FasPicklist.click();
            await this.page.getByRole('option', { name: 'Lägg till produkter' }).click();
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Solution" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('Prospect', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.FasPicklist.click();
            await this.page.getByText('Aktivt prospekt').click();
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Solution" && TestData.get("OpportunityRecordType") == "Standard process" && TestData.get("UsingAccountButton") == "No") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.AffarerAndAvtalTab.click();
            await this.page.getByLabel('Affärsmöjligheter').getByRole('button', { name: 'Ny' }).click();
            await this.page.getByText('Standard process', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.OpportunityNameTextbox.fill(OpportunityName);
            await this.AvslutsdatumDateField.type(todaysDate);
            await this.FasPicklist.click();
            await this.page.getByTitle('Kvalificera').click();
            await this.page.getByLabel('New Sales (12 mån)').fill('0123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('0123');
            await this.AterforsaljarePicklist.click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Solution" && TestData.get("OpportunityRecordType") == "Affärsmöjlighet" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Ny affärsmöjlighet' }).click();
            await this.page.locator("//label[contains(normalize-space(.),'Affärsmöjlighetsnamn*')]//following-sibling::input").fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.page.locator("//div[contains(normalize-space(.),'Nuvarande avtalspart') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Atea' }).click();
            await this.page.locator("//div[contains(normalize-space(.),'Återförsäljare') and contains(@class,'uiInput')]//a").first().click();
            await this.page.getByRole('option', { name: 'Nej' }).click();
            await this.saveButton.click();
        } else if (TestData.get("Profile") == "Solution" && TestData.get("OpportunityRecordType") == "Prospect" && TestData.get("UsingAccountButton") == "Yes") {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
            await this.page.getByRole('button', { name: 'Nytt prospect' }).click();
            await this.opportunityNameTextbox.fill(OpportunityName);
            await this.opportunityCloseDateTextbox.click();
            await this.opportunityCloseDateTextbox.type(todaysDate);
            await this.page.getByLabel('New Sales (12 mån)').fill('123');
            await this.page.getByLabel('Continuation Sales (12 mån)').fill('123');
            await this.saveButton.click();
        }
        await this.page.getByRole('link', { name: 'Konton', exact: true }).click();
        var OppID = await utilityFunction.RunSOQLQuery("select id from opportunity where name= \'" + OpportunityName + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OppID + "/view");
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//*[text()='Posttyp för affärsmöjlighet']//..//..//..//records-record-type[contains(normalize-space(.),'" + TestData.get("OpportunityRecordType") + "')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Affärsmöjlighetsnamn']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + OpportunityName + "')]").first().click();
        const OpportunityID = await utilityFunction.RunSOQLQuery("select id from opportunity where name= \'" + OpportunityName + "\'");
        return [OpportunityName, OpportunityID];
    }



    async createCRMFiberOpportunity(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const OpportunityName = TestData.get("OpportunityName") + "_" + Math.floor(Math.random() * 90000 + 10000);
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        var Varumarke = TestData.get("Varumarke");
        var IntakterNS = "100";
        var IntakterCS = "200";
        var Adresstyp = "MDU";
        var AntalFastigheter = "300";
        var AntalPortar = "400";
        var AntalHushall = TestData.get("AntalHushall").toString();
        var Fastighetsbeteckning = "ABCD";
        var Kommun = "Ale";
        var HERAFMO = "HERAFMO";
        var ExistingPropertyNetworkFTTBFTTH = "Befintligt Fastighetsnät FTTB";
        var Nyproduktion = "Ja";
        var Fastighetsnat = "Telia bygger Fastighetsnät";
        var Switchbyte = "Ja";
        TestData.set("IntakterNS", IntakterNS);
        TestData.set("IntakterCS", IntakterCS);
        TestData.set("Adresstyp", Adresstyp);
        TestData.set("AntalFastigheter", AntalFastigheter);
        TestData.set("AntalPortar", AntalPortar);
        TestData.set("Fastighetsbeteckning", Fastighetsbeteckning);
        TestData.set("Kommun", Kommun);
        TestData.set("HERAFMO", HERAFMO);
        TestData.set("ExistingPropertyNetworkFTTBFTTH", ExistingPropertyNetworkFTTBFTTH);
        TestData.set("Nyproduktion", Nyproduktion);
        TestData.set("Fastighetsnat", Fastighetsnat);
        TestData.set("Switchbyte", Switchbyte);
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
        await this.AffarerAndAvtalTab.click();
        await this.page.locator('//button[@name="New"]').click();
        await this.OpportunityNameTextbox.fill(OpportunityName);
        await this.page.getByPlaceholder('Sök Kontakter...').type(TestData.get("ContactName"), { delay: 300 });
        await this.page.locator("//records-record-layout-item[@field-label='Kontakt']//div[contains(@class,'list')]//ul//li[contains(normalize-space(.),'" + TestData.get("ContactName") + "')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Varumärke']").first().click();
        await this.page.getByText(Varumarke, { exact: true }).click();
        await this.FasPicklist.click();
        await this.page.locator("//lightning-base-combobox-item[contains(normalize-space(.), 'Prospe')]").click();
        await this.page.getByLabel('*Intäkter NS').fill(IntakterNS);
        await this.page.getByLabel('*Intäkter CS').fill(IntakterCS);
        await this.AvslutsdatumDateField.click();
        const todaysDate = await utilityFunction.TodaysDate();
        await this.AvslutsdatumDateField.type(todaysDate);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Adresstyp']").first().click();
        await this.page.getByText(Adresstyp).click();
        await this.page.getByLabel('Antal fastigheter').fill(AntalFastigheter);
        await this.page.getByLabel('Antal portar').fill(AntalPortar);
        await this.page.getByLabel('Antal hushåll').fill(AntalHushall);
        await this.page.getByLabel('*Fastighetsbeteckning').fill(Fastighetsbeteckning);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Kommun']").first().click();
        await this.page.getByText(Kommun, { exact: true }).click();
        await this.page.getByLabel('HERA/FMO').fill(HERAFMO);
        await this.page.getByLabel('Önskat leveransdatum').type(todaysDate);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Fastighetsnät']").first().click();
        await this.page.getByText(ExistingPropertyNetworkFTTBFTTH, { exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nyproduktion']").first().click();
        await this.page.getByRole('option', { name: Nyproduktion }).locator('span').nth(1).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Fastighetsnät']").first().click();
        await this.page.getByText(Fastighetsnat).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Switchbyte']").first().click();
        await this.page.getByRole('option', { name: Switchbyte }).getByText(Switchbyte).click();
        await this.saveButton.click();
        await this.page.getByRole('link', { name: TestData.get("OpportunityName") }).first().click();
        const OpportunityID = await utilityFunction.RunSOQLQuery("select id from opportunity where name= \'" + OpportunityName + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        return [OpportunityName, OpportunityID];
    }



    async addContactOnOpportunity(TestData) {
        await this.newContactRoleButton.click();
        await this.searchContactTextbox.fill(TestData.get("ContactName"));
        await this.page.waitForTimeout(5000);
        await this.searchContactTextbox.clear();
        await this.searchContactTextbox.type(TestData.get("ContactName"));
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('option', { name: 'Sök Kontakter' }).click();
        await this.page.getByRole('link', { name: TestData.get("ContactName") }).click();
        //await this.page.locator("//input[@title='Sök Kontakter']//parent::div//div[contains(@class,'list')]//ul//li[contains(normalize-space(.),'" + TestData.get("ContactName") + "')]").first().click();
        await this.saveButton.click();
    }



    async addProductOnOpportunity(ProductName, Engangsavgift, Manadsavgift, TypAvForsaljning, Avtalstid, Antal) {
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//records-entity-label[text()='Affärsmöjlighet']").first().click();
        await this.laggTillProduktButton.click();
        /*
        await this.searchProductLookup.click();
        await this.searchProductLookup.type(ProductName);
        await this.page.waitForTimeout(2000);
        await this.firstOptionFromSearchProductLookup.click();
        */
        await this.page.getByPlaceholder('Sök Produkter......').type(ProductName);
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: 'Sök Produkter... ' }).click();
        await this.page.getByRole('link', { name: ProductName }).click();
        await this.typeOfForsaljning.click();
        await this.page.getByRole('option', { name: TypAvForsaljning }).first().click();
        await this.antalTextbox.type(Antal.toString());
        await this.manadsavgiftTextbox.type(Manadsavgift.toString());
        await this.engangsavgiftTextbox.type(Engangsavgift.toString());
        await this.avtalstidTextbox.type(Avtalstid.toString());
        await this.saveButton.click();
    }



    async addCygateProductOnOpportunity(ProductName, Engangsavgift, Manadsavgift, TypAvForsaljning, Avtalstid) {
        var ProductName = ProductName.split(";");
        await this.page.getByRole('button', { name: 'Add Products' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Lösningsområden']").first().click();
        await this.page.getByRole('option', { name: ProductName[0] }).click();
        await this.page.getByRole('option', { name: ProductName[1] }).click();
        await this.page.locator("//button[contains(@title,'Flytta') and contains(@title,'till Selected')]").first().click();
        //await this.page.getByRole('button', { name: 'Flytta till Selected' }).click();
        await this.page.getByRole('button', { name: 'Nästa' }).click();
        await this.page.locator("//button[@name='Supplier']").click();
        await this.page.getByRole('option', { name: 'Aruba' }).click();
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[3]//input").click();
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[3]//input").fill('10');
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[4]//input").click();
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[4]//input").fill(Manadsavgift.toString());
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[5]//input").click();
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[5]//input").fill(Engangsavgift.toString());
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[6]//input").click();
        await this.page.locator("//div[@class='DESKTOP uiContainerManager']//table//tr//td[6]//input").fill(Avtalstid.toString());
        await this.page.locator("//button[@name='Sales type']").click();
        await this.page.getByRole('option', { name: TypAvForsaljning }).click();
        await this.page.getByRole('button', { name: 'Spara' }).click();
    }



    async performPrisforhandling(TestData) {
        await this.prisforhanldingButton.click();
        if (TestData.get("SalesFlowType") === "UtilizerBreakout") {
            await this.page.locator("//div[@role='alert']//p[text()='Kunden är nyttjare av ett aktivt Ramavtal, ska kunden brytas ut kan du välja att skapa ett eget Ramavtal, annars klicka på Avbryt.']").click();
            await this.page.locator("//span[contains(text(),'Skapa ett nytt eget Ramavtal till kunden. Kunden tas bort som nyttjare i gamla avtalet när det nya egna Ramavtalet blir aktivt.')]//preceding-sibling::span[@class='slds-radio_faux']").click();
            await this.nextSwedishButton.click();
        }
        await this.prisforhandlingHeader.click();
        const Products = (TestData.get("Products")).split(";");
        var ITDaasFlag, ITSupportFlag, ConnectedOfficeFlag;
        for (let iteration = 0; iteration < Products.length; iteration++) {
            if (Products[iteration] === "IT-avdelning" || Products[iteration] === "IT-avdelning Start") {
                ITDaasFlag = "Yes";
            }
            if (Products[iteration] === "IT-support Standard" || Products[iteration] === "IT-support Plus") {
                ITSupportFlag = "Yes";
            }
            if (Products[iteration] === "Bredband Plus" || Products[iteration] === "Bredband Start" || Products[iteration] === "Bredband Pro" ||
                Products[iteration] === "Cloud VPN SD-Wan/Firewall" || Products[iteration] === "Datanet" || Products[iteration] === "Cloud VPN Wifi/Lan") {
                ConnectedOfficeFlag = "Yes";
            }
        }

        if (ITDaasFlag === "Yes") {
            await this.page.locator("//vlocity_cmt-omniscript-checkbox[not(contains(@class,'hide'))]//div/label[contains(normalize-space(.), 'IT-avdelning')]/span[@class='slds-checkbox_faux']").click();

        }

        if (ITSupportFlag === "Yes") {
            await this.page.locator("//vlocity_cmt-omniscript-checkbox[not(contains(@class,'hide'))]//div/label[contains(normalize-space(.), 'IT-support')]/span[@class='slds-checkbox_faux']").click();

        }

        if (ConnectedOfficeFlag === "Yes" && (TestData.get("SalesFlowType") === "NewSales" || TestData.get("SalesFlowType") === "LegacyNegotiation" || TestData.get("SalesFlowType") === "UtilizerBreakout")) {
            await this.page.locator("//vlocity_cmt-omniscript-checkbox[not(contains(@class,'hide'))]//div/label[contains(normalize-space(.), 'Nätverkstjänster (leveranskontroll)')]/span[@class='slds-checkbox_faux']").click();
        } else if (ConnectedOfficeFlag === "Yes" && (TestData.get("SalesFlowType") === "Renegotiation" || TestData.get("SalesFlowType") === "Inforhandling" || TestData.get("SalesFlowType") === "Tillaggsforhandling")) {
            await this.page.locator("//vlocity_cmt-omniscript-checkbox[(not(contains(@class,'hide'))) and (@data-omni-key='CheckBox_ModifyPrecheck')]//span[@class='slds-checkbox_faux']").click();
        }

        await this.nextSwedishButton.click();

        if (ITDaasFlag === "Yes") {
            await this.page.getByLabel('*Kontor- ort/orter/utland').fill('Test Automation Kontor- ort/orter/utland');
            await this.page.getByLabel('*Nuvarande IT-Partner').fill('Test Automation Nuvarande IT-Partner');
            await this.page.getByLabel('*Kundens behov').fill('Test Automation Kundens behov');
            await this.page.getByLabel('*Ange antal användare').fill('Test Automation Ange antal användare');
            await this.page.getByLabel('*Ange antal datorer').fill('Test Automation Ange antal datorer');
            await this.page.getByLabel('*Nätverksenheter (Ex switch, brandvägg, accesspunkt)').fill('Test Automation Nätverksenheter (Ex switch, brandvägg, accesspunkt)');
            await this.page.getByLabel('*Servers (egna lokalt och/eller externt)').fill('Test Automation Servers (egna lokalt och/eller externt)');
            await this.page.getByLabel('*Office eller Microsoft 365 (mandatory, text area)').fill('Test Automation Office eller Microsoft 365');
            await this.page.getByLabel('*Ytterligare information').fill('Test Automation Ytterligare information');
            await this.page.getByText('MARKERA OM DU ÄR FÄRDIG (SKICKA TILL IT-AVDELNING TAM)').click();
            await this.nastaButton.click();

        }

        if (ConnectedOfficeFlag === "Yes") {
            await this.page.locator("//button[text()='RADERA ALLA']").click();
            await this.page.locator("//button[text()='Ja']").click();
            if (TestData.get("COLeveranskontrollType") === "Excel") {
                await this.page.getByLabel('BläddraRemove the file').setInputFiles('./resources/TestDataFiles/addresslist.csv');
                await this.page.getByRole('button', { name: 'Ladda Upp', exact: true }).click();
                await this.page.getByText('Filen har laddats upp').click();
                await this.page.getByRole('button', { name: 'VALIDERA ALLA' }).click();
                await this.page.getByText('Adressvalideringen pågår, var snäll och vänta').click();
                var addressListLength = await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr//select[@name='selectedServicePoint']").count();
                for (let i = 1; i <= addressListLength; i++) {
                    await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr[" + i + "]//select[@name='selectedServicePoint']").selectOption({ index: 1 });
                }

            } else if (TestData.get("COLeveranskontrollType") === "Manual") {
                const Address = (TestData.get("COAddresses")).split("|");
                for (let i = 1; i <= Address.length; i++) {
                    const AddressDetails = Address[i - 1].split(";");
                    await this.page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='city']").fill(AddressDetails[0]);
                    await this.page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='postalCode']").fill(AddressDetails[1]);
                    await this.page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='streetName']").fill(AddressDetails[2]);
                    await this.page.locator("//c-address-validation//table//tbody/tr[" + i + "]//input[@name='streetNumber']").fill(AddressDetails[3]);
                    await this.page.locator("//c-address-validation//table//tbody/tr[" + i + "]//button[text()='Validera']").click();
                    await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr[" + i + "]//select[@name='selectedServicePoint']").selectOption({ index: 1 });
                    await this.page.getByRole('button', { name: 'View More' }).click();
                }
                await this.page.locator("//c-address-validation//table//tbody/tr[" + (Address.length + 1) + "]//td//lightning-icon[contains(@class,'delete')]/span/lightning-primitive-icon").click();
                await this.page.getByRole('button', { name: 'Ja' }).click();
            }
            await this.page.locator("//button[text()='LEVERANSKONTROLL ALLA']").click();
            await this.page.locator('progress').click();
            await this.page.getByRole('article').locator('div').filter({ hasText: 'siter har bearbetats' }).nth(1).click();
            await this.page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='Precheck']//div[text()='Totalt antal adresser : " + TestData.get("CONumberOfAddresses") + "']").click();
            await this.page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='Precheck']//div[text()='Antal adresser utan fel : " + TestData.get("CONumberOfAddresses") + "']").click();
            await this.page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='Precheck']//div[text()='Antal adresser med fel : 0']").click();
            await this.page.locator("//button[@title='Uppdatera tabell']").click();
            await this.page.waitForTimeout(2000);
            await this.page.locator("//button[@title='Uppdatera tabell']").click();
            await this.page.waitForTimeout(2000);
            await this.page.locator("//button[@title='Uppdatera tabell']").click();
            await this.page.waitForTimeout(2000);
            const COAveragePrices = (TestData.get("COAveragePrices")).split(";");
            await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Genomsnittspris']//parent::tr/td[text()='" + COAveragePrices[0] + "']").click();
            await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Genomsnittspris']//parent::tr/td[text()='" + COAveragePrices[1] + "']").click();
            await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Genomsnittspris']//parent::tr/td[text()='" + COAveragePrices[2] + "']").click();
            await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Genomsnittspris']//parent::tr/td[text()='" + COAveragePrices[3] + "']").click();
            await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Genomsnittspris']//parent::tr/td[text()='" + COAveragePrices[4] + "']").click();
            await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody//tr/td[text()='Genomsnittspris']//parent::tr/td[text()='" + COAveragePrices[5] + "']").click();
            for(let i = 1; i <= TestData.get("CONumberOfAddresses"); i++){
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'Fiber - SINGLE USER') or contains(normalize-space(.),'Fiber - CUSTOMER LOCATED FIBERNODE')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'Nedströmshastighet : 1000000 kbps')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'SLA C4 Available')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[5]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[6]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[7]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
                await this.page.locator("//*[@data-omni-key='CustomLWC1']//table//tbody/tr[@class='background']["+i+"]/td[8]/div[contains(normalize-space(.),'Wireless Premium : 250 Mbit/s') or contains(normalize-space(.),'Wireless Premium : 100 Mbit/s')]").click();
            }
            this.nextSwedishButton.click();
        }

        if (TestData.get("SalesFlowType") === "NewSales") {
            await this.madamNewSalesTextMessage1.click();
            await this.madamNewSalesTextMessage2.click();
            await this.nextSwedishButton.click();
            await this.searchbutton.click();
        } else if (TestData.get("SalesFlowType") === "Renegotiation") {
            await this.page.getByRole('heading', { name: 'Godkända/Icke godkända avtal' }).click();
            await this.page.getByText('Vissa avtal kan omförhandlas').click();
            await this.page.getByText('Y', { exact: true }).nth(1).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Kan omförhandlas?' }).click();
            await this.page.getByText('Detta avtal kommer att omfö').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Du har redan ett existerande' }).click();
            await this.page.getByText('Omförhandling (Omförhandla befintliga produkter som finns i aktivt avtal)', { exact: true }).click();             
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Skicka mandatförfrågan?' }).click();
            await this.page.getByLabel('KOMMENTARER').click();
            await this.page.getByLabel('KOMMENTARER').fill('Test Automation');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Mandatförfrågan skickad' }).click();
            await this.page.getByText('Godkännande begäran skickas').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
        } else if (TestData.get("SalesFlowType") === "LegacyNegotiation") {
            await this.page.getByRole('heading', { name: 'Godkända/Icke godkända avtal' }).click();
            await this.page.getByText('Vissa avtal kan omförhandlas').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Välj avtal att omförhandla' }).click();
            await this.page.getByText('Vänligen välj ett avtal som ska omförhandlas.').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.locator("//*[@data-omni-key='CustomLWCMessage7']//span[normalize-space(.)='']//preceding-sibling::span[contains(@class,'slds-checkbox_faux')]").click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByText('Error: Välj vad du ska göra').click();
            await this.page.getByText('Tilläggsavtal - Tillägg av ny produktfamilj, inget godkännande behövs (jobbmobil går ej att prisförhandla)').click();
            await this.page.getByText('Omförhandling - Detta är en förtidig omförhandling, behöver godkännas av närmsta chef').click();
            if (TestData.get("LegacyNegotiation") === "LegacyTillagsforhandling") {
                await this.page.getByText('Tilläggsavtal - Tillägg av ny produktfamilj, inget godkännande behövs (jobbmobil går ej att prisförhandla)').click();
            }
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByText('RAM-avtalet innehåller redan en befintlig växellösning. Av den anledningen kommer du inte kunna beställa en ny TP-växellösning från Salesforce i samband med avtalsförhandlingen (kombiärende) eller vid ett senare tillfälle (avrop)').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Kundens nuvarande avtal innehåller Touchpoint Minimidebitering' }).click();
            await this.page.getByText('Kundens nuvarande avtal innehåller Touchpoint Minimidebitering. Touchpoint minimideb som inte finns i ett Salesforceavtal (endast TUPP) ska omförhandlas så att hela engagemanget ingår.').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Underavtal' }).click();
            await this.page.getByText('Vid omförhandling av Touchpoint kommer även Touchpoint-priset på befintliga underavtal att ersättas med det nya Salesforce-avtalets priser').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Verifiera/Kontrollera Avtal' }).click();
            await this.page.getByText('Detta avtal kommer att omförhandla, vänligen verifiera och klicka "next"').click();
            await this.page.getByText('Vänligen notera att detta avtal har växel lösning och dess priser får inte omförhandlas (priser måste vara samma som i TUPP om inkluderat i avtalet) Vänligen notera att detta avtal har en längd av 36 månader och slut datum på 2027-04-16 och därför behöver godkännande innan omförhandling. Initiera godkännande med din chef').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            if (TestData.get("LegacyNegotiation") === "LegacyTillagsforhandling") {
            } else {
                await this.page.getByRole('heading', { name: 'Skicka mandatförfrågan?' }).click();
                await this.page.getByLabel('KOMMENTARER').click();
                await this.page.getByLabel('KOMMENTARER').fill('Test Automation');
                await this.page.getByRole('button', { name: 'Nästa' }).click();
                await this.page.getByRole('heading', { name: 'Mandatförfrågan skickad' }).click();
                await this.page.getByText('Godkännande begäran skickas').click();
                await this.page.getByRole('button', { name: 'Nästa' }).click();
            }
        } else if (TestData.get("SalesFlowType") === "UtilizerBreakout") {
            if (TestData.get("UtilizerBreakoutContractStatus") === "Draft") {
                await this.madamNewSalesTextMessage1.click();
                await this.madamNewSalesTextMessage2.click();
            } else if (TestData.get("UtilizerBreakoutContractStatus") === "Active") {
                await this.page.locator("//h1[text()='Ej godkända avtal att omförhandla']").click();
                await this.page.locator("//div[@role='alert']//p[text()='Kundens avtal kan inte omförhandlas via SF, om du går vidare så kommer ett nytt avtal att skapas i Tupp.']").click();
                await this.page.locator("//table/tr[1]/td[1]/div[contains(text(),'N')]").click();
                await this.page.locator("//table/tr[1]/td[2]/div[contains(text(),'Y')]").click();
            }
            await this.nextSwedishButton.click();
            await this.searchbutton.click();
        } else if (TestData.get("SalesFlowType") === "Inforhandling") {
            await this.page.getByRole('heading', { name: 'Godkända/Icke godkända avtal' }).click();
            await this.page.getByText('Vissa avtal kan omförhandlas').click();
            await this.page.getByText('Y', { exact: true }).nth(1).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Kan omförhandlas?' }).click();
            await this.page.getByText('Detta avtal kommer att omfö').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Du har redan ett existerande' }).click();
            await this.page.getByText('Införhandling (Tillägg av produkt inom en produktfamilj i kundens existerande avtal, utan möjlighet att förhandla priset)', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
        } else if (TestData.get("SalesFlowType") === "Tillaggsforhandling") {
            await this.page.getByRole('heading', { name: 'Godkända/Icke godkända avtal' }).click();
            await this.page.getByText('Vissa avtal kan omförhandlas').click();
            await this.page.getByText('Y', { exact: true }).nth(1).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Kan omförhandlas?' }).click();
            await this.page.getByText('Detta avtal kommer att omfö').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Du har redan ett existerande' }).click();
            await this.page.getByText('Införhandling (Tillägg av produkt inom en produktfamilj i kundens existerande avtal, utan möjlighet att förhandla priset)', { exact: true }).click();
            await this.page.getByText('Omförhandling (Omförhandla befintliga produkter som finns i aktivt avtal)', { exact: true }).click();
            await this.page.getByText('Tilläggsförhandling (Tillägg av ett helt nytt erbjudande i avtalet)', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
        }



    }



    async offertCreation(TestData, OpportunityName) {
        if (TestData.get("SalesFlowType") === "Renegotiation") {
            await this.page.getByRole('button', { name: 'Omförhandling' }).click();
            await this.page.getByRole('heading', { name: 'Välj ett aktivt Avtal' }).click();
            await this.page.locator("//div[contains(text(),'" + OpportunityName + "')]//ancestor::tr/td[1]//span[@class='slds-radio_faux']").click();
            await this.page.getByText(TestData.get("QuoteRecordType")).click();
            await this.page.getByRole('heading', { name: 'Vald aktivt avtal kommer att' }).click();
            await this.page.getByRole('article').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            if (TestData.get("QuoteRecordType") === "Offert - Avrop Ramavtal - Avtalat pris" || TestData.get("QuoteRecordType") === "Offert - Avrop Ramavtal - Eget pris") {
                await this.page.getByLabel('SÖK EFTER ORG NUMMER ELLER').click();
                await this.page.getByLabel('SÖK EFTER ORG NUMMER ELLER').type((TestData.get("RenegotiationOrgNumber")).toString());
                await this.page.locator("//vlocity_cmt-omniscript-typeahead[@data-omni-key='Acc']//input//parent::div//following-sibling::div/div//li[1]//span[contains(@class,'option')]").click();
                await this.page.getByRole('button', { name: 'Hämta avtal' }).click();
                await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[contains(@data-omni-key,'Item')]//table/tr/td[2]/div[contains(text(),'" + TestData.get("FAOpportunityName") + "')]//ancestor::tr/td[1]//span[@class='slds-checkbox_faux']").click();
                await this.page.getByRole('button', { name: 'Nästa' }).click();
            }
            await this.page.locator("//p[text()='Offerttyp']/following-sibling::p//lightning-formatted-text[text()='" + TestData.get("QuoteRecordTypeName") + "']").click();
            await this.CRMFiberQuoteVarukorgButton.click();
        } else {
            await this.page.locator("//a[@data-label='Offerter']").click();
            await this.page.locator("//a[@title='Nyförsäljning']").click();
            await this.page.locator('label').filter({ hasText: TestData.get("QuoteRecordType") }).locator('span').first().click();
            await this.nastaButton.click();
            if (TestData.get("QuoteRecordType") === "Offert - Avrop Ramavtal - Avtalat pris" || TestData.get("QuoteRecordType") === "Offert - Avrop Ramavtal - Eget pris") {
                await this.page.getByLabel('SÖK EFTER ORG NUMMER ELLER').click();
                await this.page.getByLabel('SÖK EFTER ORG NUMMER ELLER').type((TestData.get("OrgNumber")).toString());
                await this.page.locator("//vlocity_cmt-omniscript-typeahead[@data-omni-key='Acc']//input//parent::div//following-sibling::div/div//li[1]//span[contains(@class,'option')]").click();
                await this.page.getByRole('button', { name: 'Hämta avtal' }).click();
                await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[contains(@data-omni-key,'Item')]//table/tr/td[2]/div[contains(text(),'" + OpportunityName + "')]//ancestor::tr/td[1]//span[@class='slds-checkbox_faux']").click();
                await this.page.getByRole('button', { name: 'Nästa' }).click();
            }
            await this.page.locator("//p[text()='Offerttyp']/following-sibling::p//lightning-formatted-text[text()='" + TestData.get("QuoteRecordTypeName") + "']").click();
            await this.CRMFiberQuoteVarukorgButton.click();
        }
    }



    async IntaktseffektkalkylCreation() {
        await this.page.getByRole('button', { name: 'Intäktseffekt kalkyl' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Category']").first().click();
        await this.page.getByRole('option', { name: 'MOBILT', exact: true }).click();
        await this.page.locator('//lightning-input[@data-id="OldAntal"]//input').fill('5');
        await this.page.locator('//lightning-input[@data-id="OldMonthlyCost"]//input').fill('100');
        await this.page.locator('//lightning-input[@data-id="NewAntal"]//input').fill('5');
        await this.page.locator('//lightning-input[@data-id="NewMonthlyCost"]//input').fill('200');
        await this.page.getByRole('button', { name: 'Spara' }).click();
        await this.page.getByRole('rowheader', { name: '6 000,00 kr' }).locator('lightning-formatted-number').click();
        await this.page.getByRole('gridcell', { name: '12 000,00 kr' }).locator('lightning-formatted-number').click();
        await this.page.getByRole('gridcell', { name: '100 %' }).locator('lightning-formatted-number').click();
        await this.page.getByRole('button', { name: 'Stäng fönstret' }).click();
    }



    async changeOpportunityStatusAndVerifyError(Stage, ValidationError) {
        await this.page.getByRole('button', { name: 'Redigera Fas' }).click();
        await this.FasPicklist.click();
        await this.page.getByLabel('Fas', { exact: true }).getByRole('option', { name: Stage }).click();
        await this.page.getByRole('button', { name: 'Spara' }).click();
        await this.page.getByText(ValidationError).click();
        await this.page.getByRole('button', { name: 'Avbryt' }).click();
    }



    async VerifyErrorOnOpportunityStageChange(ValidationError) {
        await this.page.locator('button').filter({ hasText: 'Markera Fas som färdig(t)' }).first().click();
        await expect(this.page.locator("//span[@class='toastMessage forceActionsText']").first()).toContainText(ValidationError);
    }



    async changeOpportunityStatus(OldOpportunityStatus, NewOpportunityStatus) {
        await this.page.getByRole('button', { name: 'Redigera Fas' }).click();
        await this.FasPicklist.click();
        await this.page.getByLabel('Fas', { exact: true }).getByRole('option', { name: NewOpportunityStatus }).click();
        await this.page.getByRole('button', { name: 'Spara' }).click();
        await this.page.getByRole('button', { name: 'Redigera Fas' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Fas' and @data-value='" + NewOpportunityStatus + "']").click();
        await this.page.keyboard.press('Tab');
        await this.page.getByRole('button', { name: 'Avbryt' }).click();
    }



    async verifySalesValuesOnOpportunity(Salesvarde, NewSales12Months, ContinuationSales12Months, TotalAvtalsvarde, TotalAvtalsvardeNS, TotalAvtalsvardeCS) {
        //await this.page.locator("//span[text()='Sales-värde']//..//..//..//lightning-formatted-text[contains(text(),'" + Salesvarde + "')]").click();
        await this.page.locator("//span[text()='New Sales (12 mån)']//..//..//..//lightning-formatted-text[contains(text(),'" + NewSales12Months + "')]").click();
        await this.page.locator("//span[text()='Continuation Sales (12 mån)']//..//..//..//lightning-formatted-text[contains(text(),'" + ContinuationSales12Months + "')]").click();
        await this.page.locator("//span[text()='Totalt avtalsvärde']//..//..//..//lightning-formatted-text[contains(text(),'" + TotalAvtalsvarde + "')]").click();
        await this.page.locator("//span[text()='Totalt avtalsvärde NS']//..//..//..//lightning-formatted-text[contains(text(),'" + TotalAvtalsvardeNS + "')]").click();
        await this.page.locator("//span[text()='Totalt avtalsvärde CS']//..//..//..//lightning-formatted-text[contains(text(),'" + TotalAvtalsvardeCS + "')]").click();
    }



    async verifySalesValuesOnFOL(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        var FOLID = await utilityFunction.RunSOQLQuery("select id from Forecast_Opportunity_Link__c where Opportunity__c = '" + TestData.get("OpportunityID") + "'")
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + FOLID + "/view");
        if (TestData.get("Profile") == "Service") {
            await this.page.locator("//p[text()='Denna post är inte längre tillgänglig. Kontakta din administratör för hjälp.']").click();
        } else {
            await expect(this.page.locator("//span[text()='Forecast Opportunity Link Name']//..//..//..//lightning-formatted-text")).toContainText('FOL-0');
            await expect(this.page.locator("//span[text()='Continuation Sales Amount']//..//..//..//lightning-formatted-text")).toContainText(TestData.get("ContinuationSalesAmount"));
            await expect(this.page.locator("//span[text()='New Sales Amount']//..//..//..//lightning-formatted-text")).toContainText(TestData.get("NewSalesAmount"));
            await expect(this.page.locator("//span[text()='Sales Value Amount']//..//..//..//lightning-formatted-text")).toContainText(TestData.get("SalesValueAmount"));
            await expect(this.page.locator("//span[text()='Probability (%)']//..//..//..//lightning-formatted-number")).toContainText(TestData.get("Probability"));
            await expect(this.page.locator("//span[text()='Weighted New Sales Amount']//..//..//..//lightning-formatted-text")).toContainText(TestData.get("WeightedNewSalesAmount"));
            await expect(this.page.locator("//span[text()='Weighted Continuation Sales Amount']//..//..//..//lightning-formatted-text")).toContainText(TestData.get("WeightedContinuationSalesAmount"));
            await expect(this.page.locator("//span[text()='Uppsida New Sales']//..//..//..//lightning-formatted-text")).toContainText(TestData.get("UppsidaNewSales"));
            await expect(this.page.locator("//span[text()='Uppsida Continuation Sales']//..//..//..//lightning-formatted-text")).toContainText(TestData.get("UppsidaContinuationSales"));
            await this.page.locator("//span[text()='Opportunity']//..//..//..//a[contains(normalize-space(.),'" + TestData.get("OpportunityName") + "')]").click();
        }
    }


    async verifySellerName(TestData, utilityFunction) {
        if (TestData.get("Profile") == "SME" || TestData.get("Profile") == "SOHO") {
            var sellerName = await utilityFunction.RunSOQLQuery("select Name from Seller__c where Seller_Name__c = '" + TestData.get("SalesRepUser") + "' and End_Date__c > TODAY ");
        } else if (TestData.get("Profile") == "Large" || TestData.get("Profile") == "Service" || TestData.get("Profile") == "Solution") {
            var userID = await utilityFunction.RunSOQLQuery("select Account_Owner_ID__c from Account where Org_Nr__c = '" + TestData.get("OrgNumber") + "'");
            var userName = await utilityFunction.RunSOQLQuery("select Name from user where id = '" + userID + "'");
            var sellerName = await utilityFunction.RunSOQLQuery("select Name from Seller__c where Seller_Name__c = '" + userName + "' and End_Date__c > TODAY ");
        }
        console.log(sellerName);
        await expect(this.page.locator("//span[text()='Commitansvarig']//..//..//..//a")).toContainText(sellerName);
    }



    async VerifyOfferDocOnOpportunity(OpportunityID, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        await this.page.locator("//a[@data-label='Filer']").click();
        await this.page.locator("//span[contains(@title,'Offert ') and contains(text(),'_Telia_') and contains(text(),'.docx')]").first().hover();
    }



    async performEsigningOnOpportunity(TestData, utilityFunction, OpportunityID) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        if (TestData.get("OrgType") === "SOHO") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[text()='Skicka dokument för e-signering']").click();
            //await this.page.getByLabel('Ladda upp filerEller släpp').setInputFiles('./resources/TestDataFiles/Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet.pdf');
        }
        else if (TestData.get("OrgType") === "LARGE") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//li[contains(@class,'dropdown')]//button[contains(@class,'button')]").click();
            await this.page.locator("//a[normalize-space(.)='Skicka dokument för e-signering']").click();
        }
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Ladda upp dokument']//..//label[contains(normalize-space(.),'Ladda upp filerEller släpp')]").setInputFiles('./resources/TestDataFiles/Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet.pdf');
        await this.page.locator("//span[text()='Klart']//parent::button").click();
        await this.page.locator("//input[contains(@id,'checkbox')]//parent::span//span[@class='slds-radio_faux']").click();
        if ("OpportunityAvtalEsigning" === TestData.get("SalesFlowType")) {
            await this.page.locator("//button[@name='documentTypes']/span").click();
            await this.page.locator("//lightning-base-combobox[@class='slds-combobox_container']//span[text()='Avtal']").click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Produktområde']").first().click();
            await this.page.getByText('Business Networking').click();
            await this.page.getByLabel('*Startdatum Avtal').click();
            await this.page.getByRole('button', { name: 'Nästa månad' }).click();
            await this.page.getByRole('button', { name: '18' }).click();
            await this.page.getByLabel('*Slutdatum Avtal').click();
            await this.page.getByRole('button', { name: 'Nästa månad' }).click();
            await this.page.getByRole('button', { name: 'Nästa månad' }).click();
            await this.page.getByRole('button', { name: '18' }).click();
            await this.page.getByLabel('*Avtalsnummer').fill('111111');
            await this.page.getByLabel('Notering för arkivering').fill('Test Notering för arkivering');
            await this.page.locator("//lightning-datatable[@class='contactsTable']//input[contains(@id,'checkbox')]//..//span[@class='slds-checkbox_faux']").first().click();
            await this.page.getByRole('button', { name: 'Vidare till e-signering' }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Draft']").click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Delivery']//following-sibling::td[text()='Email']").click();
            await this.cartFrameScrive.getByRole('cell', { name: 'frame_agreement' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'internet_business_networking' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
            await this.cartFrameScrive.getByRole('cell', { name: '111111' }).click();
            await this.cartFrameScrive.getByRole('link', { name: 'Skicka' }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Sent']").click();
            await this.cartFrameScrive.getByRole('cell', { name: 'frame_agreement' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'internet_business_networking' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
            await this.cartFrameScrive.getByRole('cell', { name: '111111' }).click();

        } else if ("OpportunityFullmaktEsigning" === TestData.get("SalesFlowType")) {
            await this.page.locator("//button[@name='documentTypes']/span").click();
            await this.page.locator("//lightning-base-combobox[@class='slds-combobox_container']//span[text()='Fullmakt']").click();
            await this.page.getByLabel('Notering för arkivering').fill('Test Notering för arkivering');
            await this.page.locator("//lightning-datatable[@class='contactsTable']//input[contains(@id,'checkbox')]//..//span[@class='slds-checkbox_faux']").first().click();
            await this.page.getByRole('button', { name: 'Vidare till e-signering' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'service_agreemen' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Draft']").click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Delivery']//following-sibling::td[text()='Email']").click();
            await this.cartFrameScrive.getByRole('link', { name: 'Skicka' }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Sent']").click();
            await this.cartFrameScrive.getByRole('cell', { name: 'service_agreemen' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
        }
        await this.cartFrameScrive.locator("//table//td[text()='Affärsmöjlighet']//..//td/a").click();
        if (TestData.get("OrgType") === "SOHO") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Product Items']//..//..//..//lightning-formatted-text").click();
        }
        else if (TestData.get("OrgType") === "LARGE") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Avslutsdatum']//..//..//..//lightning-formatted-text").click();
        }
        await this.page.locator("//article[@aria-label='Scrive Dokument']//a//span[contains(normalize-space(.),'Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet')]").first().hover();
    }



    async performEsigningOnAccount(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontonamn']//..//..//..//lightning-formatted-text").click();
        const button = await this.page.locator("//a[contains(normalize-space(.),'Scrive Dokument') and contains(normalize-space(.),'(0)')]").count();
        if (!button) {
            await this.page.locator("//article[@aria-label='Scrive Dokument']//span[text()='Visa åtgärder']//ancestor::button").first().click();
            await this.page.getByRole('menuitem', { name: 'Ta bort' }).click();
            await this.page.getByText('Är du säker på att du vill ta').click();
            await this.page.getByRole('button', { name: 'Ta bort' }).click();
            await this.page.getByRole('link', { name: 'Scrive Dokument (0)' }).hover();
            await this.page.reload();
        }
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[text()='Skicka dokument för e-signering']").click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Ladda upp dokument']//..//label[contains(normalize-space(.),'Ladda upp filerEller släpp')]").setInputFiles('./resources/TestDataFiles/Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet.pdf');
        await this.page.locator("//span[text()='Klart']//parent::button").click();
        await this.page.locator("//input[contains(@id,'checkbox')]//parent::span//span[@class='slds-radio_faux']").click();
        if ("AccountAvtalEsigning" === TestData.get("SalesFlowType")) {
            await this.page.locator("//button[@name='documentTypes']/span").click();
            await this.page.locator("//lightning-base-combobox[@class='slds-combobox_container']//span[text()='Avtal']").click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Produktområde']").first().click();
            await this.page.getByText('Business Networking').click();
            await this.page.getByLabel('*Startdatum Avtal').click();
            await this.page.getByRole('button', { name: 'Nästa månad' }).click();
            await this.page.getByRole('button', { name: '18' }).click();
            await this.page.getByLabel('*Slutdatum Avtal').click();
            await this.page.getByRole('button', { name: 'Nästa månad' }).click();
            await this.page.getByRole('button', { name: 'Nästa månad' }).click();
            await this.page.getByRole('button', { name: '18' }).click();
            await this.page.getByLabel('*Avtalsnummer').fill('111111');
            await this.page.getByLabel('Notering för arkivering').fill('Test Notering för arkivering');
            await this.page.locator("//lightning-datatable[@class='contactsTable']//input[contains(@id,'checkbox')]//..//span[@class='slds-checkbox_faux']").first().click();
            await this.page.getByRole('button', { name: 'Vidare till e-signering' }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Draft']").click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Delivery']//following-sibling::td[text()='Email']").click();
            await this.cartFrameScrive.getByRole('cell', { name: 'frame_agreement' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'internet_business_networking' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
            await this.cartFrameScrive.getByRole('cell', { name: '111111' }).click();
            await this.cartFrameScrive.getByRole('link', { name: 'Skicka' }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Sent']").click();
            await this.cartFrameScrive.getByRole('cell', { name: 'frame_agreement' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'internet_business_networking' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
            await this.cartFrameScrive.getByRole('cell', { name: '111111' }).click();

        } else if ("AccountFullmaktEsigning" === TestData.get("SalesFlowType")) {
            await this.page.locator("//button[@name='documentTypes']/span").click();
            await this.page.locator("//lightning-base-combobox[@class='slds-combobox_container']//span[text()='Fullmakt']").click();
            await this.page.getByLabel('Notering för arkivering').fill('Test Notering för arkivering');
            await this.page.locator("//lightning-datatable[@class='contactsTable']//input[contains(@id,'checkbox')]//..//span[@class='slds-checkbox_faux']").first().click();
            await this.page.getByRole('button', { name: 'Vidare till e-signering' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'service_agreemen' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Draft']").click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Delivery']//following-sibling::td[text()='Email']").click();
            await this.cartFrameScrive.getByRole('link', { name: 'Skicka' }).click();
            await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Status']//following-sibling::td[text()='Sent']").click();
            await this.cartFrameScrive.getByRole('cell', { name: 'service_agreemen' }).click();
            await this.cartFrameScrive.getByRole('cell', { name: 'Test Notering för arkivering', exact: true }).click();
        }
        await this.cartFrameScrive.locator("//table//td[text()='Konto']//following-sibling::td/a").click();
        await this.page.locator("//article[@aria-label='Scrive Dokument']//a//span[contains(normalize-space(.),'Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet')]").first().hover();
        await this.page.locator("//article[@aria-label='Scrive Dokument']//span[text()='Visa åtgärder']//ancestor::button").first().click();
        await this.page.getByRole('menuitem', { name: 'Ta bort' }).click();
        await this.page.getByText('Är du säker på att du vill ta').click();
        await this.page.getByRole('button', { name: 'Ta bort' }).click();
        await this.page.locator("//a[contains(normalize-space(.),'Scrive Dokument') and contains(normalize-space(.),'(')]").hover();
    }



    async verifyOngoingOrderHistoryOnAccount(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
        //Verify Order status information text and filteration
        await this.page.getByRole('tab', { name: 'Ordrar', exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status' and @data-value= 'Alla']").first().click();
        await this.page.getByRole('option', { name: 'Pågående' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Status: Pågående - Försäljningsordern bearbetas av Telia.');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('UAT-00049693Jobbmobil 50 GBPågåendeNy2023-12-18Marcus Danielssonmarcus.danielsson@teliacompany.comOptMyBusiness');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status' and @data-value= 'Pågående']").first().click();
        await this.page.getByRole('option', { name: 'Avslutad' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Status: Avslutad - Försäljningsordern är levererad och stängd utan ytterligare åtgärder.');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status' and @data-value= 'Avslutad']").first().click();
        await this.page.getByRole('option', { name: 'Ofullständig' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Status: Ofullständig - Försäljningsordern inväntar information från kunden.');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status' and @data-value= 'Ofullständig']").first().click();
        await this.page.getByRole('option', { name: 'Levererad' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Status: Levererad - Försäljningsordern har levererats till kunden.');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status' and @data-value= 'Levererad']").first().click();
        await this.page.getByRole('option', { name: 'Mottagen' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Status: Mottagen - Försäljningsordern är mottagen av Telia.');
        await this.page.getByRole('button', { name: 'Rensa Filter' }).click();
        //Verify Ordertyp information text and filteration
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ordertyp' and @data-value= 'Alla']").first().click();
        await this.page.getByText('Flytt', { exact: true }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Ordertyp: Flytt - En förflyttningsorder är en begäran från en kund till Telia om att flytta befintliga tjänster till en ny plats.');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ordertyp']").first().click();
        await this.page.getByRole('option', { name: 'Inportering' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Inportering - En porteringsorder är en begäran från en kund till Telia om att flytta befintliga tjänster från nuvarande operatör till Telia.');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ordertyp']").first().click();
        await this.page.getByRole('option', { name: 'Överföring' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Överföring - En överföringsorder är en begäran från en kund till Telia om att överföra ägande av befintliga tjänster från nuvarande kund till en ny kund.');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ordertyp' and @data-value= 'Överföring']").first().click();
        await this.page.getByRole('option', { name: 'Ny' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Ordertyp: Ny - En ny försäljningsorder är en begäran från en kund till Telia om att leverera ett angivet antal produkter eller tillhandahålla en tjänst vid en viss tidpunkt för t.ex. mobilabonnemang, tilläggstjänster mm.');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('CH-35105786Nokia FastMile 4G Receiver (4G05-B)WM VitPågåendeNy2022-05-23ColtSE CustomerCare B2B');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).not.toContainText('UAT-00050064Klicka härJobbmobil 120 GBPågåendeÄndring2024-02-11Martin Hedbãâ¤ckmartin.hedback@teliacompany.comOptMyBusiness');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ordertyp' and @data-value= 'Ny']").first().click();
        await this.page.getByRole('option', { name: 'Ändring' }).click();
        await expect(this.page.locator('c-mc-b2-b-order-display')).toContainText('Ordertyp: Ändring - En förändringsorder är en begäran från en kund till Telia om att modifiera befintliga tjänster genom att lägga till / ta bort / eller uppdatera en angiven tjänst.');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('UAT-00050064Klicka härJobbmobil 120 GBPågåendeÄndring2024-02-11Martin Hedbãâ¤ckmartin.hedback@teliacompany.comOptMyBusiness');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).not.toContainText('CH-35105786Nokia FastMile 4G Receiver (4G05-B)WM VitPågåendeNy2022-05-23ColtSE CustomerCare B2B');
        await this.page.getByRole('button', { name: 'Rensa Filter' }).click();
        //Verify Ordernummer and filteration
        await this.page.locator("//input[@placeholder='Enter Ordernummer']").fill("UAT-00050064");
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('UAT-00050064Klicka härJobbmobil 120 GBPågåendeÄndring2024-02-11Martin Hedbãâ¤ckmartin.hedback@teliacompany.comOptMyBusiness');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).not.toContainText('CH-35105786Nokia FastMile 4G Receiver (4G05-B)WM VitPågåendeNy2022-05-23ColtSE CustomerCare B2B');
        await this.page.getByRole('button', { name: 'Rensa Filter' }).click();
        //Verify Produkt and filteration
        await this.page.locator("//input[@placeholder='Enter Produkt']").fill("Nokia");
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('CH-35105786Nokia FastMile 4G Receiver (4G05-B)WM VitPågåendeNy2022-05-23ColtSE CustomerCare B2B');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).not.toContainText('UAT-00050064Klicka härJobbmobil 120 GBPågåendeÄndring2024-02-11Martin Hedbãâ¤ckmartin.hedback@teliacompany.comOptMyBusiness');
        await this.page.getByRole('button', { name: 'Rensa Filter' }).click();
        //Verify clear filter functionality
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('NavigeringslägeÅtgärdslägeSortera efter:OrdernummerSorterat: IngaVisa Ordernummer kolumnåtgärderSortera efter:DetaljerSorterat: IngaSortera efter:ProduktSorterat: IngaVisa Produkt kolumnåtgärderSortera efter:StatusSorterat: IngaVisa Status kolumnåtgärderSortera efter:OrdertypSorterat: IngaVisa Ordertyp kolumnåtgärderSortera efter:Utlovat leveransdatumSorterat: IngaVisa Utlovat leveransdatum kolumnåtgärderSortera efter:Önskat leveransdatumSorterat: IngaVisa Önskat leveransdatum kolumnåtgärderSortera efter:Faktiskt leveransdatumSorterat: IngaVisa Faktiskt leveransdatum kolumnåtgärderSortera efter:BeställareSorterat: IngaVisa Beställare kolumnåtgärderSortera efter:Beställare epostSorterat: IngaVisa Beställare epost kolumnåtgärderSortera efter:KällsystemSorterat: IngaVisa Källsystem kolumnåtgärderSortera efter:KanalSorterat: IngaVisa Kanal kolumnåtgärder');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('ColtSE CustomerCare B2B');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('OptMyBusiness');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('Madam');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('Spock');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('GsmahsGSMAHS');
        //await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('GsmahsTelefon kund');
        //await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('GsmahsDirekt kund');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('UAT-00049693Jobbmobil 50 GBPågåendeNy2023-12-18Marcus Danielssonmarcus.danielsson@teliacompany.comOptMyBusiness');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('UAT-00049688Jobbmobil 50 GBPågåendeNy2023-12-18Marcus Danielssonmarcus.danielsson@teliacompany.comOptMyBusiness');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('UAT-00050064Klicka härJobbmobil 120 GBPågåendeÄndring2024-02-11Martin Hedbãâ¤ckmartin.hedback@teliacompany.comOptMyBusiness');
        await expect(this.page.locator("//flexipage-component2[@data-component-id='c_mcB2BOrderDisplay']//lightning-datatable")).toContainText('CH-35105786Nokia FastMile 4G Receiver (4G05-B)WM VitPågåendeNy2022-05-23ColtSE CustomerCare B2B');
        //Verify download excel functionality
        const page1Promise = this.page.waitForEvent('popup');
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', { name: 'Ladda ner som Excel' }).click();
        const page1 = await page1Promise;
        const download = await downloadPromise;
        //Verify MyB Ordrar Uppsägning tab
        //await this.page.locator("//a[contains(normalize-space(.),'MyB Ordrar Uppsägning')]").first().click();
        //await this.page.locator("//a[contains(normalize-space(.),'Tjänster uppsagda via MyBusiness')]").first().click();
        //await expect(this.page.locator("//div[contains(@class,'normal')]//table[@aria-label='Tjänster uppsagda via MyBusiness']")).toContainText('Frida Bennerman');
        //await expect(this.page.locator("//div[contains(@class,'normal')]//table[@aria-label='Tjänster uppsagda via MyBusiness']")).toContainText('Jobbmobil');
    }



    async performMobilHWPrislistForContractOnOpportunity(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const OpportunityID = await utilityFunction.RunSOQLQuery("select id from opportunity where Account_Org_Nr__c = '" + TestData.get("OrgNumber") + "' and Name = '" + TestData.get("OpportunityName") + "'");
        for (let iteration = 0; iteration <= 10; iteration++) {
            const documentIDs = await utilityFunction.RunSOQLQuery("SELECT Id FROM ContentDocumentLink WHERE LinkedEntityId = '" + OpportunityID + "'");
            let documentIDIsNotNullOrEmpty = Boolean(documentIDs);
            if (documentIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("ContentDocumentLink", documentIDs);
            }
            if (!documentIDIsNotNullOrEmpty) {
                break;
            }
        }
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Opportunity/" + OpportunityID + "/view");
        await this.page.getByRole('button', { name: 'Visa fler åtgärder' }).click();
        await this.page.getByRole('menuitem', { name: 'Prislista mobil hårdvara' }).click();
        await this.page.getByRole('heading', { name: 'Skapa prislista för mobil hå' }).click();
        if ("HWPrislistForDraftContract" === TestData.get("SalesFlowType")) {
            await expect(this.page.getByRole('paragraph')).toContainText('Vill du fortsätta med Salesforceavtalet (');
            await expect(this.page.getByRole('paragraph')).toContainText(') som ligger i status (Draft)?');
            await this.page.getByText('Ja', { exact: true }).click();
        } else if ("HWPrislistForActiveContract" === TestData.get("SalesFlowType")) {
            await this.page.locator("//h2[normalize-space(.)='Välj aktivt ramavtal']").click();
            await this.page.locator("//vlocity_cmt-omniscript-custom-lwc//span[@class='slds-checkbox_faux']").first().click();
        }
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        await this.page.getByRole('heading', { name: 'Välj bindningstid' }).click();
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        await this.page.getByText('Kunden har subventionerade').click();
        var Product = (TestData.get("Products")).split(";");
        for (let i = 0; i < Product.length; i++) {
            await this.page.getByText(Product[i], { exact: true }).click();
        }
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByText('Välj minst ett abonnemang för').click();
        await this.page.getByText(Product[0], { exact: true }).click();
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        var HWSubProduct = (TestData.get("HWSubProducts")).split(";");
        for (let i = 0; i < HWSubProduct.length; i++) {
            await this.page.getByText(HWSubProduct[i], { exact: true }).click();
        }
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        var HWAccessory = (TestData.get("HWAccessories")).split(";");
        for (let i = 0; i < HWAccessory.length; i++) {
            await this.page.getByText(HWAccessory[i], { exact: true }).click();
        }
        await this.page.getByText('Vänligen välj tillbehör som ö').click();
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        await this.page.getByRole('heading', { name: 'Välj hur priserna skall' }).click();
        await this.page.getByText('Engångskostnad', { exact: true }).click();
        await this.page.getByText('Månadsavgift').click();
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        await this.page.getByRole('heading', { name: 'Visa prislista' }).click();
        for (let i = 1; i < Product.length; i++) {
            await expect(this.page.getByRole('table')).toContainText(Product[i]);
        }
        for (let i = 0; i < HWSubProduct.length; i++) {
            await expect(this.page.getByRole('table')).toContainText(HWSubProduct[i]);
        }
        await expect(this.page.getByRole('table')).toContainText('7756 kr');
        await expect(this.page.getByRole('table')).toContainText('9590.4 kr');
        await this.page.getByRole('button', { name: 'Fortsätt' }).click();
        await this.cartFrameScrive.getByRole('heading', { name: 'Ditt prisförslag genereras,' }).click();
/*      //LTAT-32328 - SFI upgrade Document generation issue
        await this.cartFrameScrive.getByRole('heading', { name: 'Generera Offertdokument' }).click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.cartFrameScrive.frameLocator('#obj-doc-creation-docx-os-iframe').getByRole('button', { name: 'Download PDF Download PDF' }).click();
        const download = await downloadPromise;
        await this.cartFrameScrive.frameLocator('#obj-doc-creation-docx-os-iframe').frameLocator('iframe[title="webviewer"]').locator('#pageWidgetContainer1').click();
        await this.cartFrameScrive.getByRole('button', { name: 'Checka In' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Affärsnummer']//..//..//..//lightning-formatted-text").click();
        await expect(this.page.getByLabel('Filer', { exact: true }).getByRole('list')).toContainText('Prisförslag - Mobiler och tillbehör.pdf');
        await expect(this.page.getByLabel('Filer', { exact: true }).getByRole('list')).toContainText('Prisförslag - Mobiler och tillbehör.docx'); */
    }



    async createCRMFiberLead(TestData, utilityFunction) {
        const accountName = await utilityFunction.RunSOQLQuery("select Name from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        const LeadFirstName = "LeadFirstName" + Math.floor(Math.random() * 90000 + 10000);
        const LeadLastName = "LeadLastName" + Math.floor(Math.random() * 90000 + 10000);
        const LeadName = LeadFirstName + " " + LeadLastName;
        const LeadPhoneNumber = "+467250" + Math.floor(Math.random() * 90000 + 10000);
        await this.page.getByRole('link', { name: 'Leads', exact: true }).click();
        await this.page.getByRole('button', { name: 'New' }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.getByLabel('First Name').fill(LeadFirstName);
        await this.page.getByLabel('*Last Name').fill(LeadLastName);
        await this.page.getByLabel('Phone').fill(LeadPhoneNumber);
        await this.page.getByLabel('Mobile').fill(LeadPhoneNumber);
        await this.page.getByLabel('Email', { exact: true }).click();
        await this.page.getByLabel('Email', { exact: true }).fill(LeadFirstName + "@" + LeadLastName + ".com");
        await this.page.getByLabel('*Company').fill(accountName);
        await this.page.getByLabel('Org. nr').fill((TestData.get("OrgNumber")).toString());
        await this.page.getByLabel('*Lead Source').selectOption('Externt event');
        await this.page.getByLabel('Product Area').selectOption('Fastighetsnät (NEXT)');
        await this.page.locator("//input[@name = 'save']").first().click();
        await this.page.locator("//td[text()='Lead Owner']//following-sibling::td//a[text()='[Change]']").click();
        await this.page.locator("//input[@title='Owner name']").type(TestData.get("SalesRepUser"));
        await this.page.locator("//input[@name = 'save']").first().click();
        await this.page.locator("//td[text()='Name']//following-sibling::td//div[contains(text(),'" + LeadFirstName + "')]").click();
        const LeadID = await utilityFunction.RunSOQLQuery("select id from lead where name= '" + LeadName + "'");
        return [LeadName, LeadID];
    }



    async convertCRMFiberLeadIntoOpportunity(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const accountName = await utilityFunction.RunSOQLQuery("select Name from account where Org_Nr__c= '" + TestData.get("OrgNumber") + "'");
        const opportunityName = accountName + " - " + TestData.get("LeadName");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Lead/" + TestData.get("LeadID") + "/view");
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadstatus']//..//..//..//lightning-formatted-text[text()='Nytt']").click();
        await this.page.getByRole('button', { name: 'Markera Status som färdig(t)' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadstatus']//..//..//..//lightning-formatted-text[text()='Kvalificera']").click();
        //await this.page.getByLabel('Leadsinformation').getByRole('button', { name: 'Redigera Leadstatus' }).click();
        //await this.page.locator("//input[@name='Customer_Contacted__c']").click();
        //await this.saveButton.click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadstatus']//..//..//..//lightning-formatted-text[text()='Kvalificera']").click();
        await this.page.getByRole('button', { name: 'Visa fler åtgärder' }).click();
        await this.page.getByRole('menuitem', { name: 'Ny' }).click();
        await this.page.getByLabel('*Namn köpintresse').fill('FIBER');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Leadkälla']").first().click();
        await this.page.getByTitle('Sales Rep', { exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status']").first().click();
        await this.page.getByLabel('Skapa Köpintresse: Telia Buy').getByText('Kvalificera').click();
        await this.saveButton.click();
        await this.page.waitForTimeout(2000);
        await this.page.locator("//a[contains(normalize-space(.),'FIBER')]").first().click();
        await this.page.waitForTimeout(2000);
        await this.page.reload();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@title='Logga samtal']").first().click();
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Spara' }).click();
        await this.page.waitForTimeout(20000);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Lead']//..//..//..//a[contains(normalize-space(.), '" + TestData.get("LeadName") + "')]").first().click();
        await this.page.waitForTimeout(5000);
        await this.page.locator("//button[text()='Konvertera']").click();
        await this.page.waitForTimeout(5000);
        await this.page.locator("//div[contains(@class,'cLeadConvertAction')]//button[text()='Konvertera']").click();
        //await this.page.locator("//div[@class='quick-actions-panel']//button[text()='Save']").click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Affärsmöjlighetsnamn']//..//..//..//lightning-formatted-text[text()='" + opportunityName + "']").click();
        TestData.set("OpportunityName", opportunityName);
        await this.page.locator("//button[text()='Redigera']").click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Varumärke']").first().click();
        await this.page.getByText(TestData.get("Varumarke"), { exact: true }).click();
        await this.page.getByLabel('*Intäkter NS').fill('100');
        await this.page.getByLabel('*Intäkter CS').fill('200');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Adresstyp']").first().click();
        await this.page.getByText('MDU').click();
        await this.page.getByRole('textbox', { name: 'Antal fastigheter' }).fill('300');
        await this.page.getByRole('textbox', { name: 'Antal portar' }).fill('400');
        await this.page.getByRole('textbox', { name: 'Antal hushåll' }).fill(TestData.get("AntalHushall").toString());
        await this.page.getByRole('textbox', { name: '*Fastighetsbeteckning' }).fill('ABCD');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Kommun']").first().click();
        await this.page.getByText('Ale', { exact: true }).click();
        await this.page.getByRole('textbox', { name: 'HERA/FMO' }).fill('HERAFMO');
        const todaysDate = await utilityFunction.TodaysDate();
        await this.page.getByLabel('Önskat leveransdatum').type(todaysDate);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Fastighetsnät']").first().click();
        await this.page.getByText('Befintligt Fastighetsnät FTTB', { exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nyproduktion']").first().click();
        await this.page.getByRole('option', { name: 'Ja' }).locator('span').nth(1).click();
        await this.page.getByRole('textbox', { name: '*Fastighetsbeteckning' }).fill('ABCD');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Fastighetsnät']").first().click();
        await this.page.getByText('Telia bygger Fastighetsnät').click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Switchbyte']").first().click();
        await this.page.getByRole('option', { name: 'Ja' }).getByText('Ja').click();
        await this.saveButton.click();
    }



    async verifyOpportunityClosedDate(TestData, utilityFunction) {
        const todaysDate = await utilityFunction.TodaysDate();
        await expect(this.page.locator("//records-record-layout-item//span[text()='Avslutsdatum']//..//..//..//lightning-formatted-text")).toHaveText(todaysDate);
    }



    async createTeliaLead(TestData, utilityFunction) {
        const accountName = await utilityFunction.RunSOQLQuery("select Name from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        const LeadFirstName = "LeadFirstName" + Math.floor(Math.random() * 90000 + 10000);
        const LeadLastName = "LeadLastName" + Math.floor(Math.random() * 90000 + 10000);
        const LeadName = LeadFirstName + " " + LeadLastName;
        const LeadPhoneNumber = "+467250" + Math.floor(Math.random() * 90000 + 10000);
        if (TestData.get("Profile") == "Cygate") {
            await this.page.goto("http://go.pardot.com/l/282162/2016-12-07/pht");
            await this.page.getByLabel('Förnamn *', { exact: true }).fill(LeadFirstName);
            await this.page.getByLabel('Efternamn *', { exact: true }).fill(LeadLastName);
            await this.page.getByLabel('E-post *').fill(LeadFirstName + LeadLastName + "@teliacompany.com");
            await this.page.getByLabel('Telefon *', { exact: true }).fill(LeadPhoneNumber);
            await this.page.getByLabel('Företagsnamn *').fill(accountName);
            await this.page.getByLabel('Orgnr *').fill((TestData.get("OrgNumber")).toString());
            await this.page.getByLabel('Produktområde *').selectOption('11076');
            await this.page.getByLabel('ÅF-nummer *').fill('12345');
            await this.page.getByLabel('Tholbox Id *').fill('AB1234');
            await this.page.getByLabel('AVSÄNDARE:Förnamn *').fill(TestData.get("SalesRepUser"));
            await this.page.getByLabel('AVSÄNDARE:Efternamn *').fill('user');
            await this.page.getByLabel('AVSÄNDARE:Telefon *').fill('+46725048762');
            await this.page.getByRole('button', { name: 'Skicka' }).click();
            await expect(this.page.getByRole('paragraph')).toContainText('Tack! Ditt lead har skickats till Telias säljorganisation.');
        } else {
            await this.page.goto("http://go.pardot.com/l/282162/2016-12-07/phr");
            await this.page.waitForTimeout(5000);
            await this.page.getByLabel('LEAD:Förnamn *').fill(LeadFirstName);
            await this.page.getByLabel('Efternamn *', { exact: true }).fill(LeadLastName);
            await this.page.getByLabel('E-post *').fill(LeadFirstName + LeadLastName + "@teliacompany.com");
            await this.page.getByLabel('Telefon *', { exact: true }).fill(LeadPhoneNumber);
            if (TestData.get("Profile") == "Large") {
                await this.page.getByLabel('Företagsnamn *').fill("Test");
            } else {
                await this.page.getByLabel('Företagsnamn *').fill(accountName);
            }
            await this.page.getByLabel('Produktområde *').selectOption('11056');
            await this.page.getByLabel('AVSÄNDARE:Förnamn *').fill(TestData.get("SalesRepUser"));
            await this.page.getByLabel('AVSÄNDARE:Efternamn *').fill('user');
            await this.page.getByLabel('AVSÄNDARE:Telefon *').fill('+46725048762');
            await this.page.getByRole('button', { name: 'Skicka' }).click();
        }
        var LeadID = null;
        var timer = 1;
        while (!Boolean(LeadID)) {
            LeadID = await utilityFunction.RunSOQLQuery("select id from lead where name= '" + LeadName + "'");
            await this.page.waitForTimeout(1000);
            timer++;
            if (timer > 600) {
                console.log("Pardot Lead is not synced with Salesforce due to timeout - " + LeadName);
                break;
            }
        }
        TestData.set("LeadID", LeadID);
        TestData.set("LeadName", LeadName);
        return [LeadName, LeadID];
    }


    async changeTeliaLeadOwner(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL") + "/" + TestData.get("LeadID"));
        await this.page.locator("//td[text()='Lead Owner']//following-sibling::td//a[text()='[Change]']").click();
        await this.page.locator("//input[@title='Owner name']").fill(TestData.get("SalesRepUser"));
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.locator("//td[text()='Lead Owner']").first().click();
    }


    async convertTeliaLeadIntoOpportunity(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const accountName = await utilityFunction.RunSOQLQuery("select name from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Lead/" + TestData.get("LeadID") + "/view");
        if (TestData.get("Profile") == "Large") {
            await this.page.getByRole('button', { name: 'Redigera Konto' }).click();
            await this.page.getByRole('button', { name: 'Rensa val' }).click();
            await this.searchAccountTextbox.click();
            await this.searchAccountTextbox.type(accountName, { delay: 300 });
            await this.page.getByRole('option', { name: accountName + " " + TestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.page.getByRole('button', { name: 'Spara' }).click();
        }
        if (TestData.get("Profile") == "SOHO") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[contains(@class,'main')]//a[text()='Detaljer']").first().click();
        }
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadstatus']//..//..//..//lightning-formatted-text[text()='Nytt']").click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Namn']//..//..//..//lightning-formatted-name[text()='" + TestData.get("LeadName") + "']").click();
        if (TestData.get("Profile") == "Cygate") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Cygate Lead')]").click();
        } else {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Standard Telia Lead')]").click();
        }
        await this.page.getByRole('button', { name: 'Konvertera' }).click();
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator("//span[@class='toastMessage forceActionsText']")).toContainText("Lead converted");
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//*[text()='Posttyp för affärsmöjlighet']//..//..//..//records-record-type[contains(normalize-space(.),'" + TestData.get("OpportunityRecordType") + "')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Affärsmöjlighetsnamn']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + accountName + " " + TestData.get("LeadName") + "')]").first().click();
    }


    async convertTeliaLeadIntoContact(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Lead/" + TestData.get("LeadID") + "/view");
        if (TestData.get("Profile") == "SOHO") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//div[contains(@class,'main')]//a[text()='Detaljer']").first().click();
        }
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadstatus']//..//..//..//lightning-formatted-text[text()='Nytt']").click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Namn']//..//..//..//lightning-formatted-name[text()='" + TestData.get("LeadName") + "']").click();
        if (TestData.get("Profile") == "Cygate") {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Cygate Lead')]").click();
        } else {
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Leadposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Standard Telia Lead')]").click();
        }
        await this.page.getByRole('button', { name: 'Konvertera' }).click();
        await this.page.locator("//span[text()='Konvertera endast till kontakt']//preceding-sibling::span[@class='slds-checkbox_faux']").first().click();
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator("//span[@class='toastMessage forceActionsText']")).toContainText("Lead converted");
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Namn']//..//..//..//lightning-formatted-name[contains(normalize-space(.),'" + TestData.get("LeadName") + "')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontaktstatus']//..//..//..//lightning-formatted-rich-text[contains(normalize-space(.),'Active')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontaktposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Customer Contact')]").first().click();
    }


    async verifyOpportunityContactRoleOnLeadConversion(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const accountName = await utilityFunction.RunSOQLQuery("select name from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        const opportunityid = await utilityFunction.RunSOQLQuery("SELECT id FROM Opportunity WHERE name = '" + accountName + " " + TestData.get("LeadName") + "'");
        const ContactId = await utilityFunction.RunSOQLQuery("SELECT Id FROM OpportunityContactRole WHERE OpportunityId = '" + opportunityid + "'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Contact/" + ContactId + "/view");
        await this.page.locator("//a[text()='" + TestData.get("LeadName") + "']").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Namn']//..//..//..//lightning-formatted-name[contains(normalize-space(.),'" + TestData.get("LeadName") + "')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontaktstatus']//..//..//..//lightning-formatted-rich-text[contains(normalize-space(.),'Active')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontaktposttyp']//..//..//..//records-record-type[contains(normalize-space(.),'Customer Contact')]").first().click();
    }


}
module.exports = { OpportunityPage };