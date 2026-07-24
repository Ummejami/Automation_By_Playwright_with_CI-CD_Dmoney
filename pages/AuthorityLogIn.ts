import { Page, APIRequestContext, BrowserContext, expect } from '@playwright/test';
import { readLatestEmail } from '../services/gmailAuth';
import { extractOTP } from '../utils/extractOTP';
import { mkdirSync, unlinkSync, existsSync } from 'fs';
import { dirname } from 'path';

export class Login {

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

        //await this.page.goto("/login");

        await this.page.getByRole("textbox", { name: "Email or Phone Number" }).fill(phone);

        await this.page.getByRole("textbox", { name: "Password" }).fill(password);

        await this.page.getByRole("button", { name: "Login →" }).click();

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