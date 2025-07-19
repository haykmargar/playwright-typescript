/**
* ==============================================================================
* Playwright TodoMVC Test Framework
* ==============================================================================
* * This file contains a complete, self-contained testing framework for the
* Playwright TodoMVC demo application (https://demo.playwright.dev/todomvc/).
* * To run this:
* 1. Make sure you have Node.js installed.
* 2. Save this entire code block as a single file named `playwright.config.ts`.
* (Even though it contains tests and page objects, for this self-contained
* example, we'll keep it all in one file. In a real project, you would
* split these into separate files/directories as commented below).
* 3. In your terminal, in the same directory as the file, run:
* - `npm init -y`
* - `npm install --save-dev @playwright/test`
* - `npx playwright install` (to install browser binaries)
* 4. Run the tests with the command: `npx playwright test`
* 5. To see the test report, run: `npx playwright show-report`
*
* This framework demonstrates:
* - Page Object Model (POM) for maintainability and reusability.
* - A clear structure for tests, page objects, and configuration.
* - Best practices like using locators and web-first assertions.
* - Tests for core user scenarios: adding, editing, completing, and deleting todos.
    */