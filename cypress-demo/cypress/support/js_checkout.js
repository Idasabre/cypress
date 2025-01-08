export const checkout = () => {
    cy.contains('Proceed To Checkout').should('be.visible').click();
    // Validate total price
    cy.get('.cart_total_price').last().invoke('text').then((checkoutTotalText) => {
        const checkoutTotal = parseFloat(checkoutTotalText.replace('Rs.', '').trim());
            cy.get('@cartTotal').then((calculatedTotalPrice) => {
                cy.log(`Calculated Total Price: ${calculatedTotalPrice}, Checkout Total: ${checkoutTotal}`);
                expect(checkoutTotal).to.equal(calculatedTotalPrice);
        });
      });
}