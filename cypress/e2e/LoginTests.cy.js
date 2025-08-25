describe('Login Tests', () => {
  // No beforeEach - tests handle their own login

  it('should login with valid credentials', () => {
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.getSelector('login-button').click();
    cy.url().should('include', '/inventory.html');
  });

  it('should show error with invalid credentials', () => {
    cy.visit('/');
    cy.get('#user-name').type('invalid_user');
    cy.get('#password').type('wrong_password');
    cy.getSelector('login-button').click();
    cy.get('[data-test="error"]').should('be.visible');
  });

  it('should show error with empty fields', () => {
    cy.visit('/');
    cy.getSelector('login-button').click();
    cy.get('[data-test="error"]').should('contain.text', 'Username is required');
  });
});