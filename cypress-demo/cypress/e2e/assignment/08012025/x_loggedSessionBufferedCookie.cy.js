import {testData} from '../../../fixtures/testData.json';
import {login} from '../../../support/loginSession.js';
import {logout} from '../../../support/js_common.js';
import {cart} from '../../../support/cart.js';
import {restoreCookies} from '../../../support/x_setCookie.js';

describe('Store session - login', () => {
    beforeEach(function () {
        cy.fixture('testData').then((userData) => {
            this.userData = userData;
            const loginData = this.userData.loginData;
            cy.login(loginData.email, loginData.password);
        });
    });

    it('validate successful login', function () {
        // Restore cookies before visiting any page
        cy.restoreCookies();
        cy.visit('/');
        const signupData = this.userData.signupData;
        cy.contains(`Logged in as ${signupData.name}`).should('be.visible');
    });
});
