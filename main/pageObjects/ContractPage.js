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



}
module.exports = { ContractPage };