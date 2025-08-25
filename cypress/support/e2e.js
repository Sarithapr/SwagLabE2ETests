// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '../fixtures/users.json';
import '@cypress/code-coverage/support';

/*beforeEach(function () {
    cy.fixture('users').as('userData');
    cy.visit('/');
    
    cy.get('@userData').then((user) => {
    const firstUser = user[0];
    cy.get("[data-test='username']").type(firstUser.username); 
    cy.get("[data-test='password']").type(firstUser.password);
    });
    cy.get("[data-test='login-button']").click();
    cy.url().should('include', '/inventory.html');
})*/