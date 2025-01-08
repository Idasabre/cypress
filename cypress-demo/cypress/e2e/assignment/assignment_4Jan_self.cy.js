/* Modular Test Suite Using javascript regular function*/
import * as common from '../../support/js_common.js';
import {genRandomEmail} from '../../support/randomGen.js';
import {signup} from '../../support/js_signup.js';
import {cart} from '../../support/js_cart.js';
import {deleteAcc} from '../../support/js_deleteAcc.js';


describe('Modular Test Suite Using custom command - 3 Jan 2025', () => {
    it('should be able to signup, login with generated email, manage shopping cart and delete account', () => {
        // Generate the random email 
        const randomEmail = genRandomEmail(); 
        
        // Access the random email from Cypress.env()
        const email = Cypress.env('randomEmail');
        const loginData = { email: email, password: Cypress.testData.loginData.password }; //overwrite email data

        cy.log('email: ' + loginData.email + ', password: ' + loginData.password);
        cy.log('signing up');
        signup(loginData.email);
        cy.log('logging out');
        common.logout();
        cy.log('logging in');
        common.login(loginData.email, loginData.password);
        cy.log('deleting account');
        deleteAcc(loginData.email);
    });
});

//npx cypress run --spec "cypress/e2e/assignment/assignment_4Jan.cy.js" --headed --browser chrome