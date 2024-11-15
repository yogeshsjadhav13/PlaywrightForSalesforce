const { expect } = require('@playwright/test');


class QuotePage {


    constructor(page) {
        this.page = page;
        this.nextSwedishButton = this.page.getByRole('button', { name: 'Nästa' });
        this.cartFrame = this.page.frameLocator('iframe[name*="vfFrameId"][height*="100%"]').first();
        this.searchbutton = this.cartFrame.getByPlaceholder('Sök').first();

    }

}
module.exports = { QuotePage };