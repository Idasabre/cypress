/* Modular Test Suite Using javascript regular function*/
import * as common from '../../support/js_common.js';
import {addToCart} from '../../support/js_cart.js';
import {checkout} from '../../support/js_checkout.js';


describe('Modular Test Suite Using javascript custom command - 3 Jan 2025', () => {
    it('should be able to login, add to cart, checkout and logout', () => {  
        /*erform the following:
        1. login
        2. add multiple items to cart and buffer price and total up price
        3. validate buffered price matched on cart page
        4. checkout and validate total price in checkout page 
        5. logout*/  
        cy.log('logging in');
        common.login(Cypress.testData.loginData.email, Cypress.testData.loginData.password);
        cy.log('adding items to cart and checkout');
        addToCart(Cypress.testData.productNames);
        cy.log('checking out');
        checkout();
        cy.log('logging out');
        common.logout();
    });
});

//npx cypress run --spec "cypress/e2e/assignment/assignment_4Jan.cy.js" --headed --browser chrome