import {testData} from '../../../fixtures/testData.json'
import {cart} from '../../../support/cartSession.js';
import {cartValidation} from '../../../support/cartSession_validation.js';

describe('store session - cart', () => {
   
    beforeEach(function () {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.fixture('testData').then((userData) => {      
            this.userData = userData; 
            const prodList = this.userData.productNames;
            cy.cart(prodList); 
        })
    })

    it('validate items in cart page', function () { 
        cy.visit('/view_cart')
        const prodList = this.userData.productNames
        cartValidation(prodList)
        cy.pause()
    })
})