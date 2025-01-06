Cypress.Commands.add("login",(email,pwd) => {    
    cy.visit('/login'); 
    cy.get('button[type="submit"]').contains('Login').should('be.visible').then((loginBtn) => {
      cy.get('input[data-qa="login-email"]').type(email);
      cy.get('input[data-qa="login-password"]').type(pwd);
      cy.wrap(loginBtn).click(); 

      // Verify successful login 
      cy.contains('Logged in as ' + Cypress.testData.signupData.name).should('be.visible');
      cy.get('a[href="/logout"]').contains("Logout").should('exist');
      cy.get('[href="/delete_account"]').contains(" Delete Account").should('exist');
    });
});
