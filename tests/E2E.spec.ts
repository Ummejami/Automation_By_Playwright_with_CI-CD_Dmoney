//npx playwright test .\\tests\\E2E.spec.ts --headed
//npx playwright codegen https://dmoneyportal.roadtocareer.net
import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/UserLogIn.ts';
import { Login} from '../pages/AuthorityLogIn.ts';
import { UserListPage} from '../pages/UserActivation.ts';
import { RegistrationPage } from '../pages/UserRegistration.ts';
import {CashInPage} from '../pages/SystemToAgent.ts';
import { generateEmail,generatePhone } from '../utils/Random.ts';

 
const email = generateEmail();
const phone = generatePhone();


test('TC_001: Navigate to DMoney Home Page,Click to Sigh up as Agent ', async ({ page }) => {
//......................... Visit Url .........................................

    await page.goto('/');
//............................. Click Sign Up Button............................
    const signUp = page.getByRole('banner').getByRole('link', { name: 'Sign Up' });
    await expect(signUp).toBeVisible();
    await signUp.click();

    const registrationPage = new RegistrationPage(page);

    await registrationPage.register(
        'Isabela Rose',
        email,
        '12345',
        phone,
        '1234567890123',
        'Agent'
    );

    
});

test('TC_002: Admin activates the newly registered Agent', async ({ page, request, context }) => {
    await page.goto('/login');
    const loginsystem = new Login(page, request, context);

    // Login as Admin
    await loginsystem.login(
        "admin@dmoney.com",
        "1234"
    );

    // Open User List
    const userList = new UserListPage(page);

    await userList.openUserList();

    // Search the newly created agent
    await userList.selectSearchType('Search by Email');
    await userList.searchByEmail(email);

    // Activate the user
    await userList.viewUser();
    await userList.editUser();
    await userList.changeStatus('Active');
    await userList.saveUser();

    // Assertion
    await expect(page.getByText(/User updated successfully/i)).toBeVisible();

    // Logout
    await userList.logout();
});

test('TC_003: System deposits 2000 Tk to the activated Agent', async ({ page, request, context }) => {

    // Navigate to Login page
    await page.goto('/login');

    // Login as System
    const loginsystem = new Login(page, request, context);

    await loginsystem.login(
        'system@dmoney.com',
        '1234'
    );

    // Deposit money to Agent
    const cashInPage = new CashInPage(page);

    await cashInPage.cashIn(
        phone,
        '2000'
    );

    // Assertion
    await expect(page.getByText(/System deposit to Agent successful/i)).toBeVisible();

    // Logout
    const userList = new UserListPage(page);
    await userList.logout();
});
test('TC_004: Agent logs in, verifies balance, and deposits 500 Tk to a customer', async ({ page, request, context }) => {

    const login = new LoginPage(page, request, context);

    // Login as Agent
    await login.clearPreviousAuth();
    await page.goto('/login');

    await login.login(
        phone,
        '12345'
    );

    // Verify Balance
    await page.getByRole('button', { name: 'Balance' }).click();
    await expect(page.getByText('2000')).toBeVisible();

    // Deposit 500 Tk to Customer
    const cashInPage = new CashInPage(page);

    await cashInPage.cashIn(
        '01773740459',
        '500'
    );

    // Verify successful transaction
    await expect(page.getByText(/Deposit successful/i)).toBeVisible();
});


/*
//.....................Agent Registration .....................................
test('Agent Registration', async ({ page,request, context}) => {
    const login = new LoginPage(
        page,
        request,
        context
    );
    const loginsystem = new Login(
        page,
        request,
        context
    );
//.................Visit Url.....................
  await page.goto('/');
//......................Sign Up page..........................
    const signUp = page.getByRole('banner').getByRole('link', { name: 'Sign Up' });
    await expect(signUp).toBeVisible();
    await signUp.click();
//...........................Sign Up Information....................
    const registrationPage = new RegistrationPage(page);
    await registrationPage.register(
        'Isabela Rose',
        email,
        '12345',
        phone,
        '1234567890123',
        'Agent'
    );
//.............................Back To Home Page..........................
    await page.getByRole('link', { name: /Back to Home/i }).click();
//............................Go to Login Page...........................

await page.getByRole('banner').getByRole('link', { name: 'Login' }).click();
//............................Admin LogIn...............................

    await loginsystem.login(
        "admin@dmoney.com",
        "1234"
    );

    await loginsystem.saveAuthState();
//..........................Active User.............................

   const userList = new UserListPage(page);

    await userList.openUserList();
    await userList.selectSearchType('Search by Email');
    await userList.searchByEmail(email);
    await userList.viewUser();
    await userList.editUser();
    await userList.changeStatus('Active');
    await userList.saveUser();
  


//................................Admin Logout...............................
   await userList.logout();
//................................System Login...............................

    await loginsystem.login(
        "system@dmoney.com",
        "1234"
    );

    await loginsystem.saveAuthState();

//...............................System To Agent......................................
    const cashInPage = new CashInPage(page);

    await cashInPage.cashIn(phone, '2000');
//............................System Logout..........................................
     await userList.logout();
 

//............................Agent Login.....................................................

    await login.clearPreviousAuth();
    await login.login(
        phone,
        "12345"
    );
    await login.saveAuthState();
    await page.getByRole('button', { name: 'Balance' }).click();
//...........................Assertion......................................
    await expect(page.getByText('2000')).toBeVisible();
//............................Agent To Customer.............................
    await cashInPage.cashIn('01773740459', '500');
});*/