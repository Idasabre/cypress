/* Modular Test Suite Using Cypress: Leverage cypress/fixtures/testData.json and support/customCommands.js for Improved Test Management */

describe('Modular Test Suite Using Cypress - 3 Jan 2025', () => {
    it('should be able to signup, login with generated email, manage shopping cart and delete account', () => {
        // Generate the random email and chain the next actions
        cy.genRandomEmail().then((randomEmail) => {
            cy.log('Generated random email: ' + randomEmail);

            // Access the random email from Cypress.env()
            const email = Cypress.env('randomEmail');
            const loginData = { email: email, password: Cypress.testData.loginData.password }; //overwrite email data

            cy.log('email: ' + loginData.email + ', password: ' + loginData.password);
            cy.signup(loginData.email);   
            cy.login(loginData.email, loginData.password);
            cy.cart(Cypress.testData.productNames); 
            cy.deleteAcc(loginData.email);
            cy.pause();
        });
    });
});

//npx cypress run --spec "cypress/e2e/assignment/assignment_3Jan.cy.js" --headed --browser chrome