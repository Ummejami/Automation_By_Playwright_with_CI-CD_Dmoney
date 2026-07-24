import { Page,expect} from '@playwright/test';

export class UserListPage {

    constructor(private page: Page) {}

    // Navigation
    async openUserList() {
    await this.page.getByRole('navigation').getByRole('link', { name: 'User List' }).click();
}

    // Search Type
    async selectSearchType(type: 'Search by Email' | 'Search by Role') {

    const searchType = this.page.locator('[role="combobox"]').first();

    await searchType.click();

    await this.page.getByRole('option', {
        name: type
    }).click();

    // Verify the selected value
   // await expect(searchType).toContainText(type);

    //console.log("Selected:", await searchType.textContent());
}


    // Search Email
     async searchByEmail(email: string) {

        await this.page.getByRole('textbox', {
            name: 'Enter Email'
        }).fill(email);
        
        await this.page.getByRole('button', {
            name: 'SEARCH'
        }).click();
       
        //await this.page.waitForTimeout(3000);
    }

  
    

    // View User
    async viewUser() {

        await this.page.getByRole('button', {
            name: 'VIEW'
        }).click();
    }

    // Edit User
    async editUser() {
    await this.page.getByRole('button', {
        name: 'Edit User'
    }).click();
}

    // Change Status
    async changeStatus(status: 'Active' | 'Suspended') {

        await this.page.locator('[role="combobox"]').nth(1).click();

        await this.page.getByRole('option', {
            name: status
        }).click();
    }

    // Save
    async saveUser() {

        await this.page.getByRole('button', {
            name: 'Save Changes'
        }).click();
    }
    //Admin Logout 
    async logout() {
    console.log("Page closed:", this.page.isClosed());

    await this.page.locator('svg').nth(2).click();

    const logout = this.page.getByRole('menuitem', {
        name: '🚪 Logout'
    });

    await expect(logout).toBeVisible();
    await logout.click();
}
}

