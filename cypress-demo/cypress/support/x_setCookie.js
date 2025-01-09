Cypress.Commands.add('restoreCookies', () => {
    cy.get('@cookies').then((cookies) => {
        if (cookies && cookies.length) {
            cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value, {
                    domain: cookie.domain,
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                });
            });
            cy.log('Cookies restored successfully.');
        } else {
            throw new Error('No cookies buffered. Ensure login has been executed before restoring cookies.');
        }
    });
});
