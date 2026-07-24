import { Page, APIRequestContext, BrowserContext, expect } from '@playwright/test';
import { readLatestEmail,getMessageId } from '../services/gmailAuth';
import { extractOTP } from '../utils/extractOTP';
import { mkdirSync, unlinkSync, existsSync } from 'fs';
import { dirname } from 'path';

export class LoginPage {

    constructor(
        private page: Page,
        private request: APIRequestContext,
        private context: BrowserContext
    ) {}

   private authPath = 'auth.json';

    async clearPreviousAuth() {
        if (existsSync(this.authPath)) {
            unlinkSync(this.authPath);
            await this.context.clearCookies();
            console.log("✓ Removed existing auth.json");
        }
    }

    async login(phone: string, password: string) {

        const previousOTP = extractOTP(
            await readLatestEmail(this.request)
        );
        console.log("PreOTP:",previousOTP);
       // await this.page.goto("/login");

        await this.page.getByRole("textbox", { name: "Email or Phone Number" }).fill(phone);

        await this.page.getByRole("textbox", { name: "Password" }).fill(password);

        await this.page.getByRole("button", { name: "Login →" }).click();

        let newOTP = "";

        for (let i = 0; i < 10; i++) {

            await this.page.waitForTimeout(1000);

            const currentOTP = extractOTP(
                await readLatestEmail(this.request)
            );

            if (currentOTP !== previousOTP) {
                newOTP = currentOTP;
                break;
            }
        }
       console.log("Previous OTP:", previousOTP);

    for (let i = 0; i < 10; i++) {
    await this.page.waitForTimeout(1000);

    const email = await readLatestEmail(this.request);
    const currentOTP = extractOTP(email);

    console.log(`Attempt ${i + 1}`);
    console.log("Current OTP:", currentOTP);

    if (currentOTP !== previousOTP) {
        console.log("New OTP found!");
        newOTP = currentOTP;
        break;
    }
}

        console.log("Final newOTP:", newOTP);

        await this.page.getByRole("textbox", { name: "Enter 4-Digit OTP" }).fill(newOTP);

        await this.page.getByRole("button", { name: "Verify OTP →" }).click();

        await this.page.waitForURL(/profile\/*/);
}
    

    async saveAuthState() {

        try {

            mkdirSync(dirname(this.authPath), {
                recursive: true
            });

            await this.page.context().storageState({
                path: this.authPath
            });

            console.log(`✓ Authentication state saved`);

        } catch (error) {

            console.error(error);
            throw error;
        }

    }

}

