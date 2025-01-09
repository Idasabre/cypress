import {testData} from '../../../fixtures/testData.json'
import {login} from '../../../support/loginSession.js';
import {logout} from '../../../support/js_common.js';
import {cart} from '../../../support/cart.js';

describe('Store session - login', () => {
   
    beforeEach(function () {
        cy.fixture('testData').then((userData) => {      
            this.userData = userData; 
            const loginData = this.userData.loginData;
            cy.login(loginData.email, loginData.password);
          })
    })

    it('validate sucessfull login', function () {        
        cy.visit('/')
        const signupData = this.userData.signupData;
        cy.contains(`Logged in as ${signupData.name}`).should('be.visible')
    })

    it('add items to cart and delete from cart', function () {        
        cy.visit('/')
        const products = this.userData.productNames;
        cy.cart(products);
    })

    it('go to API page and verify', () => {
        cy.visit('/api_list')
        cy.contains('APIs List for practice').then((element) => {
            expect(element).to.be.visible;
        });
    })

    after( () => {
        cy.visit('/');               
        logout();                    
        cy.pause();
    });
})
