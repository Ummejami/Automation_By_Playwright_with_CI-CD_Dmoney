# DMoney Playwright Automation Project

## Project Overview

This project automates the DMoney web application using **Playwright** with **TypeScript** following the **Page Object Model (POM)** and **Object-Oriented Programming (OOP)** principles.

The automation covers the complete workflow from agent registration to fund deposit and balance verification.

---

## Technology Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Git & GitHub
- GitHub Actions (CI/CD)

---

## Project Scenario

The automated test performs the following steps:

1. Visit the DMoney Portal.
2. Click on **Sign Up**.
3. Register a new **Agent** account.
4. Login as **Admin**.
5. Activate the newly created agent.
6. Login as **System** account.
7. Deposit **2000 Tk** to the newly activated agent.
8. Login using the new Agent account.
9. Verify the account balance is **2000 Tk**.
10. Deposit **500 Tk** to an existing customer.
11. Verify the transaction is completed successfully.

---

## Project Structure

```
dmoney-playwright-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── AuthorityLogIn.ts
│   ├── UserRegistration.ts
│   ├── UserActivation.ts
│   ├── SystemToAgent.ts
│   └── UserLogIn.ts
│
├── services/
│   └── gmailAuth.ts
│
├── tests/
│   └── E2E.spec.ts
│
├── utils/
│   ├── Random.ts
│   └── extractOTP.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

## Prerequisites

- Node.js
- Visual Studio Code
- Git

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/dmoney-playwright-automation.git
```

Go to project directory

```bash
cd dmoney-playwright-automation
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

## Run Tests

Run all tests

```bash
npx playwright test
```

Run headed mode

```bash
npx playwright test --headed
```

Run specific test

```bash
npx playwright test tests/dmoney.spec.ts
```

Run with UI mode

```bash
npx playwright test --ui
```

---

## Playwright Report

Generate report

```bash
npx playwright test
```

Open HTML report

```bash
npx playwright show-report
```

The report includes:

- Total Tests
- Passed Tests
- Failed Tests
- Execution Time
- Screenshots
- Videos
- Trace Files

---

## CI/CD

GitHub Actions is configured to automatically:

- Install dependencies
- Install Playwright browsers
- Execute all tests
- Generate Playwright HTML Report

Workflow location:

```
.github/workflows/playwright.yml
```

---

## OOP Implementation

The project follows Object-Oriented Programming principles.

- Separate Page Classes
- Reusable Methods
- Encapsulation
- Modular Design
- Maintainable Test Structure

---

## Assertions

The automation validates:

- Agent registration completed successfully.
- Agent activation by Admin.
- System deposited 2000 Tk successfully.
- Agent balance is exactly 2000 Tk.
- Customer deposit of 500 Tk completed successfully.

---

## .gitignore

The following files are ignored:

```
node_modules/
.env
playwright-report/
test-results/
```

---

## Test Accounts

### Admin

```
Email: admin@dmoney.com
Password: 1234
```

### System

```
Email: system@dmoney.com
Password: 1234
```

---


