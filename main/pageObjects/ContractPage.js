const { expect } = require('@playwright/test');


class ContractPage {



    constructor(page) {
        this.page = page;
        this.cartFrame = this.page.frameLocator('iframe[name*="vfFrameId"]').first();
        this.cartFrameScrive = this.page.frameLocator('//div[contains(@class,"normal")]//iframe[contains(@name,"vfFrameId")]');
        // Contract Page objects
        this.contractRedigerButton = this.page.getByRole('button', { name: 'Redigera', exact: true });
        this.contractStatusPicklist = this.page.locator("//button[contains(@aria-label,'Status, ')]/span");
        this.contractStatusPicklist1 = this.page.locator("//label[contains(text(),'Status')]//..//button[contains(@aria-label,'Status')]");
        //this.contractStatusPicklist1 = this.page.getByRole('combobox', { name: /Status, / });
        this.contractCancellationReason = this.page.getByLabel('Orsak för avbrytet avtal');
        this.contractSparaButton = this.page.getByRole('button', { name: 'Spara', exact: true });
        this.contractAvbrytButton = this.page.getByRole('button', { name: 'Avbryt' });
        this.contractAvbrutenStatus = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Avbruten']");
        this.contractAktivtStatus = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Aktivt']");
        this.changeTheStatusToNext = this.page.getByRole('button', { name: 'Markera Status som färdig(t)' });
        this.contractStatusAsSendForApproval = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Avtal skickat godkännande']");
        this.contractStatusAsApproved = this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Avtal godkänt']");
        //Skapa avtalsdokument page objects
        this.contractSkapaAvtalsdokumentButton = this.page.getByRole('button', { name: ' Skapa avtalsdokument' });
        this.contractSkapaAvtalsdokumentHeaderText = this.page.getByRole('heading', { name: 'Välj avtalsmall' });
        //LTAT-29472 - The 'Ytterligare Information' section in the OffertDokument flow will be same for both SME & Large Account quotes.
        this.contractSkapaAvtalsdokumentSMEEngelskaCheckbox = this.page.locator('label').filter({ hasText: 'Avtal (Engelska)' }).locator('span').first();
        this.contractSkapaAvtalsdokumentLargeSvenskaCheckbox = this.page.locator('label').filter({ hasText: 'Avtal (Svenska)' }).locator('span').first();
        this.contractSkapaAvtalsdokumentLargeEngelskaCheckbox = this.page.locator('label').filter({ hasText: 'Avtal (Engelska)' }).locator('span').first();
        this.contractSkapaAvtalsdokumentSMESvenskaCheckbox = this.page.locator('label').filter({ hasText: 'Avtal (Svenska)' }).locator('span').first();
        this.contractRenegotiationSkapaAvtalsdokumentSMESvenskaCheckbox = this.page.locator('label').filter({ hasText: 'Fullständigt Avtal (Svenska)' }).locator('span').first();
        this.contractRenegotiationSkapaAvtalsdokumentSMEEngelskaCheckbox = this.page.locator('label').filter({ hasText: 'Fullständigt Avtal (Engelska)' }).locator('span').first();
        this.contractRenegotiationSkapaAvtalsdokumentLARGESvenskaCheckbox = this.page.locator('label').filter({ hasText: 'Fullständigt Avtal (Svenska)' }).locator('span').first();
        this.contractRenegotiationSkapaAvtalsdokumentLARGEEngelskaCheckbox = this.page.locator('label').filter({ hasText: 'Fullständigt Avtal (Engelska)' }).locator('span').first();
        this.contractRenegotiationSkapaAvtalsdokumentPartialEngelskaCheckbox = this.page.locator('label').filter({ hasText: 'Enbart Bilaga 2, kundunika priser (Engelska)' }).locator('span').first();
        this.contractRenegotiationSkapaAvtalsdokumentPartialSvenskaCheckbox = this.page.locator('label').filter({ hasText: 'Enbart Bilaga 2, kundunika priser (Svenska)' }).locator('span').first();

        this.nastaButton = this.page.getByRole('button', { name: 'Nästa' });
        this.contractSkapaAvtalsdokumentBilaga2Header = this.page.getByRole('heading', { name: 'Bilaga 2 erbjudanden' });
        this.contractSkapaAvtalsdokumentBilaga2MarkAllChecbox = this.page.locator('label').filter({ hasText: 'Markera/avmarkera alla' }).locator('span').first();
        this.contractSkapaAvtalsdokumentHeading1 = this.page.getByRole('heading', { name: 'Skapa Avtalsdokument' });
        this.contractSkapaAvtalsdokumentHeading2 = this.page.getByRole('heading', { name: 'Ditt avtal genereras, var god dröj' }).getByText('Ditt avtal genereras, var god dröj');
        this.contractSkapaAvtalsdokumentHeading3 = this.page.getByText('Ditt avtal innehåller produkter som kräver ett beställningsdokument. Skapa först');
        this.contractPDFDocumentViewer = this.page.frameLocator('iframe[title="webviewer"]').locator('#pageWidgetContainer1');
        this.contractDownloadPDFButton = this.page.getByRole('button', { name: 'Ladda ner PDF' });
        this.contractCheckaInButton = this.page.getByRole('button', { name: 'Checka in' });
        this.contractStatusAsUtkast = this.page.getByText('Utkast').nth(1);
    }



    async testDataCleanupCancelMCSalesContract(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        var contractID = "";
        if (TestData.get("SalesFlowType") === "NewSales" || TestData.get("SalesFlowType") === "LegacyNegotiation" || TestData.get("SalesFlowType") === "UtilizerBreakout") {
            contractID = await utilityFunction.RunSOQLQuery("select Id, Status from Contract where AccountId =\'" + accountID + "\' and Status != \'Cancelled\' and Contract_Record_Type__c = \'Ramavtal\'");
        } else if (TestData.get("SalesFlowType") === "Renegotiation" || TestData.get("SalesFlowType") === "Inforhandling" || TestData.get("SalesFlowType") === "Tillaggsforhandling") {
            contractID = await utilityFunction.RunSOQLQuery("select Id, Status from Contract where AccountId =\'" + accountID + "\' and Status != \'Cancelled\' and Status != \'Active\' and Contract_Record_Type__c = \'Ramavtal\'");
        }
        let contractIsNotNullOrEmpty = Boolean(contractID);
        if (contractIsNotNullOrEmpty) {
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Contract/" + contractID + "/view");
            await this.contractRedigerButton.click();
            await this.contractCancellationReason.click();
            await this.contractCancellationReason.type("Test Automation Cancel");
            await this.contractStatusPicklist1.click();
            await this.page.getByRole('option', { name: 'Avbruten' }).getByText('Avbruten').click();
            await this.contractSparaButton.click();
            await this.contractAvbrutenStatus.click();
        }
    }



    async testDataCleanupCRMFiberOpportunityContract(TestData, utilityFunction) {
        for (let iteration = 0; iteration <= 10; iteration++) {
            const opportunityIDs = await utilityFunction.RunSOQLQuery("select id from opportunity where RecordType__c= \'Real_Estate_Fiber\' and Account_Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
            const contractIDs = await utilityFunction.RunSOQLQuery("select id from contract where Contract_Record_Type__c = \'Connected & Smart Building\' and Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
            let opportunityIDIsNotNullOrEmpty = Boolean(opportunityIDs);
            let contractIDIsNotNullOrEmpty = Boolean(contractIDs);
            if (contractIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("Contract", contractIDs);
            }
            if (opportunityIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("Opportunity", opportunityIDs);
            }
            if (!opportunityIDIsNotNullOrEmpty || !contractIDIsNotNullOrEmpty) {
                break;
            }
        }
    }



    async testDataCleanupSalesEnablerOpportunity(TestData, utilityFunction) {
        for (let iteration = 0; iteration <= 10; iteration++) {
            const opportunityIDs = await utilityFunction.RunSOQLQuery("select id from opportunity where Account_Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
            let opportunityIDIsNotNullOrEmpty = Boolean(opportunityIDs);
            if (opportunityIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("Opportunity", opportunityIDs);
            }
            if (!opportunityIDIsNotNullOrEmpty) {
                break;
            }
        }
    }


    async testDataCleanupSalesEnablerContact(TestData, utilityFunction) {
        for (let iteration = 0; iteration <= 10; iteration++) {
            const AccountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c = '" + TestData.get("OrgNumber") + "'");
            const contactIDs = await utilityFunction.RunSOQLQuery("select id from contact where AccountId = '" + AccountID + "'  and Name like '%FirstName%'");
            let contactIDIsNotNullOrEmpty = Boolean(contactIDs);
            if (contactIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("Contact", contactIDs);
            }
            if (!contactIDIsNotNullOrEmpty) {
                break;
            }
        }
    }


    async testDataCleanupSalesEnablerContract(TestData, utilityFunction) {
        for (let iteration = 0; iteration <= 10; iteration++) {
            const AccountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c = '" + TestData.get("OrgNumber") + "'");
            const contractIDs = await utilityFunction.RunSOQLQuery("select id from contract where AccountId = '" + AccountID + "' and Contract_Record_Type__c like '%Telia%'");
            let contractIDIsNotNullOrEmpty = Boolean(contractIDs);
            if (contractIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("Contract", contractIDs);
            }
            if (!contractIDIsNotNullOrEmpty) {
                break;
            }
        }
    }


    async testDataCleanupCustomerListAccounts(TestData, utilityFunction) {
        for (let iteration = 0; iteration <= 10; iteration++) {
            const AccountID = await utilityFunction.RunSOQLQuery("select id from account where name like '%" + TestData.get("AccountName") + "%'");
            let AccountIDIsNotNullOrEmpty = Boolean(AccountID);
            if (AccountIDIsNotNullOrEmpty) {
                await utilityFunction.deleteRecordFromOrg("Account", AccountID);
            }
            if (!AccountIDIsNotNullOrEmpty) {
                break;
            }
        }
    }


    async testDataCleanupCustomerListAvtalSituation(TestData, utilityFunction) {
        const AccountID = await utilityFunction.RunSOQLQuery("select id from account where name = '" + TestData.get("AccountName") + "'");
        if (Boolean(AccountID)) {
            for (let iteration = 0; iteration <= 100; iteration++) {
                const AgreementSituationtID = await utilityFunction.RunSOQLQuery("select id from Agreement_Situation__c where KKnr__c = '" + AccountID + "'");
                let AgreementSituationtIDIsNotNullOrEmpty = Boolean(AgreementSituationtID);
                if (AgreementSituationtIDIsNotNullOrEmpty) {
                    await utilityFunction.deleteRecordFromOrg("Agreement_Situation__c", AgreementSituationtID);
                }
                if (!AgreementSituationtIDIsNotNullOrEmpty) {
                    break;
                }
            }
        }
    }

    async performMCSalesContractApproval(TestData) {
        await this.changeTheStatusToNext.click();
        await this.contractStatusAsSendForApproval.click();
        await this.page.reload();
        await this.changeTheStatusToNext.click();
        await this.contractStatusAsApproved.click();
    }



    async performMCSalesSkapaAvtalsdokument(TestData) {
        await this.page.reload();
        await this.contractStatusAsUtkast.click();
        /*
        await this.page.waitForTimeout(5000);
        await this.page.locator("//input[@name='fileInput' and @type='file' and contains(@id,'input-file')]").first().setInputFiles('./resources/TestDataFiles/Avtal RA-03049295_Telia_Panduro Hobby AB_2024-05-14_03-37-36.pdf');
        await this.page.getByRole('button', { name: 'Klart' }).click();
        await this.page.waitForTimeout(5000);
        await this.page.reload();
        */
        await this.contractSkapaAvtalsdokumentButton.click();
        var Products = (TestData.get("Products")).split(";");
        var ITDaasFlag, ITSupportFlag, ConnectedOfficeFlag, TPPlusFlag, M365Flag;
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
            if (Products[iteration] === "Microsoft 365") {
                M365Flag = "Yes";
            }
        }
        if (TestData.get("SalesFlowType") === "Renegotiation") {
            if (Boolean(TestData.get("NewProductsToAddDuringRenegotiation"))) {
                var NewProducts = (TestData.get("NewProductsToAddDuringRenegotiation")).split(";");
                for (let iteration = 0; iteration < NewProducts.length; iteration++) {
                    if (NewProducts[iteration] === "IT-avdelning" || NewProducts[iteration] === "IT-avdelning Start") {
                        ITDaasFlag = "Yes";
                    }
                    if (NewProducts[iteration] === "IT-support Standard" || NewProducts[iteration] === "IT-support Plus") {
                        ITSupportFlag = "Yes";
                    }
                    if (NewProducts[iteration] === "Bredband Plus" || NewProducts[iteration] === "Bredband Start" || NewProducts[iteration] === "Bredband Pro" ||
                        NewProducts[iteration] === "Cloud VPN SD-Wan/Firewall" || NewProducts[iteration] === "Datanet" || NewProducts[iteration] === "Cloud VPN Wifi/Lan") {
                        ConnectedOfficeFlag = "Yes";
                    }
                    if (NewProducts[iteration] === "TouchPoint Plus") {
                        TPPlusFlag = "Yes";
                    }
                    if (NewProducts[iteration] === "Microsoft 365") {
                        M365Flag = "Yes";
                    }
                }
            }
        }
        if (ITDaasFlag === "Yes" || ITSupportFlag === "Yes" || ConnectedOfficeFlag === "Yes" || TPPlusFlag === "Yes" || M365Flag === "Yes") {
            await this.page.getByRole('heading', { name: 'Observera!' }).click();
            await this.page.getByText('Observera att IT-avdelning, Touchpoint Plus, Microsoft 365 eller Nätverkstjänster finns med i r').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
        }
        await this.contractSkapaAvtalsdokumentHeaderText.click();
        if (TestData.get("SalesFlowType") === "NewSales" || TestData.get("SalesFlowType") === "LegacyNegotiation" || TestData.get("SalesFlowType") === "UtilizerBreakout") {
            if (TestData.get("OrgType") === "SOHO") {
                if (TestData.get("DocumentLanguage") === "English") {
                    await this.contractSkapaAvtalsdokumentSMEEngelskaCheckbox.click();
                } else {
                    await this.contractSkapaAvtalsdokumentSMESvenskaCheckbox.click();
                }
            } else if (TestData.get("OrgType") === "LARGE") {
                if (TestData.get("DocumentLanguage") === "English") {
                    await this.contractSkapaAvtalsdokumentLargeEngelskaCheckbox.click();
                } else {
                    await this.contractSkapaAvtalsdokumentLargeSvenskaCheckbox.click();
                }
            }
        } else if (TestData.get("SalesFlowType") === "Renegotiation" || TestData.get("SalesFlowType") === "Inforhandling" || TestData.get("SalesFlowType") === "Tillaggsforhandling") {
            if (TestData.get("OrgType") === "SOHO") {
                if (TestData.get("DocumentLanguage") === "English") {
                    await this.contractRenegotiationSkapaAvtalsdokumentPartialEngelskaCheckbox.click();
                } else {
                    await this.contractRenegotiationSkapaAvtalsdokumentPartialSvenskaCheckbox.click();
                }
            } else if (TestData.get("OrgType") === "LARGE") {
                if (TestData.get("DocumentLanguage") === "English") {
                    await this.contractRenegotiationSkapaAvtalsdokumentPartialEngelskaCheckbox.click();
                } else {
                    await this.contractRenegotiationSkapaAvtalsdokumentPartialSvenskaCheckbox.click();
                }
            }
        }
        await this.nastaButton.click();
        let UtilizerIsNotNullOrEmpty = Boolean(TestData.get("UtilizerAccountOrgNumber"));
        if (UtilizerIsNotNullOrEmpty && TPPlusFlag === "Yes" && (TestData.get("SalesFlowType") === "Renegotiation" || TestData.get("SalesFlowType") === "NewSales")) {
            await this.page.getByRole('heading', { name: 'Validera Touchpoint Plus-' }).click();
            await this.page.locator("//input[@value='allSolution']//ancestor::span//child::span[@class='slds-checkbox_faux']").click();
            await this.nastaButton.click();
        }
        if (TestData.get("SalesFlowType") === "NewSales" || TestData.get("SalesFlowType") === "LegacyNegotiation" || TestData.get("SalesFlowType") === "UtilizerBreakout") {
            await this.page.getByRole('heading', { name: 'Vill du lägga till fler erbjudanden i bilaga 1?' }).click();
            await this.page.locator('label').filter({ hasText: 'Markera/Avmarkera alla' }).locator('span').first().click();
            await this.nastaButton.click();
        }
        await this.contractSkapaAvtalsdokumentHeading1.click();
        await this.contractSkapaAvtalsdokumentHeading2.click();
        await this.contractPDFDocumentViewer.click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.contractDownloadPDFButton.click();
        const download = await downloadPromise;
        await this.contractCheckaInButton.click();
        if (ITDaasFlag === "Yes" || ITSupportFlag === "Yes" || ConnectedOfficeFlag === "Yes" || TPPlusFlag === "Yes" || M365Flag === "Yes") {
            await this.page.getByRole('heading', { name: 'Skapa Beställningsdokument', exact: true }).click();
            await this.page.getByText('Skapa Beställningsdokument, var god dröj').click();
            await this.page.frameLocator('iframe[title="webviewer"]').locator('#pageWidgetContainer1').click();
            const download1Promise = this.page.waitForEvent('download');
            await this.page.getByRole('button', { name: 'Ladda ner PDF' }).click();
            const download1 = await download1Promise;
            const download2Promise = this.page.waitForEvent('download');
            await this.page.getByRole('button', { name: 'Ladda ner Word' }).click();
            const download2 = await download2Promise;
            await this.contractCheckaInButton.click();
        }
        await this.contractStatusAsUtkast.click();
    }



    async performCRMFiberSkapaAvtalsdokument(TestData, Avtalstyp, Accesstyp, OpportunityName) {
        if (TestData.get("QuoteRecordType") === "Offert - Skapa ett nytt Ramavtal") {
            await this.page.getByRole('tab', { name: 'Avtalsdokument' }).click();
            await this.page.waitForTimeout(5000);
            await this.page.locator("//input[@name='fileInput' and @type='file' and contains(@id,'input-file')]").setInputFiles('./resources/TestDataFiles/Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet.pdf');
            await this.page.getByRole('button', { name: 'Klart' }).click();
            await this.page.waitForTimeout(5000);
            await this.page.getByRole('tab', { name: 'Avtalsinformation' }).click();
            await this.page.getByRole('button', { name: 'Redigera Avtalsnummer/KO-nr/A' }).click();
            await this.page.getByLabel('Avtalsnummer/KO-nr/A-nr').click();
            await this.page.getByLabel('Avtalsnummer/KO-nr/A-nr').fill('ABCD232');
            await this.page.getByLabel('*Avtalstid (år)').fill('5');
            await this.page.getByLabel('*Avtalslängd (månader)').fill('60');
            await this.page.getByRole('button', { name: 'Spara' }).click();
        } else {
            await this.contractSkapaAvtalsdokumentButton.click();
            await this.page.getByRole('combobox', { name: 'Avtalstyp' }).first().click();
            await this.page.locator("//div[@role='listbox']//ul//li[normalize-space(.)= '" + Avtalstyp + "']").first().click();
            if ("Telia SDU Skanovaägt Nät" === Avtalstyp || "Telia MDU-SDU Kundägt Nät" === Avtalstyp) {
                await this.page.getByRole('combobox', { name: 'Accesstyp' }).click();
                await this.page.locator("//div[@role='listbox']//ul//li[normalize-space(.)= '" + Accesstyp + "']").first().click();
            }
            await this.page.getByRole('button', { name: 'Checka in' }).click();
            await this.contractPDFDocumentViewer.click();
            const downloadPromise = this.page.waitForEvent('download');
            await this.contractDownloadPDFButton.click();
            const download = await downloadPromise;
            await this.page.getByRole('button', { name: 'Checka-in' }).click();
        }
    }



    async performCRMFiberContractSigning(utilityFunction, OpportunityName) {
        const contractID = await utilityFunction.RunSOQLQuery("select id from contract where Name like '" + OpportunityName + "%'");
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.locator('div').filter({ hasText: /^Skicka för e-sign$/ }).locator('button').click();
        await this.cartFrameScrive.locator("//td[text()='Avtal']//following-sibling::td/a").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Varumärke']//..//..//..//lightning-formatted-text").click();
        await this.page.reload();
        await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Sign Manuellt Avtalsdokument']").click();
        const todaysDate = await utilityFunction.TodaysDate();
        await this.page.locator("//input[@name='Received_Date']").click();
        await this.page.locator("//input[@name='Received_Date']").type(todaysDate);
        await this.page.locator("//input[@name='CustomerSignedDate']").click();
        await this.page.locator("//input[@name='CustomerSignedDate']").type(todaysDate);
        await this.page.getByLabel('Ladda upp dokument.').setInputFiles('./resources/TestDataFiles/Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet.pdf');
        await this.page.getByRole('button', { name: 'Klart' }).click();
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Nästa' }).click();
        await this.page.locator("//lightning-formatted-rich-text[contains(normalize-space(.),'Nedanstående fil är uppladdad')]").click();
        await this.page.getByRole('button', { name: 'Nästa' }).click();
        await this.cartFrameScrive.getByRole('cell', { name: 'Signed' }).click();
        await this.cartFrameScrive.locator("//td[text()='Avtal']//following-sibling::td").first().click();
        await this.page.goto(secretsData.get("environmentURL") + '/lightning/r/Contract/' + contractID + '/view');
        await this.page.getByRole('button', { name: 'Redigera Installationsdatum' }).click();
        await this.page.getByLabel('Installationsdatum').type(todaysDate);
        //await this.contractStatusPicklist1.click();
        //await this.page.getByLabel('Avtalsinformation').getByText('Signerat').first().click();
        await this.contractSparaButton.click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Signerat']").click();
    }



    async performMCSalesContractSendForSigning(TestData) {
        await this.page.locator('button').filter({ hasText: 'Skicka för e-signering' }).click();
        let AdditionalSignerIsNotNullOrEmpty = Boolean(TestData.get("AdditionalSigner"));
        if (AdditionalSignerIsNotNullOrEmpty) {
            ////Defect is raised for the english text B2XSET-307959
            await this.page.locator("//h1[text()='Details of Role based approver']").click();
            await this.page.locator("//vlocity_cmt-omniscript-text-block[@data-omni-key='TextBlock2']//lightning-formatted-rich-text[contains(normalize-space(.),'Värdet på denna affär är över ditt mandat och kommer att skickas till')]").click();
            await this.page.locator("//vlocity_cmt-omniscript-text-block[@data-omni-key='TextBlock2']//lightning-formatted-rich-text[contains(normalize-space(.),'för ytterligare signering')]").click();
            await this.page.locator("//vlocity_cmt-omniscript-text-block[@data-omni-key='TextBlock2']//lightning-formatted-rich-text[contains(normalize-space(.),'RA SalesManager')]").click();
            //Defect is raised for the english text B2XSET-307959
            await this.page.locator("//div[contains(@class,'show')]//button[contains(normalize-space(.) , 'Next')]").click();
        }
        await this.cartFrameScrive.locator("//table[@class='detailList']/tbody/tr[1]/td[text()='Draft']").click();
        await this.cartFrameScrive.locator("//table[@class='detailList']/tbody/tr[1]/td[contains(text(),'Avtal RA-')]").click();
        await this.cartFrameScrive.locator("//table[@class='detailList']//td[text()='Delivery']//following-sibling::td[text()='Email']").click();
        await this.cartFrameScrive.getByText('Signing Party').first().click();
        await this.cartFrameScrive.locator('span').filter({ hasText: /^Viewer$/ }).click();
        await this.cartFrameScrive.getByRole('link', { name: 'Skicka' }).click();
        await this.cartFrameScrive.getByRole('cell', { name: 'Sent' }).click();
        await this.cartFrameScrive.getByRole('cell', { name: 'Avtal RA-' }).first().click();
        await this.cartFrameScrive.locator("//td[text()='Avtal']//following-sibling::td/a").first().click();
        await this.page.locator('lightning-formatted-text').filter({ hasText: 'Skickat för signering' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='TUPP Ärendenummer']//..//..//..//lightning-formatted-text").first().hover();
        await this.page.locator("//article[@aria-label='Scrive Dokument']//a//span[contains(normalize-space(.),'Avtal RA-')]").first().hover();
    }



    async performMCSalesContractManualSigning(utilityFunction) {
        await this.page.locator("//button[text()='Manuellt signerat document mottaget']").click();
        await this.page.locator("//h2[text()='Manuellt signerat document mottaget']").click();
        const todaysDate = await utilityFunction.TodaysDate();
        await this.page.locator("//input[@name='Received_Date']").click();
        await this.page.locator("//input[@name='Received_Date']").type(todaysDate);
        await this.page.locator("//input[@name='CustomerSignedDate']").click();
        await this.page.locator("//input[@name='CustomerSignedDate']").type(todaysDate);
        //await this.page.getByLabel('Ladda upp dokument.').setInputFiles([]);
        //await this.page.locator("//label[contains(@id,'file-selector-label-')]").getByText('Ladda upp filer').nth(1).click();
        await this.page.getByLabel('Ladda upp dokument.').setInputFiles('./resources/TestDataFiles/Avtal_Telia_RiksbyggenBostadsrattsforeningTorpet.pdf');
        await this.page.getByRole('button', { name: 'Klart' }).click();
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Nästa' }).click();
        await this.cartFrameScrive.getByRole('cell', { name: 'Signed' }).click();
        await this.cartFrameScrive.locator("//table[@class='detailList']/tbody/tr[3]/td[text()='In-person meeting']").click();
        await this.cartFrameScrive.locator("//table[@class='detailList']/tbody/tr[1]/td[contains(text(),'_Manual')]").first().click();
        await this.cartFrameScrive.locator("//td[text()='Avtal']//following-sibling::td/a").first().click();
        await this.page.locator('lightning-formatted-text').filter({ hasText: 'Signerat' }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='TUPP Ärendenummer']//..//..//..//lightning-formatted-text").first().hover();
        await this.page.locator("//article[@aria-label='Scrive Dokument']//a//span[contains(normalize-space(.),'_Manual')]").first().hover();
        await this.page.locator("//article[@aria-label='Scrive Dokument']//span[contains(@title,'Signed')]").hover();
    }



    async performCRMFiberContractActivation(utilityFunction, OpportunityName) {
        var status = await utilityFunction.RunSOQLQuery("select status from contract where Name like '" + OpportunityName + "%'");
        for (let i = 1; i <= 30; i++) {
            status = await utilityFunction.RunSOQLQuery("select status from contract where Name like '" + OpportunityName + "%'");
            await this.page.waitForTimeout(6000);
            if (status === "Active") {
                await this.page.reload();
                await this.page.getByRole('button', { name: 'Redigera Status' }).click();
                await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status' and @data-value='Aktivt']").first().click()
                await this.contractAvbrytButton.click();
                break;
            }
        }
        if (status !== "Active") {
            console.log("The CRM Fiber contract activation failed and status is - " + status);
            expect(true).toBe(false);
        }
        status = await utilityFunction.RunSOQLQuery("select StageName from opportunity where Name= '" + OpportunityName + "'");
        if (!(status.includes("Vunnen"))) {
            console.log("The CRM Fiber opportunity closure failed and status is - " + status);
            expect(true).toBe(false);
        }
    }



    async verifyCRMFiberContractTerminationStatus(utilityFunction, OpportunityName) {
        var status = await utilityFunction.RunSOQLQuery("select status from contract where Name like '" + OpportunityName + "%'");
        for (let i = 1; i <= 10; i++) {
            status = await utilityFunction.RunSOQLQuery("select status from contract where Name like '" + OpportunityName + "%'");
            await this.page.waitForTimeout(2000);
            if (status === "Cancelled") {
                await this.page.reload();
                await this.page.getByRole('button', { name: 'Redigera Status' }).click();
                await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Status' and @data-value='Avbruten']").first().click()
                await this.contractAvbrytButton.click();
                break;
            }
        }
        if (status !== "Cancelled") {
            console.log("The CRM Fiber contract termination failed and status is - " + status);
            expect(true).toBe(false);
        }
    }



    async PerformMCSalesContractTermination(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const accountID = await utilityFunction.RunSOQLQuery("select id from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        var contractID = await utilityFunction.RunSOQLQuery("select id from contract where Org_Nr__c = '" + TestData.get("OrgNumber") + "' and status = 'Active' and Contract_Record_Type__c = 'Ramavtal'");
        const WorkingDate = await utilityFunction.getWeekdayFromSpecifiedDaysFromToday(180);
        //await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Account/" + accountID + "/view");
        //await this.page.locator("//records-record-layout-item[@field-label='Ramavtalsnummer']//a").click();
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Contract/" + contractID + "/view");
        await this.page.waitForTimeout(5000);
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Avtalsnummer']//..//..//..//lightning-formatted-text").click();
        //await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avbryt avtalsavslut']")
        const button = await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avbryt avtalsavslut']").count();
        if (button) {
            await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avbryt avtalsavslut']").click();
            await this.contractAktivtStatus.click();
            await this.page.reload();
        }
        await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avsluta avtal']").click();
        await this.page.getByRole('heading', { name: 'Avslutsdetaljer' }).click();
        if (TestData.get("SalesFlowType") === "ContractFullTermination") {
            var contractID, contractLineItemID, productList;
            await this.page.locator('label').filter({ hasText: 'Terminering av hela ramavtalet' }).locator('span').first().click();
            //await this.page.getByLabel('*undefined').click();
            await this.page.getByLabel('*Avsluta datum').click();
            await this.page.getByRole('button', { name: 'Next Month' }).click();
            await this.page.getByRole('button', { name: 'Next Month' }).click();
            await this.page.getByRole('button', { name: 'Next Month' }).click();
            await this.page.getByRole('button', { name: 'Next Month' }).click();
            await this.page.locator("//div[contains(@class,'datepicker')]/table//td/span[text()='27']").first().click();
            await this.page.locator('label').filter({ hasText: 'Initierat av Kunden' }).locator('span').first().click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            productList = (TestData.get("Products")).split(";");
            for (let i = 0; i < productList.length; i++) {
                await expect(this.page.getByRole('table')).toContainText(productList[i]);
            }
            await expect(this.page.getByRole('article')).toContainText('Produktfamilj ska avslutas');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Uppsägningsformulär' }).click();
            await expect(this.page.getByRole('article')).toContainText('Bredband Plus: https://casey.telia.se/casey/registration/2165');
            await expect(this.page.getByRole('article')).toContainText('Bredband Pro: https://casey.telia.se/casey/registration/2178');
            await expect(this.page.getByRole('article')).toContainText('Bredband Start: https://casey.telia.se/casey/registration/2087');
            await expect(this.page.getByRole('article')).toContainText('Cloud VPN SD-Wan/Firewall: https://casey.telia.se/casey/registration/2194');
            await expect(this.page.getByRole('article')).toContainText('Cloud VPN Wifi/Lan: https://casey.telia.se/casey/registration/2194');
            await expect(this.page.getByRole('article')).toContainText('Datanet: Ett E-post med Organisationsnummer samt Avtalsnummer skickas till enterprise-servicedesk@teliacompany.com av kund eller säljare.');
            await expect(this.page.getByRole('article')).toContainText('IT-avdelning som tjänst: Kontakta din TAM för att avsluta avtalet.');
            await expect(this.page.getByRole('article')).toContainText('IT-support Plus: https://casey.telia.se/casey/registration/3382');
            await expect(this.page.getByRole('article')).toContainText('IT-support Standard: https://casey.telia.se/casey/registration/3382');
            await expect(this.page.getByRole('article')).toContainText('Jobbmobil: Klicka här (Vid uppsägning av mobilavtal behöver även Touchpoint Plus sägas upp)');
            await expect(this.page.getByRole('article')).toContainText('Office 365: Kunden säger själv upp Microsoft 365 via Cloud Hub, för att se hela processen, se Microsoft 365 i produktguiden.');
            await expect(this.page.getByRole('article')).toContainText('Operator Connect: För att avsluta produkten behöver du följa rutinen i Produktguiden http://produktguiden.telia.se/PG/control/viewProdPage?command=getProdPage&view=804&pageId=916852');
            await expect(this.page.getByRole('article')).toContainText('Personlig tekniker: https://casey.telia.se/casey/registration/2132');
            await expect(this.page.getByRole('article')).toContainText('Smart Connect: För att avsluta produkten behöver du följa rutinen i Produktguiden: Produktsida (telia.se)');
            await expect(this.page.getByRole('article')).toContainText('Smart säkerhet: Kunden säger själv upp Smart säkerhet via Cloud Hub, för att se hela processen, se Smart Säkerhet i produktguiden.');
            //R23.04 - LTAT-25578 - Sales stop of TP Offering in AMANDA
            //await expect(this.page.getByRole('article')).toContainText('Touchpoint: https://casey-ext.han.telia.se/1075 ');
            await expect(this.page.getByRole('article')).toContainText('Touchpoint Plus: För att säga upp ett befintligt Touchpoint Plus-avtal, maila till:tppmuca-order@teliacompany.com');
            await this.page.locator("//div[contains(@class,'slds-show')]//button//span[text()='Next' or text()='Nästa' or text()='Gjort' or text()='Klar']").click();
            await this.contractAktivtStatus.click();
            await this.page.reload();
            await this.page.locator('lightning-formatted-text').filter({ hasText: 'Initierat av Kunden' }).click();
            await expect(this.page.locator("//records-record-layout-item[@field-label='Avslutsdatum']//lightning-formatted-text")).toBeTruthy();
            contractID = await utilityFunction.RunSOQLQuery("select id from contract where Org_Nr__c = '" + TestData.get("OrgNumber") + "' and status = 'Active' and Contract_Record_Type__c = 'Ramavtal'");
            for (let i = 0; i < productList.length; i++) {
                contractLineItemID = await utilityFunction.RunSOQLQuery("select id from vlocity_cmt__ContractLineItem__c where vlocity_cmt__ContractId__c = '" + contractID + "' and vlocity_cmt__ProductName__c = '" + productList[i] + "'");
                await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/vlocity_cmt__ContractLineItem__c/" + contractLineItemID + "/view");
                await this.page.locator("//records-record-layout-item[@field-label='Name']//lightning-formatted-text[contains(text(),'" + productList[i] + "')]").click();
                await expect(this.page.locator("//records-record-layout-item[@field-label='Terminate Date']//lightning-formatted-text")).toBeTruthy();
                await this.page.locator("//records-record-layout-item[@field-label='Termination Reason']//lightning-formatted-text[contains(text(),'Initierat av Kunden')]").click();
            }
        } else if (TestData.get("SalesFlowType") === "ContractPartialTermination") {
            await this.page.locator('label').filter({ hasText: 'Delvis terminering/Terminering av specifika produkter' }).locator('span').first().click();
            await this.page.locator('label').filter({ hasText: 'Initierat av Kunden' }).locator('span').first().click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Välj produkt att avsluta' }).click();
            var contractID, contractLineItemID, productList;
            contractID = await utilityFunction.RunSOQLQuery("select id from contract where Org_Nr__c = '" + TestData.get("OrgNumber") + "' and status = 'Active' and Contract_Record_Type__c = 'Ramavtal'");
            productList = (TestData.get("Products")).split(";");
            for (let i = 0; i < productList.length; i++) {
                await expect(this.page.getByRole('grid')).toContainText(productList[i]);
            }
            await this.page.locator("//vlocity_cmt-omniscript-step[@data-omni-key='Contract_partial_termination_step']//table//lightning-base-formatted-text[text()='" + TestData.get("ProductToBeTerminated") + "']//ancestor::tr//td[@data-label='AVSLUTSDATUM']//button").click();
            await this.page.locator("//label[text()='AVSLUTSDATUM']//parent::div//input").fill(WorkingDate);
            await this.page.getByRole('heading', { name: 'Välj produkt att avsluta' }).click();
            await this.page.getByRole('heading', { name: 'Välj produkt att avsluta' }).click();
            await this.page.getByRole('grid').filter({ hasText: TestData.get("ProductToBeTerminated") }).click();
            await this.page.getByRole('grid').filter({ hasText: TestData.get("ProductToBeTerminated") }).click();
            await this.page.getByRole('button', { name: 'Avsluta', exact: true }).click();
            await this.page.getByRole('heading', { name: 'Uppsägningsformulär' }).click();
            switch (TestData.get("ProductToBeTerminated")) {
                case "Mobilupplägg TOTAL":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Jobbmobil: Klicka här (Vid uppsägning av mobilavtal bör även växeltjänster sägas upp)');
                    }
                case "Mobilupplägg All-IN+":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Jobbmobil: Klicka här (Vid uppsägning av mobilavtal bör även växeltjänster sägas upp)');
                    }
                case "Bredband Plus":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Bredband Plus: https://casey.telia.se/casey/registration/2165');
                    }
                case "Bredband Pro":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Bredband Pro: https://casey.telia.se/casey/registration/2178');
                    }
                case "Bredband Start":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Bredband Start: https://casey.telia.se/casey/registration/2087');
                    }
                case "Cloud VPN SD-Wan/Firewall":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Cloud VPN SD-Wan/Firewall: https://casey.telia.se/casey/registration/2194');
                    }
                case "Cloud VPN Wifi/Lan":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Cloud VPN Wifi/Lan: https://casey.telia.se/casey/registration/2194');
                    }
                case "Datanet":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Datanet: Ett E-post med Organisationsnummer samt Avtalsnummer skickas till enterprise-servicedesk@teliacompany.com av kund eller säljare.');
                    }
                case "IT-avdelning":
                    {
                        await expect(this.page.getByRole('article')).toContainText('IT-avdelning som tjänst: Kontakta din TAM för att avsluta avtalet.');
                    }
                case "IT-support Plus":
                    {
                        await expect(this.page.getByRole('article')).toContainText('IT-support Plus: https://casey.telia.se/casey/registration/3382');
                    }
                case "IT-support Standard":
                    {
                        await expect(this.page.getByRole('article')).toContainText('IT-avdelning som tjänst: Kontakta din TAM för att avsluta avtalet.');
                        await expect(this.page.getByRole('article')).toContainText('IT-support Standard: https://casey.telia.se/casey/registration/3382');
                    }
                case "Microsoft 365":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Office 365: Kunden säger själv upp Microsoft 365 via Cloud Hub, för att se hela processen, se Microsoft 365 i produktguiden.');
                    }
                case "Operator Connect":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Operator Connect: För att avsluta produkten behöver du följa rutinen i Produktguiden http://produktguiden.telia.se/PG/control/viewProdPage?command=getProdPage&view=804&pageId=916852');
                    }
                case "Smart Connect":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Smart Connect: För att avsluta produkten behöver du följa rutinen i Produktguiden: Produktsida (telia.se)');
                    }
                case "Smart säkerhet":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Smart säkerhet: Kunden säger själv upp Smart säkerhet via Cloud Hub, för att se hela processen, se Smart Säkerhet i produktguiden.');
                    }
                case "Touchpoint":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Touchpoint: https://casey-ext.han.telia.se/1075 ');
                    }
                case "Touchpoint Plus":
                    {
                        await expect(this.page.getByRole('article')).toContainText('Touchpoint Plus: För att säga upp ett befintligt Touchpoint Plus-avtal, maila till:tppmuca-order@teliacompany.com');
                    }
            }
            await this.page.locator("//div[contains(@class,'slds-show')]//button//span[text()='Next' or text()='Nästa' or text()='Gjort' or text()='Klar']").click();
            await this.contractAktivtStatus.click();
            await this.page.reload();
            contractLineItemID = await utilityFunction.RunSOQLQuery("select id from vlocity_cmt__ContractLineItem__c where vlocity_cmt__ContractId__c = '" + contractID + "' and vlocity_cmt__ProductName__c = '" + TestData.get("ProductToBeTerminated") + "'");
            await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/vlocity_cmt__ContractLineItem__c/" + contractLineItemID + "/view");
            await this.page.locator("//records-record-layout-item[@field-label='Name']//lightning-formatted-text[contains(text(),'" + TestData.get("ProductToBeTerminated") + "')]").click();
            await this.page.locator("//records-record-layout-item[@field-label='Terminate Date']//lightning-formatted-text[contains(text(),'" + WorkingDate + "')]").click();
            await this.page.locator("//records-record-layout-item[@field-label='Termination Reason']//lightning-formatted-text[contains(text(),'Initierat av Kunden')]").click();
        }
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/r/Contract/" + contractID + "/view");
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Avtalsnummer']//..//..//..//lightning-formatted-text").click();
        await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avbryt avtalsavslut']").click();
        await this.contractAktivtStatus.click();
        await this.page.reload();
        await expect(this.page.locator("//records-record-layout-item[@field-label='Orsak till avslut']//lightning-formatted-text")).toBeEmpty();
        await expect(this.page.locator("//records-record-layout-item[@field-label='Avslutsdatum']//lightning-formatted-text")).toBeEmpty();
    }



    async PerformMCRMFiberContractTermination(TestData, utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const WorkingDate = await utilityFunction.TodaysDate();
        const button = await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avbryt avtalsslut']").count();
        if (button) {
            await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avbryt avtalsslut']").click();
            await this.contractAktivtStatus.click();
            await this.page.reload();
        }
        await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avsluta avtal']").click();
        await this.page.getByRole('heading', { name: 'Avsluta kontrakt' }).click();
        await this.page.getByRole('combobox', { name: '*Anledning för uppsägning' }).click();
        await this.page.getByText('Pris', { exact: true }).first().click();
        await this.page.getByRole('combobox', { name: 'Ny Leverantör' }).click();
        await this.page.getByText('Tele2', { exact: true }).first().click();
        await this.page.getByLabel('*Uppsägning kommentar').fill('Test Automation Comment');
        await this.page.getByLabel('Antal portar').click();
        await this.page.locator("//vlocity_cmt-omniscript-date[@data-omni-key='Contract_Termination_Date']//input").click();
        await this.page.locator("//div[contains(@class,'datepicker') and @aria-label='Date picker']//td[contains(@class,'today')]/span").click();
        //await this.page.locator("//vlocity_cmt-omniscript-date[@data-omni-key='Contract_Termination_Date']//input").fill(WorkingDate);
        await this.page.getByRole('button', { name: 'Nästa' }).click();
        await this.contractAktivtStatus.click();
        await this.page.reload();
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Uppsägning kommentar']//..//..//..//lightning-formatted-text")).toContainText("Test Automation Comment");
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Anledning för uppsägning']//..//..//..//lightning-formatted-text")).toContainText("Pris");
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Ny leverantör']//..//..//..//lightning-formatted-text")).toContainText("Tele2");
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Avtalets nedtagsdatum']//..//..//..//lightning-formatted-text")).toContainText(WorkingDate);
    }



    async PerformMCRMFiberContractCancelTermination() {
        await this.page.locator("//div[contains(@class,'active')]//button[normalize-space(.)='Avbryt avtalsslut']").click();
        await this.contractAktivtStatus.click();
        await this.page.reload();
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Uppsägning kommentar']//..//..//..//lightning-formatted-text")).toBeEmpty();
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Anledning för uppsägning']//..//..//..//lightning-formatted-text")).toBeEmpty();
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Ny leverantör']//..//..//..//lightning-formatted-text")).toBeEmpty();
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Avtalets nedtagsdatum']//..//..//..//lightning-formatted-text")).toBeEmpty();
    }



    async CreateCRMFiberStandaloneContract(TestData, utilityFunction) {
        const accountName = await utilityFunction.RunSOQLQuery("select Name from account where Org_Nr__c= \'" + TestData.get("OrgNumber") + "\'");
        await this.page.getByRole('link', { name: 'Avtal', exact: true }).click();
        await this.page.getByRole('button', { name: 'Ny' }).click();
        await this.page.getByRole('textbox', { name: 'Avtalsnamn' }).fill(TestData.get("OpportunityName"));
        await this.page.getByLabel('*Kontonamn').type(accountName);
        await this.page.locator("//records-record-layout-item[@field-label='Kontonamn']//div[contains(@class,'list')]//ul//li[contains(normalize-space(.),'" + accountName + "')]").first().click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Varumärke']").first().click();
        await this.page.getByTitle(TestData.get("Varumarke"), { exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Adresstyp']").first().click();
        await this.page.getByText('MDU').click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Anslutningstyp']").first().click();
        await this.page.getByTitle('KO 3.1').click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Kommun']").first().click();
        await this.page.getByText('Ale', { exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Region']").first().click();
        await this.page.getByText('MDU Stockholm').click();
        await this.page.getByLabel('*Avtalstid (år)').click();
        await this.page.getByLabel('*Avtalstid (år)').fill('5');
        await this.page.getByLabel('*Avtalslängd (månader)').click();
        await this.page.getByLabel('*Avtalslängd (månader)').fill('60');
        await this.page.getByLabel('*Önskat leveransdatum').click();
        await this.page.getByRole('button', { name: '15' }).click();
        await this.page.getByLabel('*Fastighetsbeteckning').click();
        await this.page.getByLabel('*Fastighetsbeteckning').fill('ABCD123');
        await this.page.getByRole('button', { name: 'Spara', exact: true }).click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Utkast']").click();
        await this.changeTheStatusToNext.click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Skickat för signering']").click();
        await this.page.getByRole('button', { name: 'Redigera Status' }).click();
        await this.contractStatusPicklist1.click();
        await this.page.getByLabel('Avtalsinformation').getByText('Signerat').first().click();
        await this.contractSparaButton.click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Signerat']").click();
        await this.page.getByRole('button', { name: 'Redigera Status' }).click();
        await this.contractStatusPicklist1.click();
        await this.page.getByLabel('Avtalsinformation').getByText('Aktivt').first().click();
        await this.contractSparaButton.click();
        await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Status']//..//..//..//lightning-formatted-text[text()='Aktivt']").click();
    }



    async verifyCRMFiberQuoteToContractDataFlow(TestData, utilityFunction) {
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
        await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Switchbyte']//..//..//..//lightning-formatted-text")).toContainText(Switchbyte);
    }


    async verifyCRMFiberOrderunderlagFunctionality(TestData, utilityFunction) {
        const AccountName = await utilityFunction.RunSOQLQuery("select Name from account where Org_Nr__c= '" + TestData.get("OrgNumber") + "'");
        const contractNumber = await utilityFunction.RunSOQLQuery("select ContractNumber from contract where Name like '%" + TestData.get("OpportunityName") + "%' and Org_Nr__c= '" + TestData.get("OrgNumber") + "'");
        await this.page.locator('button').filter({ hasText: 'Skapa Orderunderlag' }).click();
        await expect(this.page.locator('#modal-content-id-1')).toContainText('Vill du fortsätta till Orderunderlaget?');
        await this.page.getByText('Cancel', { exact: true }).click();
        await this.page.locator('button').filter({ hasText: 'Skapa Orderunderlag' }).click();
        await this.page.getByText('Continue', { exact: true }).click();
        if (TestData.get("OrderunderlagType") === "FullOrderunderlag") {
            await this.page.getByRole('heading', { name: 'Typ av Orderunderlag' }).click();
            await this.page.getByText('Orderunderlag - Light').click();
            await this.page.getByText('Orderunderlag', { exact: true }).click();
            await this.page.getByRole('button', { name: 'Next' }).click();
            await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Varumärke']")).toContainText('Telia XLAN');
            await this.page.getByPlaceholder('Select an Option').click();
            await this.page.getByText('Current Selection:Omfö').click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Offerttyp']").first().click();
            await this.page.getByText('Migrering 4.1 till').click();
            await this.page.getByLabel('WBS-nummer').fill('11111');
            await expect(this.page.getByLabel('Avtalsnummer Salesforce', { exact: true })).toHaveValue(contractNumber.toString());
            await this.page.getByLabel('Tidigare avtalsnummer').fill('22222');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('Handläggare', { exact: true })).toHaveValue('CRM Fiber Sales Rep');
            await expect(this.page.getByLabel('Handläggare - Telefonnummer')).toHaveValue('+91 1234567890');
            await expect(this.page.getByLabel('Handläggare - Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await expect(this.page.getByLabel('Säljare i avtalet', { exact: true })).toHaveValue('CRM Fiber Sales Rep');
            await expect(this.page.getByLabel('Säljare i avtalet - Telefonnummer')).toHaveValue('+91 1234567890');
            await expect(this.page.getByLabel('Säljare i avtalet - Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await expect(this.page.getByLabel('Avtalspart', { exact: true })).toHaveValue(AccountName);
            await expect(this.page.getByLabel('Organisationsnummer')).toHaveValue((TestData.get("OrgNumber")).toString());
            await expect(this.page.getByLabel('Namn ut mot kund')).toHaveValue(AccountName);
            await expect(this.page.getByLabel('KO-nummer/A-nr', { exact: true })).toHaveValue('abc123');
            await this.page.getByLabel('*Fakturaadress - Gatuadress').fill('FakturaAddress-Gatuaddess');
            await this.page.getByLabel('*Fakturaadress - Postnummer').fill('16959');
            await this.page.getByLabel('*Fakturaadress - Postort').fill('Solna');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('*Beställare hos avtalspart -')).toHaveValue('Test Yogesh Jadhav');
            await expect(this.page.getByLabel('*Beställare - Telefonnummer')).toHaveValue('+46725048268');
            await expect(this.page.getByLabel('*Beställare - Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await expect(this.page.getByLabel('*Kontaktperson 1: Namn')).toHaveValue('Test Yogesh Jadhav');
            await expect(this.page.getByLabel('*Kontaktperson 1: Telefonnummer')).toHaveValue('+46725048268');
            await expect(this.page.getByLabel('*Kontaktperson 1: Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await this.page.getByLabel('*Kontaktperson 1: Gatuadress').fill('Kontaktperson Gatuaddress');
            await this.page.getByLabel('*Kontaktperson 1: Postnummer').fill('16989');
            await this.page.getByLabel('*Kontaktperson 1: Postort').fill('Sundbyberg');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('Avtalstid år')).toHaveValue('5');
            await expect(this.page.getByLabel('Hera-nummer eller FMO')).toHaveValue('HERAFMO');
            await expect(this.page.getByLabel('Leveranstid i avtalet (må')).toHaveValue('4-8');
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Nyproduktion']").first().click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Ska lev. ske i etapper?']").first().click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Extern fiber']").first().click();
            await this.page.getByText('Ja - Skickas som PDF till sä').first().click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByText('0Redigera Totalt antal portar').click();
            await this.page.getByText('0Redigera Varav antal hushåll').click();
            await this.page.getByText('0Redigera Varav antal lokaler').click();
            await this.page.getByLabel('Fastighetsnät').click();
            await this.page.getByText('Current Selection:Telia bygger Fastighetsnät Fiber').click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Kundägt nät?']").first().click();
            await this.page.getByRole('option', { name: 'Ja' }).locator('span').nth(1).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Tjänsteutbud']").first().click();
            await this.page.getByText('Kollektiv 3Play').click();
            await this.page.getByLabel('Stationsnamn').click();
            await this.page.getByLabel('Stationsnamn').fill('Stationsnamn');
            await this.page.getByLabel('Övrig information').click();
            await this.page.getByLabel('Övrig information').fill('Ovrig information');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('Antal Router')).toHaveValue('6671');
            await expect(this.page.getByLabel('Antal Tv-boxar')).toHaveValue('6671');
            await expect(this.page.getByLabel('Antal MC (hela paketet)')).toHaveValue('0');
            await expect(this.page.getByLabel('Antal Bredbandsswitch')).toHaveValue('0');
            await expect(this.page.getByLabel('Antal Trådlös Tv')).toHaveValue('0');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('Etableringsavgift för')).toHaveValue('90000 kr');
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Näthyra' and @data-value='Nej']").first().click();
            await this.page.getByRole('option', { name: 'Ja' }).locator('span').nth(1).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Serviceavtal']").first().click();
            await this.page.getByRole('option', { name: 'Ja' }).locator('span').nth(1).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('row', { name: 'Ange specifik instruktion' }).getByLabel('').fill('Comment1');
            await this.page.getByRole('row', { name: 'Finns det specifik information gällande detta avtal som inte ingår i övrig' }).getByLabel('').fill('Comment2');
            await this.page.getByRole('row', { name: 'Skriv in den specifika information som ska presenteras för Telias handläggare i Billing-processen', exact: true }).getByLabel('').fill('Comment3');
            await this.page.getByRole('row', { name: 'Var anges uppgifter om Teknisk(a) kontaktperson(er)?' }).getByLabel('').fill('Comment4');
            await this.page.getByRole('row', { name: 'Ange EN gemensam kontaktväg för hela KO-avtalet' }).getByLabel('').fill('Comment5');
            await this.page.getByRole('row', { name: 'Finns det information till tekniker som är specifik för just detta KO-avtal?' }).getByLabel('').fill('Comment6');
            await this.page.getByRole('row', { name: 'Ange den ytterligare information som för just detta specifika KO-avtal ska presenteras för tekniker som skickas till kunden' }).getByLabel('').fill('Comment7');
            await this.page.getByRole('row', { name: 'Finns det specifik information för just detta avtal som ska presenteras för extern tjänsteleverantör för användande i Service/support-processen som ej framgår av övrig registrering?' }).getByLabel('').fill('Comment8');
            await this.page.getByRole('row', { name: 'Skriv in den specifika information som ska presenteras för extern tjä' }).getByLabel('').fill('Comment9');
            await this.page.getByRole('row', { name: 'Finns det specifik information i just detta avtal som ska presenteras för' }).getByLabel('').fill('Comment10');
            await this.page.getByRole('row', { name: 'Skriv in den specifika information som ska presenteras för Telias handläggare i SA-processen', exact: true }).getByLabel('').fill('Comment11');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('heading', { name: 'Fyll i formuläret nedan:' }).click();
            await expect(this.page.getByRole('paragraph')).toContainText('För att gå vidare använd alltid knappen "Nästa" och för att gå tillbaka använd knappen" Föregående"');
            await this.page.getByRole('button', { name: 'Skapa Orderunderlaget' }).click();
            await this.page.getByText('Vill du skapa orderunderlaget?').click();
            await this.page.getByRole('button', { name: 'Ja' }).click();
            await this.page.getByRole('heading', { name: 'Skapat Orderunderlag' }).click();
            const page1Promise = this.page.waitForEvent('popup');
            const downloadPromise = this.page.waitForEvent('download');
            await this.page.getByRole('button', { name: 'Ladda ner Excel-fil' }).click();
            const page1 = await page1Promise;
            const download = await downloadPromise;
            await this.page.getByRole('button', { name: 'Gå tillbaka till avtalet' }).click();
            await this.page.locator('span').filter({ hasText: 'Vill du gå tillbaka till' }).click();
            await this.page.getByRole('button', { name: 'Continue' }).click();
            await this.page.getByRole('tab', { name: 'Avtalsdokument' }).click();
            await expect(this.page.getByLabel('Anteckningar och bilagor')).toContainText('Orderunderlag _Full_' + AccountName);
            await expect(this.page.getByLabel('Anteckningar och bilagor')).toContainText('xlsx');
        } else if (TestData.get("OrderunderlagType") === "PartialOrderunderlag") {
            await this.page.getByRole('heading', { name: 'Typ av Orderunderlag' }).click();
            await this.page.getByText('Orderunderlag - Light').click();
            await this.page.getByRole('button', { name: 'Next' }).click();
            await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Varumärke']")).toContainText('Zitius');
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Typ av affär']").first().click();
            await this.page.getByText('Överlåtelse').click();
            await this.page.getByLabel('WBS-nummer').click();
            await this.page.getByLabel('WBS-nummer').fill('11111');
            await expect(this.page.getByLabel('Avtalsnummer Salesforce', { exact: true })).toHaveValue(contractNumber.toString());
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('Handläggare', { exact: true })).toHaveValue('CRM Fiber Sales Rep');
            await expect(this.page.getByLabel('Handläggare - Telefonnummer')).toHaveValue('+91 1234567890');
            await expect(this.page.getByLabel('Handläggare - Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await expect(this.page.getByLabel('Säljare i avtalet', { exact: true })).toHaveValue('CRM Fiber Sales Rep');
            await expect(this.page.getByLabel('Säljare i avtalet - Telefonnummer')).toHaveValue('+91 1234567890');
            await expect(this.page.getByLabel('Säljare i avtalet - Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await expect(this.page.getByLabel('Avtalspart', { exact: true })).toHaveValue(AccountName);
            await expect(this.page.getByLabel('Organisationsnummer')).toHaveValue((TestData.get("OrgNumber")).toString());
            await expect(this.page.getByLabel('Namn ut mot kund')).toHaveValue(AccountName);
            await expect(this.page.getByLabel('KO-nummer/A-nr', { exact: true })).toHaveValue('abc123');
            await expect(this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//button[@aria-label='Fakturametod']/span")).toContainText('Papper');
            await this.page.getByLabel('*Fakturaadress - Gatuadress').click();
            await this.page.getByLabel('*Fakturaadress - Gatuadress').fill('Fakturaaddress Gatuaddress');
            await this.page.getByLabel('*Fakturaadress - Postnummer').click();
            await this.page.getByLabel('*Fakturaadress - Postnummer').fill('16959');
            await this.page.getByLabel('*Fakturaadress - Postort').click();
            await this.page.getByLabel('*Fakturaadress - Postort').fill('Solna');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('*Beställare hos avtalspart -')).toHaveValue('Test Yogesh Jadhav');
            await expect(this.page.getByLabel('*Beställare - Telefonnummer')).toHaveValue('+46725048268');
            await expect(this.page.getByLabel('*Beställare - Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await expect(this.page.getByLabel('*Kontaktperson 1: Namn')).toHaveValue('Test Yogesh Jadhav');
            await expect(this.page.getByLabel('*Kontaktperson 1: Telefonnummer')).toHaveValue('+46725048268');
            await expect(this.page.getByLabel('*Kontaktperson 1: Epost')).toHaveValue('yogesh.jadhav@teliacompany.com');
            await this.page.getByLabel('*Kontaktperson 1: Gatuadress').click();
            await this.page.getByLabel('*Kontaktperson 1: Gatuadress').fill('Kontaktperson gatuaddress');
            await this.page.getByLabel('*Kontaktperson 1: Postnummer').click();
            await this.page.getByLabel('*Kontaktperson 1: Postnummer').fill('16899');
            await this.page.getByLabel('*Kontaktperson 1: Postort').click();
            await this.page.getByLabel('*Kontaktperson 1: Postort').fill('Sundbyberg');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await expect(this.page.getByLabel('Totalt antal portar')).toHaveValue('400');
            await this.page.getByRole('button', { name: 'Nästa' }).click();
            await this.page.getByLabel('Övrig information').click();
            await this.page.getByLabel('Övrig information').fill('Ovrig information');
            await this.page.getByRole('heading', { name: 'Fyll i formuläret nedan:' }).click();
            await expect(this.page.getByRole('paragraph')).toContainText('För att gå vidare använd alltid knappen "Nästa" och för att gå tillbaka använd knappen" Föregående"');
            await this.page.getByRole('button', { name: 'Skapa Orderunderlaget' }).click();
            await this.page.getByText('Vill du skapa orderunderlaget?').click();
            await this.page.getByRole('button', { name: 'Ja' }).click();
            await this.page.getByRole('heading', { name: 'Skapat Orderunderlag' }).click();
            const page1Promise = this.page.waitForEvent('popup');
            const downloadPromise = this.page.waitForEvent('download');
            await this.page.getByRole('button', { name: 'Ladda ner Excel-fil' }).click();
            const page1 = await page1Promise;
            const download = await downloadPromise;
            await this.page.getByRole('button', { name: 'Gå tillbaka till avtalet' }).click();
            await this.page.locator('span').filter({ hasText: 'Vill du gå tillbaka till' }).click();
            await this.page.getByRole('button', { name: 'Continue' }).click();
            await this.page.getByRole('tab', { name: 'Avtalsdokument' }).click();
            await expect(this.page.getByLabel('Anteckningar och bilagor')).toContainText('Orderunderlag _Light_' + AccountName);
            await expect(this.page.getByLabel('Anteckningar och bilagor')).toContainText('xlsx');
        }
    }


    async createTeliaContracts(LocalTestData, utilityFunctionLocal) {
        const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
        const accountName = await utilityFunctionLocal.RunSOQLQuery("select name from account where Org_Nr__c= \'" + LocalTestData.get("OrgNumber") + "\'");
        const todaysDate = await utilityFunctionLocal.TodaysDate();
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/o/Contract/list");
        if (LocalTestData.get("Profile") === "Admin") {
            await this.page.getByRole('button', { name: 'New' }).click();
            await this.page.getByRole('heading', { name: 'New Contract: Teliaavtal' }).click();
            await this.page.getByRole('combobox', { name: 'Contract Record Type' }).click();
            await this.page.getByRole('option', { name: LocalTestData.get("OpportunityRecordType") }).click();
            await this.page.getByLabel('Agreement Nr Org Nr').fill('11111111');
            await this.page.getByRole('combobox', { name: 'Solution Area' }).click();
            await this.page.getByRole('option', { name: 'Cloud/Data' }).click();
            await this.page.getByLabel('*Contract Start Date').click();
            await this.page.getByLabel('*Contract Start Date').fill(todaysDate);
            await this.page.getByLabel('*Contract Term (months)').fill('60');
            await this.page.getByLabel('*Account Name').click();
            await this.page.getByLabel('*Account Name').type(accountName, { delay: 300 });
            await this.page.getByRole('option', { name: accountName + " " + LocalTestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.page.getByRole('button', { name: 'Save', exact: true }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//*[text()='Status']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'Draft')]").first().click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Contract Record Type']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("OpportunityRecordType") + "')]").first().click();
            await this.page.getByRole('button', { name: 'Edit Contract Record Type' }).click();
            await this.page.getByRole('combobox', { name: 'Status' }).click();
            await this.page.getByLabel('Details').getByRole('option', { name: 'Activated' }).click();
            await this.page.getByRole('button', { name: 'Save' }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//*[text()='Status']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'Activated')]").first().click();
        } else if (LocalTestData.get("Profile") === "Large") {
            await this.page.getByRole('button', { name: 'Ny' }).click();
            await this.page.getByRole('heading', { name: 'Nytt avtal: Telia' }).click();
            await this.page.getByRole('combobox', { name: 'Contract Record Type' }).click();
            await this.page.getByRole('option', { name: LocalTestData.get("OpportunityRecordType") }).click();
            await this.page.getByLabel('*Avtalets slutdatum').click();
            await this.page.getByLabel('*Avtalets slutdatum').fill(todaysDate);
            await this.page.getByRole('combobox', { name: 'Avtalspart' }).click();
            await this.page.getByRole('option', { name: 'Addpro' }).click();
            await this.page.getByLabel('*Kontonamn').click();
            await this.page.getByLabel('*Kontonamn').type(accountName, { delay: 300 });
            await this.page.getByRole('option', { name: accountName + " " + LocalTestData.get("OrgNumber") }).getByTitle(accountName).click();
            await this.page.getByRole('button', { name: 'Spara', exact: true }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//*[text()='Status']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'Utkast')]").first().click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//span[text()='Contract Record Type']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'" + LocalTestData.get("OpportunityRecordType") + "')]").first().click();
            await this.page.getByRole('button', { name: 'Redigera Status' }).click();
            await this.page.getByRole('combobox', { name: 'Status' }).click();
            await this.page.getByLabel('Detaljer').getByRole('option', { name: 'Aktiverad' }).click();
            if (LocalTestData.get("OpportunityRecordType") === "Teliaavtal") {
                await this.page.getByLabel('*Avtalets startdatum').click();
                await this.page.getByLabel('*Avtalets startdatum').fill(todaysDate);
                await this.page.getByLabel('*Avtalslängd (månader)').fill('60');
            }
            await this.page.getByRole('button', { name: 'Spara' }).click();
            await this.page.locator("//div[contains(@class,'active') and contains(@class,'window')]//*[text()='Status']//..//..//..//lightning-formatted-text[contains(normalize-space(.),'Aktiverad')]").first().click();
        }
    }




}
module.exports = { ContractPage };