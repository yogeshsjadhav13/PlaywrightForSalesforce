const { expect } = require('@playwright/test');


class QuotePage {


    constructor(page) {
        this.page = page;
        this.nextSwedishButton = this.page.getByRole('button', { name: 'Nästa' });
        this.cartFrame = this.page.frameLocator('iframe[name*="vfFrameId"][height*="100%"]').first();
        this.searchbutton = this.cartFrame.getByPlaceholder('Sök').first();
        // Quote Page objects
        this.cartSkapaOffertdokumentButton = this.cartFrame.locator("//button[@id='-import-btn' and (@title='Skapa offertdokument' or contains(text(),'Generate Offer Quote'))]");
        this.quoteSkapaOffertdokumentButton = this.page.getByRole('button', { name: ' Skapa offertdokument' });
        this.quoteKonfigureraButton = this.page.locator('button').filter({ hasText: 'Konfigurera' });
        this.quoteOffertnamnText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Offertnamn']//..//..//..//lightning-formatted-text");
        //Skapa Offertdokument type selection page
        this.quoteSkapaOffertdokumentWaitingMessage = this.page.getByText('Förebereder offert, var god dröj! Tiden att generera dokumentet kan variera bero');
        this.quoteDocumentTypeSelectionHeading = this.page.getByRole('heading', { name: 'VÄLJ MALL FÖR OFFERT' });
        this.quoteSwedishDocumentOptionText = this.page.getByText('Offert (Svenska)');
        this.quoteEnglishDocumentOptionText = this.page.getByText('Offert (Engelska)');
        this.quoteSwedishDocumentCheckbox = this.page.locator('label').filter({ hasText: 'Offert (Svenska)' }).locator('span').first();
        this.quoteEnglishDocumentCheckbox = this.page.locator('label').filter({ hasText: 'Offert (Engelska)' }).locator('span').first();
        //Skapa offertdokument additional information text page
        this.ytterligareInformationHeading = this.page.getByRole('heading', { name: 'Ytterligare Information' });
        this.additionalInformationKundensbehovVerksamhetTextbox = this.page.locator('//label[normalize-space(.)="Kundens behov - Verksamhet"]//parent::div//parent::div//textarea');
        this.additionalInformationKundensbehovMobilabonnemangTextbox = this.page.locator('//label[normalize-space(.)="Kundens behov - Mobilabonnemang"]//parent::div//parent::div//textarea');
        this.additionalInformationKundensbehovVaxelTextbox = this.page.locator('//label[normalize-space(.)="Kundens behov - Växel"]//parent::div//parent::div//textarea');
        this.additionalInformationKundensbehovITTextbox = this.page.locator('//label[normalize-space(.)="Kundens behov - IT"]//parent::div//parent::div//textarea');
        this.additionalInformationLösningVerksamhetTextbox = this.page.locator('//label[normalize-space(.)="Lösning - Verksamhet"]//parent::div//parent::div//textarea');
        this.additionalInformationLösningMobilabonnemangTextbox = this.page.locator('//label[normalize-space(.)="Lösning - Mobilabonnemang"]//parent::div//parent::div//textarea');
        this.additionalInformationLösningVaxelTextbox = this.page.locator('//label[normalize-space(.)="Lösning - Växel"]//parent::div//parent::div//textarea');
        this.additionalInformationLosningITTextbox = this.page.locator('//label[normalize-space(.)="Lösning - IT"]//parent::div//parent::div//textarea');
        this.additionalInformationKommentareroffertTextbox = this.page.locator('//label[normalize-space(.)="Kommentarer offert"]//parent::div//parent::div//textarea');
        //Skapa offertdokument additonal offer selection page
        this.ytterligareerbjudandeinformationHeading = this.page.getByRole('heading', { name: 'Ytterligare erbjudandeinformation' });
        this.genereraOffertdokumentHeading = this.page.getByRole('heading', { name: 'Generera Offertdokument' });
        this.downloadWordButton = this.page.getByRole('button', { name: 'Ladda ner Word' });
        this.offerDocumentWordDocumentViewer = this.page.frameLocator('iframe[title="webviewer"]').locator('#pageWidgetContainer1');
        this.checkaInButton = this.page.getByRole('button', { name: 'Checka in' });
        this.opportunityFilerTab = this.page.getByRole('tab', { name: 'Filer' });
        this.opportunityOverigtTab = this.page.getByRole('tab', { name: 'Övrigt' });
        //Skapa avtal flow and respective page objects
        this.skapaAvtalButton = this.page.getByRole('button', { name: ' Skapa avtal' });
        this.skapaAvtalHeading = this.cartFrame.getByRole('heading', { name: 'Skapa avtal' });
        this.skapaAvtalDatesSelectionPageMessage1 = this.cartFrame.getByText('Börja med att välja startdatum (arbetsdagar) för de valda produkterna. Därefter ');
        this.skapaAvtalDatesSelectionPageMessage2 = this.cartFrame.getByText('Tidigaste startdatum från dagens datum:');
        //R23.04 - LTAT-25578 - Sales stop of TP Offering in AMANDA
        //this.skapaAvtalDatesSelectionPageMessage3 = this.cartFrame.getByText('Jobbmobil, Touchpoint, Nätverkstjänster - 15 arbetsdagar');
        this.skapaAvtalDatesSelectionPageMessage3 = this.cartFrame.getByText('Jobbmobil, Nätverkstjänster - 15 arbetsdagar');
        this.skapaAvtalDatesSelectionPageMessage4 = this.cartFrame.getByText('Touchpoint Plus - 20 arbetsdagar');
        this.skapaAvtalDatesSelectionPageMessage5 = this.cartFrame.getByText('IT-avdelning - 30 dagar');
        this.skapaAvtalDatesSelectionPageMessage6 = this.cartFrame.getByText('Slutanvändarsupport - 90 dagar');
        this.skapaAvtalDatesSelectionPageMessage7 = this.cartFrame.getByText('Övriga produkter - 5 arbetsdagar');
        this.skapaAvtalDatesSelectionPageMessage8 = this.cartFrame.getByText('-Tänk på att ta hänsyn till t.ex. inportering och välj ett realistiskt startdatu');
        this.skapaAvtalDatesSelectionPageMessage9 = this.cartFrame.getByText('-Tänk på att leverans av kundens växellösning är ett separat datum som kan bli s');
        this.skapaAvtalDatesSelectionPageMessage10 = this.cartFrame.getByText('-Startdatum för Jobbmobil bör alltid vara innan eller samtidigt som startdatum f');
        this.AlertOkButton = this.cartFrame.locator("//button[@id='alert-ok-button']").first();
        this.nextButtonInsideFrame = this.cartFrame.getByRole('button', { name: 'Nästa' });
        this.skapaAvtalAddUtilizerHeading = this.cartFrame.getByRole('heading', { name: 'Vill du lägga till nyttjare?' });
        this.skapaAvtalAddUtilizerNejCheckbox = this.cartFrame.locator("//input[@id='AddUtilizer']//following-sibling::span[text()='Nej']//preceding-sibling::span[contains(@class,'slds-radio--faux')]");
        this.skapaAvtalAddUtilizerJaCheckbox = this.cartFrame.locator("//input[@id='AddUtilizer']//following-sibling::span[text()='Ja']//preceding-sibling::span[contains(@class,'slds-radio--faux')]");
        this.skapaAvtalAddUtilizerMessage1 = this.page.getByRole('heading', { name: 'Lägg till Nyttjare till Ramavtal (Valfritt steg)' });
        this.skapaAvtalAddUtilizerSearchWithOrgNumberCheckbox = this.page.locator('label').filter({ hasText: 'Sök med organisationsnummer' }).locator('span').first();
        this.skapaAvtalAddUtilizerOrgNumberTextbox = this.page.getByRole('combobox', { name: 'ORGANISATIONSNUMMER' });
        this.skapaAvtalAddUtilizerFirstOption = this.page.locator("//span[text()='Namn' or text()='ORGANISATIONSNUMMER' or text()='Klicka för att lägga till fil']//parent::label//parent::div//following-sibling::div//div[@class='slds-form-element']//div[@role='option']/span/span[1]").first();
        this.skapaAvtalAddUtilizerMessage2 = this.page.getByText('OBS! Du kan inte lägga till konton som redan är kopplade till andra ramavtal i S');
        this.skapaAvtalAddiUtilizerResultHeading = this.page.getByRole('heading', { name: 'Resultat' });
        this.skapaAvtalAddiUtilizerResultMessage1 = this.page.getByText('Konto läggs till i ramavtalet.');
        this.skapaAvtalAddiUtilizerResultMessage2 = this.page.getByRole('paragraph').filter({ hasText: 'För att fortsätta klicka \'Nästa\'. Om du vill lägga till fler konto klickar du på' });
        this.skapaAvtalAreYouDonePageHeading = this.page.getByRole('heading', { name: 'Är du färdig?' });
        this.skapaAvtalAreYouDonePageMessage = this.page.locator('vlocity_cmt-omniscript-step').filter({ hasText: 'Klicka här för att se redan tillagda nyttjare på avtalet Om du väljer Ja, så ska' }).locator('slot').first();
        this.skapaAvtalTUPPSubscriptionCreationHeading = this.page.getByRole('heading', { name: 'Abonnemangsförändring' });
        this.skapaAvtalTUPPSubscriptionCreationMessage = this.page.getByText('Du måste hantera abonnemangsförändring i och med det nya avtalet, klicka här för');
        this.skapaAvtalTUPPSubscriptionGoToContractButton = this.page.getByRole('button', { name: 'Gå till kontraktet' });
        this.skapaAvtalTUPPInterfaceStatusSuccessful = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='TUPP Status']//..//..//..//lightning-formatted-text[text()='Successful']").first();
        this.skapaAvtalUtkastStatusText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Utkast']");
        this.skapaAvtalTUPPInterfaceNameText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='TUPP Info']//..//..//..//lightning-formatted-text");
        this.skapaAvtalMCSalesFlowIdentifierText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='MC sales flow identifier']//..//..//..//lightning-formatted-text");
        //Datepicker objects for vlocity fields
        this.datePickerNextMonthButton = this.cartFrame.locator("//div[@class='datepicker -right-top- -from-right- active'][1]/nav[@class='datepicker--nav']/div[@data-action='next']");
        this.datePickerFirstEnabledDate = this.cartFrame.locator("//div[@class='datepicker -right-top- -from-right- active'][1]//div[contains(@class,'datepicker--cell datepicker--cell-day') and not(contains(@class,'disabled'))][1]");

        //CRMFiber Quote fields
        this.QuoteBlakalkylEBITPercentageText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='EBIT Percentage']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevenuesText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Revenues']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylOPEXText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='OPEX']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylCapexInfraText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Capex Infra']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylKontraktsperiodYText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kontraktsperiod Y' or text()='Contract Term Y']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylUpsellText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Upsell']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylKollektivaIntakterText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kollektiva intäkter']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylPrisTVexklmomsText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Pris TV exkl moms']//..//..//..//lightning-formatted-text");
        this.QuoteBlakalkylRevenueB2BText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Revenue B2B']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevSmartBuildingServicesText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Rev. Smart Building Services']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevWiFiiAllmännautrText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Rev. WiFi i Allmänna utr.']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevMobileXsellText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Rev. Mobile X-sell']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylAccespunkterWiFiText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Accespunkter WiFi']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevenuecontractarligenText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Revenue contract årligen']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylACKDCFarligenText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='ACK DCF årligen']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylAsisACKDCFText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='As is ACK DCF']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylPrisBBexklmomsAsiscaseText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Pris BB exkl. moms As is case']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkyl3PlayPrisAsisexklmomsText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='3Play Pris As is exkl moms']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylForandringintaktnyttavtalText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Förändring intäkt nytt avtal']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylNathyrapassivportmanText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Näthyra passiv port/mån']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylKoncernincrcostEBITackText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Koncern incr cost EBIT ack %']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylDepreciationText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Depreciation']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylKundplaceradutrustningText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kundplacerad utrustning']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylACKDCFText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='ACK DCF']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylReturnOfInvestementText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Return Of Investement']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylPaybackYText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Payback Y']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylEngangFastighetsagareText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[contains(text(),'Engång Fastighetsägare')]//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylPrisBBexklmomsText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Pris BB exkl. moms']//..//..//..//lightning-formatted-text");
        this.QuoteBlakalkylRevenueB2CText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Revenue B2C']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylExternalRevenueINFRAText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='External Revenue INFRA']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevFastighetsITText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Rev. Fastighets IT']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevTeliaSmartHomeText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Rev. Telia Smart Home']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylByggnadermedFastighetsITText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Byggnader med Fastighets-IT']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylPris3PlayexklmomsText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Pris 3Play exkl moms']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylAsisavtalstidkvarText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='As is avtalstid kvar']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevAsiskvarvarandetidText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Rev As is kvarvarande tid']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylRevAsiskvarvtidarligenText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Rev As is kvarv. tid årligen']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylAsisACKDCFarligenText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='As is ACK DCF årligen']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylPrisTVexklmomsAsiscaseText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Pris TV exkl moms As is case']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylNathyraaktivportmanText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Näthyra aktiv port/mån']//..//..//..//lightning-formatted-number");
        this.QuoteBlakalkylFindersFeehushallText = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Finders Fee/hushåll']//..//..//..//lightning-formatted-number");

    }


    async performSkapaOffertdokumentOnMCSalesQuote(TestData, OpportunityName) {
        await this.page.reload();
        if (TestData.get("SkapaOfferDocFromCart") === "Yes") {
            await this.quoteKonfigureraButton.click();
            await this.searchbutton.click();
            await this.cartSkapaOffertdokumentButton.click();
        } else {
            await this.quoteSkapaOffertdokumentButton.click();
        }
        const Products = (TestData.get("Products")).split(";");
        var ITDaasFlag, ITSupportFlag, ConnectedOfficeFlag, TPPlusFlag;
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
            if (Products[iteration] === "TouchPoint Plus") {
                TPPlusFlag = "Yes";
            }
        }
        if (ITDaasFlag === "Yes") {
            await this.page.getByRole('heading', { name: 'GODKÄNNANDE FRÅN TAM' }).click();
            await this.page.getByText('Observera att en TAM måste ha godkänt en offert som innehåller IT-avdelning inna').click();
            //Defect is raised for english button label - B2XSET-307941
            await this.page.getByRole('button', { name: 'Nästa' }).click();
        }
        if (ConnectedOfficeFlag === "Yes") {
            //await this.page.getByRole('heading', { name: 'Gruppering Av Adresser' }).click();
            //await this.nextSwedishButton.click();
            await this.page.getByRole('heading', { name: 'Hera-Information' }).click();
            if ((TestData.get("COAddHeraInformation") === "Yes") && (TestData.get("COLeveranskontrollType") === "Manual")) {
                await this.page.locator('label').filter({ hasText: 'Ja' }).locator('span').first().click()
                const Address = (TestData.get("COAddresses")).split("|");
                for (let j = 0; j < (Address.length + Address.length); j++) {
                    await this.page.locator("//button[text()='Lägg till adress']").click();
                }
                let i = 0;
                for (i = 1; i <= Address.length; i++) {
                    const AddressDetails = Address[i - 1].split(";");
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//button[@name='siteAddressSelection']").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//span[contains(text(),'" + AddressDetails[0] + " - " + AddressDetails[2] + " - " + AddressDetails[3] + "')]").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//button[@name='heratype']").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//span[contains(text(),'Primär access')]").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//input[@name='rc']").fill("10");
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//input[@name='otc']").fill("100");
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//input[@name='heraNumber']").fill("1000");
                }
                let j = i;
                for (i; i <= (Address.length + Address.length); i++) {
                    const AddressDetails = Address[i - j].split(";");
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//button[@name='siteAddressSelection']").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//span[contains(text(),'" + AddressDetails[0] + " - " + AddressDetails[2] + " - " + AddressDetails[3] + "')]").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//button[@name='heratype']").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//span[contains(text(),'Sekundär')]").click();
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//input[@name='rc']").fill("20");
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//input[@name='otc']").fill("200");
                    await this.page.locator("//vlocity_cmt-omniscript-custom-lwc[@data-omni-key='PremiseTableLWC']//table/tbody/tr[" + i + "]/td//input[@name='heraNumber']").fill("2000");
                }
            } else {
                await this.page.locator('label').filter({ hasText: 'Nej' }).locator('span').first().click();
            }
            await this.nextSwedishButton.click();
        }
        //await this.quoteSkapaOffertdokumentWaitingMessage.click();
        await this.quoteDocumentTypeSelectionHeading.click({ timeout: 300000 });
        await this.quoteSwedishDocumentOptionText.click();
        await this.quoteEnglishDocumentOptionText.click();
        if (TestData.get("DocumentLanguage") === "English") {
            await this.quoteEnglishDocumentCheckbox.click();
        } else {
            await this.quoteSwedishDocumentCheckbox.click();
        }
        await this.nextSwedishButton.click();
        await this.ytterligareInformationHeading.click();
        //LTAT-29472 - The 'Ytterligare Information' section in the OffertDokument flow will be same for both SME & Large Account quotes.
        await this.additionalInformationKundensbehovVerksamhetTextbox.first().fill('Test Automation Kundens behov - Verksamhet');
        await this.additionalInformationKundensbehovMobilabonnemangTextbox.first().fill('Test Automation Kundens behov - Mobilabonnemang');
        await this.additionalInformationKundensbehovVaxelTextbox.first().fill('Test Automation Kundens behov - Växel');
        await this.additionalInformationKundensbehovITTextbox.first().fill('Test Automation Kundens behov - IT');
        await this.additionalInformationLösningVerksamhetTextbox.first().fill('Test Automation Lösning - Verksamhet');
        await this.additionalInformationLösningMobilabonnemangTextbox.first().fill('Test Automation Lösning - Mobilabonnemang');
        await this.additionalInformationLösningVaxelTextbox.first().fill('Test Automation Lösning - Växel');
        await this.additionalInformationLosningITTextbox.first().fill('Test Automation Lösning - IT');
        await this.additionalInformationKommentareroffertTextbox.first().fill('Test Automation Kommentarer offert');
        /*
        if (TestData.get("OrgType") === "SOHO") {
            await this.additionalInformationKundensbehovVerksamhetTextbox.first().fill('Test Automation Kundens behov - Verksamhet');
            await this.additionalInformationKundensbehovMobilabonnemangTextbox.first().fill('Test Automation Kundens behov - Mobilabonnemang');
            await this.additionalInformationKundensbehovVaxelTextbox.first().fill('Test Automation Kundens behov - Växel');
            await this.additionalInformationKundensbehovITTextbox.first().fill('Test Automation Kundens behov - IT');
            await this.additionalInformationLösningVerksamhetTextbox.first().fill('Test Automation Lösning - Verksamhet');
            await this.additionalInformationLösningMobilabonnemangTextbox.first().fill('Test Automation Lösning - Mobilabonnemang');
            await this.additionalInformationLösningVaxelTextbox.first().fill('Test Automation Lösning - Växel');
            await this.additionalInformationLosningITTextbox.first().fill('Test Automation Lösning - IT');
            await this.additionalInformationKommentareroffertTextbox.first().fill('Test Automation Kommentarer offert');
        } else if (TestData.get("OrgType") === "LARGE") {
            await this.page.locator('//label[normalize-space(.)="Nuläge"]//parent::div//parent::div//textarea').first().fill('Test Automation Nuläge');
            await this.page.locator('//label[normalize-space(.)="Förändringar och utmaningar i branschen"]//parent::div//parent::div//textarea').first().fill('Test Automation Förändringar och utmaningar i branschen');
            await this.page.locator('//label[normalize-space(.)="Mål framåt"]//parent::div//parent::div//textarea').first().fill('Test Automation Mål framåt');
            await this.page.locator('//label[normalize-space(.)="Mervärden"]//parent::div//parent::div//textarea').first().fill('Test Automation Mervärden');
            await this.page.locator('//label[normalize-space(.)="Om lösningen"]//parent::div//parent::div//textarea').first().fill('Test Automation Om lösningen');
            await this.page.locator('//label[normalize-space(.)="Merfösäljning"]//parent::div//parent::div//textarea').first().fill('Test Automation Merfösäljning');
            await this.page.locator('//label[normalize-space(.)="Kommentarer offert"]//parent::div//parent::div//textarea').first().fill('Test Automation Kommentarer offert');
        }*/
        await this.nextSwedishButton.click();
        await this.ytterligareerbjudandeinformationHeading.click();
        var OffersListLength = await this.page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='LineOfferItemsStep']//c-offer-line-items//span[@class='slds-checkbox_faux']").count();
        for (let i = 0; i < OffersListLength; i++) {
            await this.page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='LineOfferItemsStep']//c-offer-line-items//span[@class='slds-checkbox_faux']").nth(i).click();
        }
        await this.nextSwedishButton.click();
        await this.genereraOffertdokumentHeading.click();
        await this.offerDocumentWordDocumentViewer.click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadWordButton.click();
        const download = await downloadPromise;
        await this.checkaInButton.click();
    }


    async performSkapaOffertdokumentOnCRMFiberQuote(TestData, Avtalstyp, Accesstyp, OpportunityName) {
        if (TestData.get("QuoteRecordType") === "Offert - Standard" || TestData.get("QuoteRecordType") === "Offert - Avrop Ramavtal - Avtalat pris" || TestData.get("QuoteRecordType") === "Offert - Avrop Ramavtal - Eget pris") {
            await this.page.reload();
            await this.page.getByRole('button', { name: ' SKAPA OFFERTDOKUMENT' }).click();
            await this.page.getByRole('heading', { name: 'Quote Details' }).click();
            await this.page.getByRole('combobox', { name: 'Avtalstyp' }).click();
            await this.page.locator("//div[@role='listbox']//ul//li[normalize-space(.)= '" + Avtalstyp + "']").first().click();
            if ("Telia SDU Skanovaägt Nät" === Avtalstyp || "Telia MDU-SDU Kundägt Nät" === Avtalstyp) {
                await this.page.getByRole('combobox', { name: 'Accesstyp' }).click();
                await this.page.locator("//div[@role='listbox']//ul//li[normalize-space(.)= '" + Accesstyp + "']").first().click();
            }
            await this.page.getByRole('button', { name: 'Checka in' }).click();
            await this.page.getByRole('heading', { name: 'Skapa Offertdokument' }).click();
            const downloadPromise = this.page.waitForEvent('download');
            await this.page.getByRole('button', { name: 'Ladda ner PDF' }).click();
            const download = await downloadPromise;
            await this.page.frameLocator('iframe[title="webviewer"]').locator('#pageWidgetContainer1').click();
            await this.page.getByRole('button', { name: 'Checka-in' }).click();
            //await this.page.locator('#brandBand_2').getByText(OpportunityName + '_IA').click();
        } else if (TestData.get("QuoteRecordType") === "Offert - Skapa ett nytt Ramavtal") {
            await this.page.getByRole('button', { name: 'Markera Status som färdig(t)' }).click();
        }
    }


    async performSkapaAvtalOnMCSalesQuote(TestData, utilityFunction) {
        await this.skapaAvtalButton.click();
        await this.skapaAvtalHeading.click();
        await this.skapaAvtalDatesSelectionPageMessage1.click();
        await this.skapaAvtalDatesSelectionPageMessage2.click();
        await this.skapaAvtalDatesSelectionPageMessage3.click();
        await this.skapaAvtalDatesSelectionPageMessage4.click();
        await this.skapaAvtalDatesSelectionPageMessage5.click();
        await this.skapaAvtalDatesSelectionPageMessage6.click();
        await this.skapaAvtalDatesSelectionPageMessage7.click();
        await this.skapaAvtalDatesSelectionPageMessage8.click();
        await this.skapaAvtalDatesSelectionPageMessage9.click();
        await this.skapaAvtalDatesSelectionPageMessage10.click();
        var productList = (TestData.get("Products")).split(";");
        var WorkingDate;
        if (TestData.get("SalesFlowType") === "Tillaggsforhandling"){
            WorkingDate = await utilityFunction.getWeekdayFromSpecifiedDaysFromToday(174);
        } else {
            WorkingDate = await utilityFunction.getWeekdayFromSpecifiedDaysFromToday(70);
        }
        var productStartDateTextbox, productEndDateTextbox;
        for (let i = 0; i < productList.length; i++) {
            productStartDateTextbox = this.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
            productEndDateTextbox = this.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#endDate');
            if (productList[i] === 'Mobilupplägg TOTAL' || productList[i] === 'Mobilupplägg All-IN+') {
                await productStartDateTextbox.click();
                await productStartDateTextbox.clear();
                await productStartDateTextbox.fill(WorkingDate);
                break;
                /*await this.datePickerNextMonthButton.click();
                await this.datePickerNextMonthButton.click();
                await this.datePickerFirstEnabledDate.click();*/
            }
        }
        for (let i = 0; i < productList.length; i++) {
            productStartDateTextbox = this.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
            if (productList[i] !== 'Mobilupplägg TOTAL' && productList[i] !== 'Mobilupplägg All-IN+' && productList[i] !== 'Försäkring Mobiltelefon' && productList[i] !== 'Övrigt') {
                await productStartDateTextbox.click();
                await productStartDateTextbox.clear();
                await productStartDateTextbox.fill(WorkingDate);
                if (TestData.get("SalesFlowType") === "Tillaggsforhandling") {
                    await this.page.waitForTimeout(2000);
                    const button = await this.AlertOkButton.count();
                    if (button) {
                        await this.AlertOkButton.click();
                    }
                }
                /*await this.datePickerNextMonthButton.click();
                await this.datePickerNextMonthButton.click();
                await this.datePickerFirstEnabledDate.click();*/
            }
        }
        if (TestData.get("SalesFlowType") === "Tillaggsforhandling") {
            productList = (TestData.get("ExistingProducts")).split(";");
            for (let i = 0; i < productList.length; i++) {
                await this.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator("//input[@id='StartDate' and @disabled='disabled']").hover();
            }
        }
        if (TestData.get("SalesFlowType") === "Renegotiation") {
            productList = (TestData.get("NewProductsToAddDuringRenegotiation")).split(";");
            for (let i = 0; i < productList.length; i++) {
                productStartDateTextbox = this.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
                productEndDateTextbox = this.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#endDate');
                if (productList[i] === 'Mobilupplägg TOTAL' || productList[i] === 'Mobilupplägg All-IN+') {
                    await productStartDateTextbox.click();
                    await productStartDateTextbox.clear();
                    await productStartDateTextbox.fill(WorkingDate);
                    break;
                }
            }
            for (let i = 0; i < productList.length; i++) {
                productStartDateTextbox = this.cartFrame.getByRole('row', { name: 'Select ' + productList[i] }).locator('#StartDate');
                if (productList[i] !== 'Mobilupplägg TOTAL' && productList[i] !== 'Mobilupplägg All-IN+' && productList[i] !== 'Försäkring Mobiltelefon' && productList[i] !== 'Övrigt') {
                    await productStartDateTextbox.click();
                    await productStartDateTextbox.clear();
                    await productStartDateTextbox.fill(WorkingDate);
                }
            }
        }
        await this.skapaAvtalDatesSelectionPageMessage10.click();
        await this.nextButtonInsideFrame.click();
        await this.skapaAvtalAddUtilizerHeading.click();
        let UtilizerIsNotNullOrEmpty = Boolean(TestData.get("UtilizerAccountOrgNumber"));
        if (UtilizerIsNotNullOrEmpty) {
            await this.skapaAvtalAddUtilizerJaCheckbox.click();
            await this.nextButtonInsideFrame.click();
            await this.skapaAvtalAddUtilizerMessage1.click();
            await this.skapaAvtalAddUtilizerSearchWithOrgNumberCheckbox.click();
            await this.skapaAvtalAddUtilizerOrgNumberTextbox.type((TestData.get("UtilizerAccountOrgNumber")).toString(), { delay: 100 });
            await this.skapaAvtalAddUtilizerFirstOption.click({ timeout: 180000 });
            await this.skapaAvtalAddUtilizerMessage2.click();
            await this.nextSwedishButton.click();
            await this.skapaAvtalAddiUtilizerResultHeading.click();
            await this.skapaAvtalAddiUtilizerResultMessage1.click();
            await this.skapaAvtalAddiUtilizerResultMessage2.click();
            await this.nextSwedishButton.click();
            await this.skapaAvtalAreYouDonePageHeading.click();
            await this.nextSwedishButton.click();
        } else {
            await this.skapaAvtalAddUtilizerNejCheckbox.click();
            await this.nextButtonInsideFrame.click();
        }
        await this.skapaAvtalTUPPSubscriptionCreationHeading.click();
        await this.skapaAvtalTUPPSubscriptionGoToContractButton.click();
        await this.skapaAvtalTUPPInterfaceStatusSuccessful.click();
        if (TestData.get("SalesFlowType") === "Tillaggsforhandling") {
            await expect(this.skapaAvtalMCSalesFlowIdentifierText).toContainText('Tilläggsförhandling');
        } else if (TestData.get("SalesFlowType") === "Renegotiation") {
            await expect(this.skapaAvtalMCSalesFlowIdentifierText).toContainText('Omforhandling');
        } else if (TestData.get("SalesFlowType") === "NewSales") {
            await expect(this.skapaAvtalMCSalesFlowIdentifierText).toContainText('New Sales');
        }
        await this.skapaAvtalUtkastStatusText.click();
        var SwitchSolutionFlag = false;
        productList = (TestData.get("Products")).split(";");
        for (let i = 0; i < productList.length; i++) {
            if (productList[i] === 'Touchpoint' || productList[i] === 'Smart Connect') {
                SwitchSolutionFlag = true;
            }
        }
        if (TestData.get("SalesFlowType") === "Renegotiation") {
            productList = (TestData.get("NewProductsToAddDuringRenegotiation")).split(";");
            for (let i = 0; i < productList.length; i++) {
                if (productList[i] === 'Touchpoint' || productList[i] === 'Smart Connect') {
                    SwitchSolutionFlag = true;
                }
            }
        }
        if (SwitchSolutionFlag) {
            await expect(this.skapaAvtalTUPPInterfaceNameText).toContainText('createSwitchPrices');
        } else {
            await expect(this.skapaAvtalTUPPInterfaceNameText).toContainText('createAgreementCase');
        }
    }


    async performSkapaAvtalOnCRMFiberQuote(OpportunityName) {
        await this.page.getByText('Skickad till kund').nth(1).click();
        await this.page.getByRole('button', { name: 'Redigera Avtalsnummer/KO-nr/A-nr' }).click();
        await this.page.getByLabel('Avtalsnummer/KO-nr/A-nr').type('abc123');
        await this.page.getByLabel('Kollektiva intäkter').type('111');
        await this.page.getByRole('button', { name: 'Spara' }).click();
        await this.page.locator('lightning-formatted-text').filter({ hasText: 'Skickad till kund' }).click();
        await this.page.getByRole('button', { name: 'Markera Status som färdig(t)' }).click();
        await this.page.getByText('Godkänd av kund').nth(1).click();
        await this.skapaAvtalButton.click();
    }


    async performQuoteApproval(utilityFunction, TestData, OpportunityName) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        var quoteID;
        if (TestData.get("SalesFlowType") === "NewSales" || TestData.get("SalesFlowType") === "UtilizerBreakout") {
            quoteID = await utilityFunction.RunSOQLQuery("select id from quote where name = \'" + OpportunityName + "_FA\'");
        } else if (TestData.get("SalesFlowType") === "Renegotiation" || TestData.get("SalesFlowType") === "Tillaggsforhandling" || TestData.get("SalesFlowType") === "Inforhandling") {
            quoteID = await utilityFunction.RunSOQLQuery("select id from quote where name = \'" + OpportunityName + "_RNGN_Version1\'");
        }
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Quote/" + quoteID + "/view");
        await this.page.locator("//span[text()='Systeminformation']").click();
        await this.page.locator("//span[text()='Systeminformation']").click();
        await this.page.locator("//ul[@class='uiAbstractList']//a[text()='Assignment']").first().click();
        const Products = (TestData.get("Products")).split(";");
        for (let iteration = 0; iteration < Products.length; iteration++) {
            if (Products[iteration] !== "IT-support Standard" && Products[iteration] !== "IT-support Plus" && Products[iteration] !== "Smart Säkerhet" && Products[iteration] !== "Försäkring Mobiltelefon" && Products[iteration] !== "Övrigt") {
                await this.page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/b[text()='" + Products[iteration] + "']").click();
            }
        }
        const SubProductsForApproval = (TestData.get("SubProductsForApproval")).split(";");
        for (let iteration = 0; iteration < SubProductsForApproval.length; iteration++) {
            //R23.04 - LTAART-410 - Grouping and sequencing in approval table
            //await this.page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/div[text()='" + SubProductsForApproval[iteration] + "']").first().click();
            await this.page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody//td[1 and contains(normalize-space(.),'" + SubProductsForApproval[iteration] + "')]").first().click();
        }
        if (TestData.get("NegotiateCustomerUniqueTerms") === "Yes") {
            await this.page.locator("//div[@data-target-selection-name='mcQuoteApprovalRequestPage']//table//tbody//tr[1]/td[3][text()='45 dagar']").click();
            await this.page.locator("//div[@data-target-selection-name='mcQuoteApprovalRequestPage']//table//tbody//tr[2]/td[3][text()='Nej']").click();
            await this.page.locator("//div[@data-target-selection-name='mcQuoteApprovalRequestPage']//table//tbody//tr[3]/td[3][text()='Ja']").click();
            await this.page.locator("//div[@data-target-selection-name='mcQuoteApprovalRequestPage']//table//tbody//tr[4]/td[3][text()='Nej']").click();
        }
        await this.page.locator("//a[@title='Godkänna']").click();
        await this.page.locator("//textarea").type("Test Automation Approval By Sales Manager");
        await this.page.locator("//span[text()='Godkänna']").click();
        await this.page.locator("//div[contains(@class,'active')]//span[text()='Offert Godkännande']//following-sibling::span[text()='Godkänt']").click();
    }


    async performOmforhandlingQuoteApproval(utilityFunction, TestData, OpportunityName) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        var quoteID;
        if (TestData.get("SalesFlowType") === "Renegotiation" || TestData.get("SalesFlowType") === "Tillaggsforhandling") {
            quoteID = await utilityFunction.RunSOQLQuery("select id from quote where name = \'" + OpportunityName + "_RNGN_Version1\'");
        } else if (TestData.get("SalesFlowType") === "LegacyNegotiation") {
            quoteID = await utilityFunction.RunSOQLQuery("select id from quote where name = '" + OpportunityName + "_FA'");
        }
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Quote/" + quoteID + "/view");
        await this.page.locator("//span[text()='Systeminformation']").click();
        await this.page.locator("//span[text()='Systeminformation']").click();
        await this.page.locator("//ul[@class='uiAbstractList']//a[text()='Assignment']").first().click();
        await this.page.locator("//a[@title='Godkänna']").click();
        await this.page.locator("//textarea").type("Test Automation Approval By Sales Manager");
        await this.page.locator("//span[text()='Godkänna']").click();
        await this.page.locator("//div[contains(@class,'active')]//span[text()='Offert Godkännande']//following-sibling::span[text()='Godkänt']").click();
    }


    async performQuoteApprovalAndPeerAssignment(utilityFunction, TestData, OpportunityName, PeerAssignment) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        var quoteID;
        if (TestData.get("SalesFlowType") === "NewSales" || TestData.get("SalesFlowType") === "UtilizerBreakout") {
            quoteID = await utilityFunction.RunSOQLQuery("select id from quote where name = \'" + OpportunityName + "_FA\'");
        } else if (TestData.get("SalesFlowType") === "Renegotiation" || TestData.get("SalesFlowType") === "Tillaggsforhandling" || TestData.get("SalesFlowType") === "Inforhandling") {
            quoteID = await utilityFunction.RunSOQLQuery("select id from quote where name = \'" + OpportunityName + "_RNGN_Version1\'");
        }
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Quote/" + quoteID + "/view");
        await this.page.locator("//span[text()='Systeminformation']").click();
        await this.page.locator("//span[text()='Systeminformation']").click();
        await this.page.locator("//ul[@class='uiAbstractList']//a[text()='Assignment']").first().click();
        const Products = (TestData.get("Products")).split(";");
        for (let iteration = 0; iteration < Products.length; iteration++) {
            if (Products[iteration] !== "IT-support Standard" && Products[iteration] !== "IT-support Plus" && Products[iteration] !== "Smart Säkerhet" && Products[iteration] !== "Försäkring Mobiltelefon" && Products[iteration] !== "Övrigt") {
                await this.page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/b[text()='" + Products[iteration] + "']").click();
            }
        }
        const SubProductsForApproval = (TestData.get("SubProductsForApproval")).split(";");
        for (let iteration = 0; iteration < SubProductsForApproval.length; iteration++) {
            //R23.04 - LTAART-410 - Grouping and sequencing in approval table
            //await this.page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody/tr/td[1]/div[text()='" + SubProductsForApproval[iteration] + "']").first().click();
            await this.page.locator("//div[@data-component-id='mcQuoteApprovalRequestPage']//div[@class='widthcontrol']/table/tbody//td[1 and contains(normalize-space(.),'" + SubProductsForApproval[iteration] + "')]").first().click();
        }
        await this.page.locator("//a[@title='Godkänna']").click();
        await this.page.locator("//textarea").type("Test Automation Approval");
        await this.page.locator("//span[text()='Godkänna']").click();
        await this.page.getByText('Det finns priser utanför dina mandat. Vänligen ”Tilldela igen” till ledare eller').click();
        await this.page.getByRole('button', { name: 'Stäng fönstret' }).click();
        await this.page.getByRole('heading', { name: 'Godkännandebegäran Offert Godkännande Väntande' }).getByText('Väntande').click();
        await this.page.getByRole('button', { name: 'Tilldela igen' }).click();
        await this.page.getByPlaceholder('Sök Användare...').click();
        await this.page.getByPlaceholder('Sök Användare...').type(PeerAssignment, { delay: 500 });
        await this.page.getByRole('option', { name: PeerAssignment , exact: true }).first().click();
        await this.page.getByLabel('Kommentarer').click();
        await this.page.getByLabel('Kommentarer').fill('Test Automation');
        await this.page.getByRole('button', { name: 'Tilldela igen' }).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Faktisk godkännare' + PeerAssignment }).getByTitle('Faktisk godkännare').click();
        await this.page.locator("//div[contains(@class,'active')]//span[text()='Offert Godkännande']//following-sibling::span[text()='Väntande']").click();
    }


    async EnterBlakalkylOnQuote() {
        await this.page.getByRole('button', { name: 'Redigera', exact: true }).click();
        await this.page.getByLabel('Blå Kalkyl Nyckeltal').click();
        await this.page.getByLabel('Blå Kalkyl Nyckeltal').fill('EBIT %\t33,35\nRevenue contract\t544151\nRevenue contract årligen\t108830\nOPEX\t272475\nCapex Infra\t83772\nAvtalstid\t5\nUpsell/Singeltjänster\t34000\nDepr\t90213\nKundplacerad utrustning\t20925\nACK DCF\t93972\nACK DCF årligen\t18794\nReturn of Investment\t38,31\nPayBack WACC\t3,1\nEngång Fastighetsägare\t0\nKollektiva intäkter\t21600\nPris 3Play exkl moms\t0\nPris BB exkl. moms\t0\nPris TV exkl moms\t24\nAs is avtalstid kvar\t0\nRev As is kvarvarande tid\t0\nRev As is kvarv. tid årligen\t0\nAs is ACK DCF\t0\nAs is ACK DCF årligen\t0\n3Play Pris As is exkl moms\t0,00\nPris BB exkl. moms As is case\t0,00\nPris TV exkl moms As is case\t0,00\nRevenue B2C\t353160\nRevenue B2B \t0\nExternal Revenue INFRA\t0\nRev. Smart Building Services\t55090\nRev. Fastighets IT \t8820\nRev. WiFi i Allmänna utr.\t105300\nRev. Telia Smart Home\t0\nRev. Mobile X-sell\t21781\nByggnader med Fastighets-IT\t1\nAccespunkter WiFi\t5\nFörändring intäkt nytt avtal\t39854886\nNäthyra aktiv port/mån\t0\nNäthyra passiv port/mån\t0\nFinders Fee/hushåll\t0\nKoncern incr cost EBIT ack %\t74,30');
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ström']").first().click();
        await this.page.getByText('Ström 1').click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Installationshjälp aktiveringstyp']").first().click();
        await this.page.getByText('Individual').click();
        await this.page.getByRole('button', { name: 'Spara' }).click();
        await expect(this.QuoteBlakalkylEBITPercentageText).toContainText('33,35 %');
        await expect(this.QuoteBlakalkylRevenuesText).toContainText('544 151,00');
        await expect(this.QuoteBlakalkylOPEXText).toContainText('272 475,00');
        await expect(this.QuoteBlakalkylCapexInfraText).toContainText('83 772,00');
        await expect(this.QuoteBlakalkylKontraktsperiodYText).toContainText('5');
        await expect(this.QuoteBlakalkylUpsellText).toContainText('34 000,00');
        await expect(this.QuoteBlakalkylKollektivaIntakterText).toContainText('21 600');
        await expect(this.QuoteBlakalkylPrisTVexklmomsText).toContainText('24 kr');
        await expect(this.QuoteBlakalkylRevenueB2BText).toContainText('0');
        await expect(this.QuoteBlakalkylRevSmartBuildingServicesText).toContainText('55 090');
        await expect(this.QuoteBlakalkylRevWiFiiAllmännautrText).toContainText('105 300');
        await expect(this.QuoteBlakalkylRevMobileXsellText).toContainText('21 781');
        await expect(this.QuoteBlakalkylAccespunkterWiFiText).toContainText('5');
        await expect(this.QuoteBlakalkylRevenuecontractarligenText).toContainText('108 830');
        await expect(this.QuoteBlakalkylACKDCFarligenText).toContainText('18 794');
        await expect(this.QuoteBlakalkylAsisACKDCFText).toContainText('0');
        await expect(this.QuoteBlakalkylPrisBBexklmomsAsiscaseText).toContainText('0');
        await expect(this.QuoteBlakalkyl3PlayPrisAsisexklmomsText).toContainText('0');
        await expect(this.QuoteBlakalkylForandringintaktnyttavtalText).toContainText('39 854 886');
        await expect(this.QuoteBlakalkylNathyrapassivportmanText).toContainText('0');
        await expect(this.QuoteBlakalkylKoncernincrcostEBITackText).toContainText('74');
        await expect(this.QuoteBlakalkylDepreciationText).toContainText('90 213,00');
        await expect(this.QuoteBlakalkylKundplaceradutrustningText).toContainText('20 925,00');
        await expect(this.QuoteBlakalkylACKDCFText).toContainText('93 972,00');
        await expect(this.QuoteBlakalkylReturnOfInvestementText).toContainText('38,31 %');
        await expect(this.QuoteBlakalkylPaybackYText).toContainText('3,10');
        await expect(this.QuoteBlakalkylEngangFastighetsagareText).toContainText('0,00');
        await expect(this.QuoteBlakalkylPrisBBexklmomsText).toContainText('0 kr');
        await expect(this.QuoteBlakalkylRevenueB2CText).toContainText('353 160');
        await expect(this.QuoteBlakalkylExternalRevenueINFRAText).toContainText('0');
        await expect(this.QuoteBlakalkylRevFastighetsITText).toContainText('8 820');
        await expect(this.QuoteBlakalkylRevTeliaSmartHomeText).toContainText('0');
        await expect(this.QuoteBlakalkylByggnadermedFastighetsITText).toContainText('1');
        await expect(this.QuoteBlakalkylPris3PlayexklmomsText).toContainText('0');
        await expect(this.QuoteBlakalkylAsisavtalstidkvarText).toContainText('0');
        await expect(this.QuoteBlakalkylRevAsiskvarvarandetidText).toContainText('0');
        await expect(this.QuoteBlakalkylRevAsiskvarvtidarligenText).toContainText('0');
        await expect(this.QuoteBlakalkylAsisACKDCFarligenText).toContainText('0');
        await expect(this.QuoteBlakalkylPrisTVexklmomsAsiscaseText).toContainText('0');
        await expect(this.QuoteBlakalkylNathyraaktivportmanText).toContainText('0');
        await expect(this.QuoteBlakalkylFindersFeehushallText).toContainText('0');
    }


    async performCRMFiberQuoteApproval(utilityFunction, TestData, OpportunityID) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        var quoteID = await utilityFunction.RunSOQLQuery("select id from quote where OpportunityId = '" + OpportunityID + "'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Quote/" + quoteID + "/view");
        await this.page.locator("//a[text()='Godkännandehistorik']").click();
        await this.page.locator("//div[@class='listViewContent']//a[text()='Step 1']").first().click();
        const Products = (TestData.get("Products")).split(";");
        for (let iteration = 0; iteration < Products.length; iteration++) {
            await this.page.locator("//lightning-datatable[3]//table/tbody/tr/th[1]//lightning-base-formatted-text[contains(text(),'" + Products[iteration] + "')]").first().click();
        }
        const SubProductsForApproval = (TestData.get("SubProductsForApproval")).split(";");
        for (let iteration = 0; iteration < SubProductsForApproval.length; iteration++) {
            await this.page.locator("//lightning-datatable[3]//table/tbody/tr/th[1]//lightning-base-formatted-text[contains(text(),'" + SubProductsForApproval[iteration] + "')]").first().click();
        }
        let BlakalkylIsNotNullOrEmpty = Boolean(TestData.get("BlakalkylValues"));
        if (BlakalkylIsNotNullOrEmpty) {
            var BlakalkylValues = (TestData.get("BlakalkylValues")).replaceAll(",", ".");
            BlakalkylValues = (BlakalkylValues).split(";");
            await this.page.locator("//lightning-datatable[1]//table/tbody/tr/th[1]//lightning-base-formatted-text[contains(text(),'" + BlakalkylValues[0] + "')]").first().click();
            await this.page.locator("//lightning-datatable[1]//table/tbody/tr/td[2]//lightning-base-formatted-text[contains(text(),'" + BlakalkylValues[1] + "')]").first().click();
            await this.page.locator("//lightning-datatable[1]//table/tbody/tr/td[3]//lightning-base-formatted-text[contains(text(),'" + BlakalkylValues[2] + "')]").first().click();
            await this.page.locator("//lightning-datatable[1]//table/tbody/tr/td[4]//lightning-base-formatted-text[contains(text(),'" + BlakalkylValues[3] + "')]").first().click();
            await this.page.locator("//lightning-datatable[1]//table/tbody/tr/td[5]//lightning-base-formatted-text[contains(text(),'" + BlakalkylValues[4] + "')]").first().click();
            await this.page.locator("//lightning-datatable[1]//table/tbody/tr/td[6]//lightning-base-formatted-text[contains(text(),'" + BlakalkylValues[5] + "')]").first().click();
            await this.page.locator("//lightning-datatable[2]//table/tbody/tr/td[4]//lightning-base-formatted-text[contains(text(),'" + BlakalkylValues[6] + "')]").first().click();
        }
        await this.page.locator("//div[@class='flexipagePage']//a[@title='Godkänna']").first().click();
        await this.page.locator("//textarea").type("Test Automation Approval By Sales Manager");
        await this.page.locator("//span[text()='Godkänna']").click();
        await this.page.locator("//div[contains(@class,'active')]//span[text()='Offert Godkännande']//following-sibling::span[text()='Godkänt']").click();
    }


    async performCRMFiberQuoteApprovalAndPeerAssignment(utilityFunction, TestData, OpportunityID, PeerAssignment) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        var quoteID = await utilityFunction.RunSOQLQuery("select id from quote where OpportunityId = '" + OpportunityID + "'");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Quote/" + quoteID + "/view");
        await this.page.locator("//a[text()='Godkännandehistorik']").click();
        await this.page.locator("//div[@class='listViewContent']//a[text()='Step 1']").first().click();
        const Products = (TestData.get("Products")).split(";");
        for (let iteration = 0; iteration < Products.length; iteration++) {
            await this.page.locator("//lightning-datatable[3]//table/tbody/tr/th[1]//lightning-base-formatted-text[contains(text(),'" + Products[iteration] + "')]").first().click();
        }
        const SubProductsForApproval = (TestData.get("SubProductsForApproval")).split(";");
        for (let iteration = 0; iteration < SubProductsForApproval.length; iteration++) {
            await this.page.locator("//lightning-datatable[3]//table/tbody/tr/th[1]//lightning-base-formatted-text[contains(text(),'" + SubProductsForApproval[iteration] + "')]").first().click();
        }
        await this.page.locator("//div[@class='flexipagePage']//a[@title='Godkänna']").first().click();
        await this.page.locator("//textarea").type("Test Automation Approval");
        await this.page.locator("//span[text()='Godkänna']").click();
        await this.page.getByText('Det finns priser utanför dina mandat. Vänligen ”Tilldela igen” till ledare eller').click();
        await this.page.getByRole('button', { name: 'Stäng fönstret' }).click();
        await this.page.getByRole('heading', { name: 'Godkännandebegäran Offert Godkännande Väntande' }).getByText('Väntande').click();
        await this.page.getByRole('button', { name: 'Tilldela igen' }).click();
        await this.page.getByPlaceholder('Sök Användare...').click();
        await this.page.getByPlaceholder('Sök Användare...').type(PeerAssignment, { delay: 500 });
        await this.page.getByRole('option', { name: PeerAssignment , exact: true }).first().click();
        await this.page.getByLabel('Kommentarer').click();
        await this.page.getByLabel('Kommentarer').fill('Test Automation');
        await this.page.getByRole('button', { name: 'Tilldela igen' }).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Faktisk godkännare' + PeerAssignment }).getByTitle('Faktisk godkännare').click();
        await this.page.locator("//div[contains(@class,'active')]//span[text()='Offert Godkännande']//following-sibling::span[text()='Väntande']").click();
    }


    async verifyCRMFiberOpportunityToQuoteDataFlow(TestData, utilityFunction) {
        var Varumarke = TestData.get("Varumarke");
        var IntakterNS = TestData.get("IntakterNS");
        var IntakterCS = TestData.get("IntakterCS");
        var Adresstyp = TestData.get("Adresstyp");
        var AntalFastigheter = TestData.get("AntalFastigheter");
        var AntalPortar = TestData.get("AntalPortar");
        var AntalHushall = TestData.get("AntalHushall").toString();
        var Fastighetsbeteckning = TestData.get("Fastighetsbeteckning");
        var Kommun = TestData.get("Kommun");
        var HERAFMO = TestData.get("HERAFMO");
        var ExistingPropertyNetworkFTTBFTTH = TestData.get("ExistingPropertyNetworkFTTBFTTH");
        var Nyproduktion = TestData.get("Nyproduktion");
        var Fastighetsnat = TestData.get("Fastighetsnat");
        var Switchbyte = TestData.get("Switchbyte");
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Varumärke']//..//..//..//lightning-formatted-text")).toContainText(Varumarke);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Intäkter NS']//..//..//..//lightning-formatted-text")).toContainText(IntakterNS);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Intäkter CS']//..//..//..//lightning-formatted-text")).toContainText(IntakterCS);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Adresstyp']//..//..//..//lightning-formatted-text")).toContainText(Adresstyp);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Antal fastigheter']//..//..//..//lightning-formatted-number")).toContainText(AntalFastigheter);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Antal portar']//..//..//..//lightning-formatted-number")).toContainText(AntalPortar);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Antal hushåll']//..//..//..//lightning-formatted-number")).toContainText(AntalHushall);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fastighetsbeteckning']//..//..//..//lightning-formatted-text")).toContainText(Fastighetsbeteckning);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Kommun']//..//..//..//lightning-formatted-text")).toContainText(Kommun);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='HERA/FMO']//..//..//..//lightning-formatted-text")).toContainText(HERAFMO);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Nyproduktion']//..//..//..//lightning-formatted-text")).toContainText(Nyproduktion);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Fastighetsnät']//..//..//..//lightning-formatted-text")).toContainText(Fastighetsnat);
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Switch-byte']//..//..//..//lightning-formatted-text")).toContainText(Switchbyte);
    }


    async performDataMigrationOnQuote(TestCaseName, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        for (let iteration = 1; iteration <= 1000; iteration++) {
            const TestData = await utilityFunction.ReadDataFromExcelForDataMigration(iteration);
            if (Boolean(TestData.get("QuoteID"))) {
                try {
                    await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/quote/" + TestData.get("QuoteID") + "/view");
                    await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Quote Number']//..//..//..//lightning-formatted-text").click();
                    await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Type of Quote']//..//..//..//lightning-formatted-text").click();
                    await this.page.locator("//div[contains(@class,'ActionToolbar')]//button[contains(normalize-space(.),'MinuteBased Migration')]").click();
                    await this.page.locator('vlocity_cmt-spinner').click();
                    //await this.page.getByText('In Progress').click();
                    await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Type of Quote']//..//..//..//lightning-formatted-text").click();
                    var migrationStatus = await utilityFunction.RunSOQLQuery("Select MC_Convergence_Qualified_Areas__c from Quote where id = '" + TestData.get("QuoteID") + "'");
                    if (Boolean(migrationStatus)) {
                        await utilityFunction.WriteDataToExcelForDataMigration(iteration, "Status", migrationStatus);
                    }
                    console.log('Test - ' + TestCaseName + '_' + iteration + ' and quote id - ' + TestData.get("QuoteID") + ' finished data migration with status - ' + migrationStatus);
                } catch (error) {
                    console.error('Test - ' + TestCaseName + '_' + iteration + ' and quote id - ' + TestData.get("QuoteID") + ' failed with error - ', error);
                }
            } else {
                break;
            }
        }
    }

}
module.exports = { QuotePage };