export const signup = (email) => {   
    // Navigate to the signup/login page
    cy.visit('/');                                 
    cy.get('a[href="/login"]').click();                 
    cy.url().should('include', '/login');              
    cy.contains('New User Signup!').should('be.visible'); 
    
    // Fill in signup details
    cy.get('input[data-qa="signup-name"]').type(Cypress.testData.signupData.name);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[type="submit"]').contains('Signup').click();
    cy.contains('Enter Account Information').should('be.visible');

    // Fill in account information
    cy.get('#uniform-id_gender2 input[value="Mrs"]').check();
    cy.get('#password').type(Cypress.testData.loginData.password);                   
    cy.get('[data-qa="days"]').select(Cypress.testData.signupData.day);                  
    cy.get('#months').select(Cypress.testData.signupData.months);                 
    cy.get('[name="years"]').select(Cypress.testData.signupData.year);                
    cy.get('[name="newsletter"]').check();               

    // Fill in address information
    cy.get('#first_name').type(Cypress.testData.signupData.address.firstName);
    cy.get('#last_name').type(Cypress.testData.signupData.address.lastName);
    cy.get('#company').type(Cypress.testData.signupData.address.company);
    cy.get('#address1').type(Cypress.testData.signupData.address.address1);
    cy.get('#address2').type(Cypress.testData.signupData.address.address2);
    cy.get('#country').select(Cypress.testData.signupData.address.country);
    cy.get('#state').type(Cypress.testData.signupData.address.state);
    cy.get('#city').type(Cypress.testData.signupData.address.city);
    cy.get('#zipcode').type(Cypress.testData.signupData.address.zipcode);
    cy.get('#mobile_number').type(Cypress.testData.signupData.phone);
    
    // Submit the signup form
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!').then(() => {  
      cy.get('[data-qa="continue-button"]').click();
    });
};