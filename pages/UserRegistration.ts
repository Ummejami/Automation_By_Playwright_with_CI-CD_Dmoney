import { Page } from '@playwright/test';

export class RegistrationPage {

    constructor(private page: Page) {}

    async register(
    name: string,
    email: string,
    password: string,
    phone: string,
    nid: string,
    role: 'Agent' | 'Customer' | 'Merchant'
) {
    await this.page.getByRole("textbox", { name: "Full Name" }).fill(name);
    await this.page.getByRole("textbox", { name: "Email Address" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("textbox", { name: "Phone Number" }).fill(phone);
    await this.page.getByRole("textbox", { name: "National ID (NID)" }).fill(nid);
    await this.page.locator('[role="combobox"]').click();
    await this.page.getByRole("option", { name: role }).click();
    await this.page.getByRole("button", {name: "Create Account →"}).click();

    console.log('Clicked Create Account');
    
}
}

 