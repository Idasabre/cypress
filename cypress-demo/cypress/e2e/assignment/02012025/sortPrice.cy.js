describe('sort product hilo', () => {
    it('should display products sorted by high to low price', () => {
        cy.visit('https://www.saucedemo.com/');
        //login
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        
        // Sort products by Price (High to Low)
        cy.get('.product_sort_container').select('hilo');
        // Get all prices and validate the sorting
        cy.get('.inventory_item_price').then(($prices) => {
          expect($prices.length).to.be.greaterThan(1);                                  // Ensure there are at least two prices to compare current and next
          cy.wrap($prices).each((price, index, prices) => {
            if (index < prices.length - 1) {
              // Get current and next price using invoke()
              cy.wrap(price).invoke('text').then((currentText) => {
                cy.wrap(prices[index + 1]).invoke('text').then((nextText) => {
                  const currentPrice = parseFloat(currentText.replace('$', ''));        //remove $ sign and convert to number numeric floating point val
                  const nextPrice = parseFloat(nextText.replace('$', ''));
                  // Assert if the currentPrice >= nextPrice
                  expect(currentPrice).to.be.gte(nextPrice);
                  if (currentPrice >= nextPrice) {
                    cy.log('Pass: Current price is greater than or equal to next price\n' +
                        'Current price: ' + currentPrice + '\n' +
                        'Next price: ' + nextPrice);                      
                    } else {
                    cy.log('Fail: Current price is less than next price\n' +
                        'Current price: ' + currentPrice + '\n' +
                        'Next price: ' + nextPrice);  
                    }
                });
              });
            }
          });
        });
    });
});