import { inventoryitemsaddremove } from '../support/commands';
///reference types="cypress" />

describe('Inventory Page tests', () => {
  beforeEach(() => {
    cy.login();
  });
    const sidebarLinks = [
        { id: '#inventory_sidebar_link', text: "All Items" },
        { id: '#about_sidebar_link', text: "About" },
        { id: '#logout_sidebar_link', text: "Logout" },
        { id: '#reset_sidebar_link', text: "Reset App State" }
    ];

    const getItemNames = () => {
    return cy.get('.inventory_item_name').then($names =>
      Cypress._.map($names, el => el.innerText.trim())
    );
  };

    const getItemPrices = () => {
    return cy.get('.inventory_item_price').then($prices =>
      Cypress._.map($prices, el => parseFloat(el.innerText.replace('$', '').trim()))
    );
  };

    

    it('should load all menu items', () => {
        cy.get('#react-burger-menu-btn').click();
        sidebarLinks.forEach(link => {
            cy.get(link.id).should('be.visible').and('have.text', link.text);
                                 
            switch (link.text && link.text.trim()!== 'Logout') {    
                case "All Items":
                    cy.get(link.id).click();
                    cy.url().should('include', '/inventory.html');
                    break;

                
                case "About":
                    cy.get(link.id).click();
                    cy.origin('https://saucelabs.com', () => {
                        cy.url().should('include', 'https://saucelabs.com/');
                        //cy.go('back');
                        // Optionally: Add more assertions or actions specific to the About page
                    });
                    
                    cy.visit('/inventory.html');
                    break;
                case "Reset App State":
                    cy.get(link.id).click();
                    cy.get("a.shopping_cart_link").children('span').should('not.exist');
                    cy.url().should('include', '/inventory.html');
                    cy.get('#react-burger-cross-btn').click();
                    break;
            } 
        });
        cy.get('#inventory_sidebar_link').click();
        cy.url().should('include', '/inventory.html');
    });

    it('should add and remove all inventory items', () => {  
        cy.inventoryitemsaddremove();
        cy.get("a.shopping_cart_link>span").should('have.text', '6');

        // Remove all items from inventory page
        cy.inventoryitemsaddremove();
        cy.get("a.shopping_cart_link").children('span').should('not.exist');

        // Go to cart and verify
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.getSelector('secondary-header').should('have.text', 'Your Cart');

        // Optionally: Add logic to remove a single item from the cart if needed
    });

    it('should check if the sorting is correct', () => {  
        cy.get('.product_sort_container').select('za');
        
        getItemNames().then(names => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sorted);
    });

    cy.get('.product_sort_container').select('az');
    getItemNames().then(names => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sorted);
    });
    cy.get('.product_sort_container').select('lohi');
    getItemPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });

    cy.get('.product_sort_container').select('hilo');
    getItemPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => b- a);
      expect(prices).to.deep.equal(sorted);
    });

    });

    it('should check if all items are displayed', () => {
        cy.get('.inventory_item').should('have.length', 6);
        cy.get('.inventory_item_name').each(($el) => {
            expect($el.text().trim()).to.not.be.empty;
        });
        cy.get('.inventory_item_price').each(($el) => {
            expect($el.text().trim()).to.match(/^\$\d+(\.\d{2})?$/);
        });
    });
   

    
});