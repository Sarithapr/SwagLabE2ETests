import { inventoryitemsaddremove } from '../support/commands';
describe('Cart Page tests', () => {
  beforeEach(() => {
    cy.login();
  });
           
//debugger;
//check if one item got added to the cart
//cy.get("[data-test='add-to-cart-sauce-labs-bike-light']").click();
//cy.get("a.shopping_cart_link>span").should('have.text', '1');
// Click all "Add to cart" buttons
it('should not allow removing an item that is NOT in the cart', () => {
  // Ensure no items are in the cart to start
  cy.get("a.shopping_cart_link>span").should('not.exist');
  cy.getSelector('shopping-cart-link').click();
  cy.url().should('include', '/cart.html');
  cy.getSelector('continue-shopping').click();
  cy.get('button').contains('Remove').should('not.exist');
});
it('should remove items one item from the cart and check cart badge', () => {
//remove one item from the cart
  cy.inventoryitemsaddremove();
  cy.get(".btn_inventory").eq(0).as("removeBackpack");

  cy.get("@removeBackpack").should('have.text', 'Remove');
  cy.get("@removeBackpack").click();
  cy.get("a.shopping_cart_link>span").should('have.text', '5');
});

it('should remove all items from the cart and check the cart is empty', () => {
  //remove all items from the cart
  cy.get(".btn_inventory").each(($el) => {
  cy.wrap($el).click();
  });
  cy.inventoryitemsaddremove();
  cy.get('button').contains('Remove').should('not.exist');
});
//adding all items to the cart
it('should add all items in the cart and check the quantity is always 1', () => {
  //cy.url().should('include', '/inventory.html');
  cy.inventoryitemsaddremove();
  cy.reload();
  cy.get("a.shopping_cart_link>span").should('have.text', '6');
  cy.get('#react-burger-menu-btn').should('be.visible').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
  cy.login();
  cy.get("a.shopping_cart_link>span").should('have.text', '6');
  //clicking cart
  cy.getSelector('shopping-cart-badge').click();
  cy.url().should('include', '/cart.html');
  cy.get('.cart_item .cart_quantity').each(($el) => {         
  cy.wrap($el).should('have.text', '1');
});
});
});
