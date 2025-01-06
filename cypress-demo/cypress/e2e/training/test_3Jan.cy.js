
import testData from '../../fixtures/testData.json';
describe('Use of command - 3 Jan 2025', () => {
    it('should be able to signup and login with generated email', () => {
        // Generate the random email and chain the next actions
        cy.genRandomEmail().then((randomEmail) => {
            cy.log('Generated random email: ' + randomEmail);

            // Access the random email from Cypress.env()
            const email = Cypress.env('randomEmail');
            const loginData = { email: email, password: testData.loginData.password }; //overwrite testData.json for email and pwd

            cy.log('email: ' + loginData.email + ', password: ' + loginData.password);
            cy.signup(loginData.email);   
            cy.login(loginData.email, loginData.password);
            cy.cart(testData.productNames); 
            cy.deleteAcc();
        });
    });
});