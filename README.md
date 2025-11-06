## Project Overview

This project automates end-to-end testing scenarios for an ecommerce platform using Cypress. It verifies key user journeys such as authentication, cart management, and checkout functionality, ensuring the application works as intended.

## Folder Structure

- `cypress/` - Contains all test cases, fixtures, and support files
- `cypress/integration/` - Main test scripts
- `cypress/fixtures/` - Test data (e.g., user credentials)
- `cypress/support/` - Custom commands and reusable utilities
- `README.md` - Project documentation
- `package.json` - Project dependencies and scripts

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
- npm (comes with Node.js)
- Recommended: Latest version of Chrome, Firefox, or Edge for running tests in headed mode

## Getting Started

First and foremost, install your dependencies:

```bash
npm install
```

## Running the Tests

You can run the tests using the following commands:

To launch the Cypress Test Runner (for interactive mode):

```bash
npx cypress open
```

To run all tests in headless mode (useful for CI/CD pipelines):

```bash
npx cypress run
```

## Reporting

- By default, Cypress provides basic test run output in the terminal.
- For additional reporting (e.g., HTML, JUnit), you can integrate plugins like [mochawesome](https://github.com/adamgruber/mochawesome).
- To generate an HTML report after running tests, install Mochawesome:

  ```bash
  npm install mochawesome --save-dev
  ```

  Then, run Cypress with the reporter:

  ```bash
  npx cypress run --reporter mochawesome
  ```

  The HTML report will be available in the `mochawesome-report` directory.

## Improvements:

Instead of checking the items in the cart is 6(hard coded value) once all item are added, we can access API calls using cy.request and get data dynamically. But this website doesnt show the calls as its static data so hardcoded the value.

## WIP
POM for cypress tests
