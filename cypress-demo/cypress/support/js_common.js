/*
Key Differences:
Cypress.Commands.add():

Adds custom commands to the Cypress command chain.
Makes the function reusable across tests without needing to import it.
It’s specifically designed for extending Cypress’ command capabilities.
export const login = () => {}:

Defines a regular JavaScript function that you can import and use in your tests.
It does not integrate directly into the Cypress command chain, so it's simpler for utility functions or when you don't need Cypress' automatic waiting and retries.

Which One to Use?
Use Cypress.Commands.add() when you need to create reusable commands that behave like native Cypress commands (with automatic retries, assertions, etc.).
Use export const login = () => {} when you need a simple utility function for reuse across different files without needing the full power of Cypress’ command chain.
*/

export const login = (email,pwd) => {    
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
};

export const logout = () => {
  cy.get('a[href="/logout"]').contains("Logout").click();
  cy.url().should('include', '/login'); 
}
  