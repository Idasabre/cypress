describe("Table Validation", () => {
    it('should validate the content and structure of the table', () => {
        let products = [];
        let cartProdArr = [];

        cy.visit('https://automationexercise.com/');
        cy.get('.single-products') 
        .should('have.length', 40) 
        .each(($prod, i) => {
            if (i < 2) { 
                cy.wrap($prod)       
                .find('.productinfo.text-center p')
                .invoke('text')                                                                                     // Extract product name using invoke()
                .then((productName) => { 
                    cy.log(productName); 
                    if (['Blue Top', 'Men Tshirt'].includes(productName)) {
                        products.push(productName);
                        cy.wrap($prod).contains(productName).siblings('a.btn.btn-default.add-to-cart').click();
                        cy.contains('Continue Shopping').click();                        
                    }
                    products.forEach((product, index) => {
                        cy.log(`Product ${index + 1}: ${productName}`);
                    });
                });
            }
        })            
        .then(() => {
            cy.get('a[href="/view_cart"] i').click();
            //validate added items in table
            cy.get("#cart_info_table tbody tr").each(($row) => {
                const cartProdName = $row.find("td.cart_description h4 a").text().trim();                                // Extract product name using jquery text()
                cartProdArr.push(cartProdName);
            }).then(() => {
                // Perform assertions on the collected cartProdArr
                products.forEach((productName) => {
                  expect(cartProdArr).to.include(productName);                           
                  cy.log(`Validated product: ${productName} found in cart`);
                });
            });
        });        
        
    });
});