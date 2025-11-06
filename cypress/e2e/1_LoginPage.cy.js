describe('Login page tests', () => {
    beforeEach(() => {
    cy.fixture('users.json').as('usersList')
  });
  it('should check invalid login conditions', () => {
    
    cy.get('@usersList').then(userdetails => {
      const invalidUsers = userdetails.filter(user => !user.valid);
      invalidUsers.forEach(user => {
        cy.visit('/');
        cy.get('#user-name').as('username');
        cy.get('@username').should('be.visible').and('not.be.disabled')
        cy.get('@username').clear().type(user.username);
        cy.get('#password').as('password');
        cy.get('@password').should('be.visible').and('not.be.disabled').clear().type(user.password);
        cy.get('#login-button').as('loginBtn');
        cy.get('@loginBtn').click();
        cy.get('h3').should('be.visible').and('contain.text', user.expected);
      });
    });
  });

  it('should check valid login conditions', () => {
    cy.get('@usersList').then(userdetails => {
      const validUsers = userdetails.filter(user => user.valid);
      validUsers.forEach(user => {
        cy.visit('/');
        cy.get('#user-name').should('be.visible').clear().type(user.username);
        cy.get('#password').should('be.visible').clear().type(user.password);
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_list').should('be.visible');
        cy.get('#react-burger-menu-btn').should('be.visible').click();
        cy.get('#logout_sidebar_link').should('be.visible').click();
      });
    });
  });
});