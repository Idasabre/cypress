Cypress.Commands.add('login',(email, pwd) => {
    cy.session([email, pwd], () => {
        cy.visit('/')
        cy.visit('/login')
        cy.get('button[type="submit"]').contains('Login').should('be.visible').then((loginBtn) => {
            cy.get('input[data-qa="login-email"]').type(email)
            cy.get('input[data-qa="login-password"]').type(pwd) 
            cy.wrap(loginBtn).click(); 
        })
    }, {
        cacheAcrossSpecs: true, // Cache the session across specs
    })
    cy.getCookies().then((cookies) => {
        cy.log('Cookies after login:', cookies);
        console.log('Cookies after login:', cookies);
    })
})
