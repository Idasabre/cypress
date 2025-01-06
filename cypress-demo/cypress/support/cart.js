Cypress.Commands.add('cart',(products) => {
    // Add items to cart by looping through the array of product names and go to cart from popup element
    cy.get('.productinfo.text-center p').should('be.visible').then((prod) => {
        products.forEach((productName, i) => {
          cy.log('Product #: ' + i);
          cy.wrap(prod).contains(`${productName}`).siblings('a.btn.btn-default.add-to-cart').click();
          if (i === products.length - 1) {
            cy.contains('View Cart').click();
          } else {
            cy.contains('Continue Shopping').click();
          }
        });
      });

      //delete item based on array index
      cy.get('#cart_info_table tbody tr')
      .contains('td.cart_description h4 a', products[0])
      .should('be.visible')
      .parents('tr')
      .find('.cart_delete .cart_quantity_delete')
      .click();

      // Verify if the product is deleted, and check if the table row disappears
      cy.contains(products[0]).should('not.exist');
});