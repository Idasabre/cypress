let cookies = null;

Cypress.Commands.add('login', (email, pwd) => {
    cy.visit('/login');
    cy.get('button[type="submit"]').contains('Login').should('be.visible').then((loginBtn) => {
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(pwd);
        cy.wrap(loginBtn).click();
    });
    
    // Wait for cookies to be set after login and store them
    cy.getCookies().then((cookiesList) => {
        cookies = cookiesList;
        cy.log('Cookies after login:', cookies);
        console.log('Cookies after login:', cookies);
    })
    .then(() => {
        cy.wrap(cookies).as('cookies'); // Store cookies in alias
    });
});
