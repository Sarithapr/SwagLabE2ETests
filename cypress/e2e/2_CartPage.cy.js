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

                //adding all items to the cart
            it('should add all items in the cart', () => {
                cy.inventoryitemsaddremove();
                
                cy.get("a.shopping_cart_link>span").should('have.text', '6');
                //clicking cart
                cy.getSelector('shopping-cart-badge').click();
                cy.url().should('include', '/cart.html');
                cy.get('.cart_item .cart_quantity').each(($el) => {         
                    cy.wrap($el).should('have.text', '1');
                });
                cy.get(".cart_item").find('button').eq(0).as("removeBackpack");
                
                cy.get("@removeBackpack").should('have.text', 'Remove');
                cy.get("@removeBackpack").click();
                cy.get("a.shopping_cart_link>span").should('have.text', '5');

                //remove all items from the cart
                cy.get(".cart_item").find('button').each(($el) => {
                    cy.wrap($el).click();
                });

               cy.contains('Remove').should('not.exist');
                cy.getSelector('continue-shopping').click();
                cy.url().should('include', '/inventory.html');
            });

                //check quantitty of all items in the cart

           



         });
        