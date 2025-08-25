import { inventoryitemsaddremove } from '../support/commands';
///reference types="cypress" />
const checkoutDetails = [
    "Payment Information:",
"SauceCard #31337",
"Shipping Information:",
"Free Pony Express Delivery!",
"Price Total"

]

describe('Checkout Page tests', () => {
  beforeEach(() => {
    cy.login();
  });

    it('Negative scenariots for adding all items in the cart', () => {
        cy.inventoryitemsaddremove();
        cy.getSelector('shopping-cart-badge').click();
        cy.get('#checkout').click();
        cy.get('#continue').click();
        //cy.get('#first-name').type('');
        cy.get('#continue').click();
        cy.get('h3').should('have.text', 'Error: First Name is required');
        cy.get('#first-name').clear().type('Rahul');
        cy.get('#continue').click();
        cy.get('h3').should('have.text', 'Error: Last Name is required');
        cy.get('#first-name').clear().type('Rahul');
        cy.get('#last-name').clear().type('Test');
        cy.get('#continue').click();
        cy.get('h3').should('have.text', 'Error: Postal Code is required'); 
        cy.get('#continue').click();  
       });

    it.only('should add all items in the cart', () => {
        cy.inventoryitemsaddremove();
        cy.getSelector('shopping-cart-badge').click();
        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');
        cy.getSelector('secondary-header').should('have.text', 'Checkout: Your Information');
        cy.get('#first-name').clear().type('Rahul');
        cy.get('#last-name').clear().type('Haridas');
        cy.getSelector('postalCode').clear().type('10245');
        cy.get('#continue').click();
        cy.url().should('include', '/checkout-step-two.html');
        for (let i = 0; i < 5; i++) {
    
            cy.get('.summary_info').children().eq(i).invoke('text').then((text) => {
                expect(text.trim()).to.equal(checkoutDetails[i]);
            });
        }  


        //to get itemtotal price
        cy.getSelector('inventory-item-price')
        
        
        
        .then(($text) => {
            
            console.log($text)
            console.log(typeof $text)
            console.log($text.innerText)//return undefined
            console.log($text.text());//concatenation fof all price as string with dollar sign
           const itemsArr = Cypress._.map($text,el=>parseFloat(el.innerText.replace('$','').trim()))
           console.log(itemsArr);
           const itemTotal = Cypress._.sum(itemsArr);
           console.log(itemTotal);
           cy.get('.summary_subtotal_label').should('have.text', `Item total: $${itemTotal.toFixed(2)}`);
        cy.get('.summary_total_label').invoke('text').then(($text) => {
            console.log($text)
            console.log($text.innerText)
            console.log(typeof $text)
            console.log($text.text)
            const cleanText = $text.replace(/[^\d.]/g, '').trim();
             console.log(cleanText);
            const totalPrice=parseFloat(cleanText)
            console.log(totalPrice);
            
            expect(totalPrice).to.be.greaterThan(itemTotal);
            cy.log(`Item total:$${itemTotal.toFixed(2)}, Total Price: ${totalPrice}`);
        })
            /*const newJSarr = [...text].map(el=>parseFloat(el.innerText.replace('$','').trim()))
            console.log(newJSarr);
            const sum = newJSarr.reduce((acc, curr) => acc + curr, 0)
            console.log(sum);*/
          //  text.each((i,el)=>{
                //console.log("el.innerText",el.innerText)
               //console.log(parseFloat(el.innerText.replace('$','').trim()))
               
               //var sum = 0;
               //prices.push(el.innerText);
                //Cypress._.map(text, (el) => {
               // console.log(parseFloat(el.innerText.replace('$','').trim()))
                //})
                 //console.log('All prices:', prices);
                //console.log(el.text);
                //console.log(parseFloat(el.text.trim().replace('$', '')));
                //sum=sum+parseFloat(el.text.trim().replace('$', '')));
               //console.log(el.text.trim());
                //console.log(parseFloat(el.trim().replace('$', '')));
                //sum=sum+parseFloat(el.trim().replace('$', ''));
          //  })
            
           // console.log(parseFloat(text.trim().replace('$', '')));
        })






        cy.url().should('include', '/checkout-step-two.html');
        cy.getSelector('finish').click();
        cy.url().should('include', '/checkout-complete.html');
        cy.getSelector('secondary-header').should('have.text', 'Checkout: Complete!');
        cy.get("h2.complete-header").should('have.text', 'Thank you for your order!');
        cy.getSelector("back-to-products").click();
        cy.url().should('include', '/inventory.html');
        cy.get("a.shopping_cart_link").children('span').should('not.exist');
    })
})