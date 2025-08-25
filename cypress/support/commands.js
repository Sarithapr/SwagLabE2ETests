// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('inventoryitemsaddremove', () => {
    // add all items to the cart
    cy.get(".inventory_item").find('button').each(($el) => {
        cy.wrap($el).click();
    });
});

Cypress.Commands.add('getSelector', (selector) => {
    return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
    cy.visit('/');
    cy.get('#user-name').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
});