Cypress.Commands.add('randomEmail', () => {
    const randEmail = Math.random().toString(36).substring(2, 8);
    return `user_${randEmail}@gmail.com`;
  });
  
  Cypress.Commands.add('randomPhoneNo', () => {
    const phNo = Math.floor(1000000 + Math.random() * 5000000).toString();
    return `+6019-${phNo}`;
  });
  
  Cypress.Commands.add('signup', (user) => {
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.contains('New User Signup!').should('be.visible');
  
    // Fill in signup details
    cy.get('input[data-qa="signup-name"]').type(user.name);
    cy.get('input[data-qa="signup-email"]').type(user.email);
    cy.get('button[type="submit"]').contains('Signup').click();
    cy.contains('Enter Account Information').should('be.visible');
  
    // Enter account information
    cy.get('#uniform-id_gender2 input[value="Mrs"]').check(); // Select gender
    cy.get('#password').type(user.password);
    cy.get('[data-qa="days"]').select('4');
    cy.get('#months').select('February');
    cy.get('[name="years"]').select('1990');
  
    // Fill in address information
    cy.get('#first_name').type(user.address.firstName);
    cy.get('#last_name').type(user.address.lastName);
    cy.get('#company').type(user.address.company);
    cy.get('#address1').type(user.address.address1);
    cy.get('#address2').type(user.address.address2);
    cy.get('#country').select(user.address.country);
    cy.get('#state').type(user.address.state);
    cy.get('#city').type(user.address.city);
    cy.get('#zipcode').type(user.address.zipcode);
    cy.get('#mobile_number').type(user.phone);
  
    cy.contains('Create Account').click();
    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });
  