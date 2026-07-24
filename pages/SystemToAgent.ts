import { Page } from '@playwright/test';

export class CashInPage {
    constructor(private page: Page) {}

    async cashIn(phone: string, amount: string) {
        await this.page.getByRole('link', { name: 'Cash In' }).click();
        await this.page.getByRole('textbox', { name: 'Customer Phone Number' }).fill(phone);
        await this.page.getByRole('spinbutton', { name: 'Amount (BDT)' }).fill(amount);
        await this.page.getByRole('button', { name: 'Cash In →' }).click();
    }
}