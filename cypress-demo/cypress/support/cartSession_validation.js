export const cartValidation = (products) => {
    products.forEach((prodName, index) => {
        cy.log(`Validating product ${index + 1}: ${prodName}`)  
        // For each product, check if it exists in any row          
        cy.get('#cart_info_table tbody tr')                                                                     // For each product, check if it exists in any row
            .should('exist')
            .then((rows) => {
                const rowsArray = Array.from(rows);                                                             // Convert rows to an array
                const isProductFound = rowsArray.some((row) => {                                                //Array.some() iterates over each row in the array and returns true as soon as the callback condition is satisfied (i.e., when the product from the products array is found in the cart tr).
                    const rowText = Cypress.$(row).find('td.cart_description h4 a').text().trim();             //Cypress.${row} is jquery wrap object, $row is a Cypress-wrapped object used with javascript function like text() and trim()
                    return rowText === prodName                                                                //if prodName found in the row, match, the condition returns true, and Array.some() immediately exits the iteration.
                })
                expect(isProductFound, `Product ${prodName} found in cart`).to.be.true                         // Assert that the product exists
            })
    })
}