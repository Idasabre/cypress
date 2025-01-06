describe('access multiple element', () =>{
    it('should be able to access multiple occurances from webpage', () => {
        cy.visit('https://automationexercise.com/');
         cy.get('[alt="Website for automation practice"]',{timeout:10000}).should('be.visible');
         cy.get('.features_items').scrollIntoView();
         cy.wait(500);
         cy.get('.single-products')
         .should('be.visible')
         .should('have.length.greaterThan', 10)
         .then((prod) => {
             cy.wrap(prod)
             .parent('.product-image-wrapper')
             .find('.choose ul li a').eq(1).click();
             cy.contains('Write Your Review').should('be.visible');
         });
     });
})