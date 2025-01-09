Cypress.Commands.add('cart', (products) => {
    cy.session([products], () => {
        cy.visit('/');
        cy.get('.productinfo.text-center p').should('be.visible').then((prod) => {
            products.forEach((productName, index) => {
                cy.log('Product #: ' + index);
                cy.wrap(prod).contains(`${productName}`).siblings('a.btn.btn-default.add-to-cart').click();
                if (index === products.length - 1) {
                    cy.contains('View Cart').click();
                } else {
                    cy.contains('Continue Shopping').click();
                }
            })
        })
    }, {
        cacheAcrossSpecs: true,
    });
});
