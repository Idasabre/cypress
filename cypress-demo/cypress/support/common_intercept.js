export const login = (type,email,pwd) => {
    cy.visit('/login');     
    cy.get('button[type="submit"]').contains('Login').should('be.visible').then((loginBtn) => {
        cy.intercept('POST', '/login').as('loginRequest');
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(pwd);
        cy.wrap(loginBtn).click();  
        cy.wait('@loginRequest').then(({ response }) => {
            if (response.statusCode === 200) {
                cy.get('.nav.navbar-nav').then(($nav) => {
                    if ($nav.find('[href="/logout"]').length > 0) {
                        cy.log(`Login successful for ${type} user: ${email}`);
                        cy.get('.nav.navbar-nav').contains('Logout').should('be.visible');
                    } else {
                        cy.log(`Login unsuccessful for ${type} user: ${email}`);
                        cy.contains('Your email or password is incorrect!').should('be.visible');
                    }
                });
            }
        });
    });          
};

export const logout = (email) => {  
    cy.get('.nav.navbar-nav').then(($nav) => {
        if($nav.find('[href="/login"]').length > 0) {
            cy.log("user is not login")
        } else {
        cy.intercept('GET', '/logout').as('logoutRequest');
        cy.get('a[href="/logout"]').contains("Logout").click();     
        cy.wait('@logoutRequest').then(({ response}) => {
            expect(response.statusCode).to.eq(302);
            cy.url().should('include', '/login');  
            cy.log(`Logout successful for ${email}`);
        });
        }
    });
}
  