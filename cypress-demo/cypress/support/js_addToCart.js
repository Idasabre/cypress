export const addToCart = (products) => {
     //go to cart and clear cart
    cy.visit('/view_cart');
   
    // Check if the cart has any items
    cy.get('body').then(($body) => {
       if ($body.find('#cart_info_table tbody tr').length > 0) {
            // If elements exist
            cy.get('#cart_info_table tbody tr').each(($cartItem) => {
            // Get the product name for logging
            const prodName = $cartItem.find('td.cart_description h4 a').text().trim();
            cy.log(`Deleting product: ${prodName}`);

            // Click on the delete button for each product in the cart
            cy.wrap($cartItem)
                .find('.cart_delete .cart_quantity_delete')
                .click();

            // Optionally, wait for the cart to update (if needed)
            cy.wait(1000); // Wait for 1 second before checking for the next product
            });
        } else if($body.find('#cart_info_table tbody tr').length <= 0) {
            // If elements do not exist
            cy.log('The cart is already empty.');
            cy.get('.fa.fa-home',{timeout:10000}).should('exist').click(); // Navigate back to the homepage
        }
    });

    let productPrice = [];
    let totalPrice = 0;             //total from adding the item
    let productData = [];           
    let calculatedTotalPrice = 0;   //from the cart

    // Add items to cart
    cy.get('.productinfo.text-center p').should('exist')
    .then(($prod) => {
        products.forEach((productName, index) => {
            cy.log(`Adding product ${index + 1}: ${productName}`);

            // Extract product price
            cy.wrap($prod)
            .siblings('h2')
            .invoke('text')
            .then((priceText) => {
            const price = parseFloat(priceText.replace('Rs.', '').trim());
            totalPrice += price;                                                

            // Buffer product name and price
            productData.push({ name: productName, price });

            // Add product to the cart
            cy.wrap($prod).contains(`${productName}`)
            .siblings('a.btn.btn-default.add-to-cart')
            .click();
            
            cy.contains('Continue Shopping').click();
            /* if (index === products.length - 1) {
                cy.contains('View Cart').click();
            } else {
                cy.contains('Continue Shopping').click();
            } */
        }); 
      });
      
      cy.get('[href="/view_cart"]').eq(0).should('exist').click();

      //product name and price validation
      cy.get('#cart_info_table tbody tr')
      .each(($row, index) => {
        // Extract product name
        const productName = $row.find('td.cart_description h4 a').text().trim();
        cy.log('Validating product: ' + productName);
      
        // Extract product price and handle parsing issues
        const productPriceText = $row.find('td.cart_price p').text().trim() || '0';
        const productPrice = parseFloat(productPriceText.replace('Rs.', '').trim()) || 0;
        cy.log(`Extracted Price Text: "${productPriceText}", Parsed Price: ${productPrice}`);

        const productQuantityText = $row.find('td.cart_quantity button').text().trim() || '0';
        const productQuantity = parseInt(productQuantityText, 10) || 0;
        cy.log(`Extracted Quantity Text: "${productQuantityText}", Parsed Quantity: ${productQuantity}`);

      
        // Log extracted values for debugging
        cy.log(`Validating product: ${productName}`);
        cy.log(`Extracted Price Text: "${productPriceText}", Parsed Price: ${productPrice}`);
        cy.log(`Extracted Quantity Text: "${productQuantityText}", Parsed Quantity: ${productQuantity}`);
        
        // Validate product name and price
        expect(productData[index].name).to.equal(productName);
        expect(productData[index].price).to.equal(productPrice);
      
        // Calculate the total price for this product
        calculatedTotalPrice += productPrice * productQuantity;
      })
      .then(() => {
        // Save the calculatedTotalPrice as a Cypress alias to be used in checkout funcrtion
        cy.wrap(calculatedTotalPrice).as('cartTotal');
        cy.wait(10000);
    });    
  });
}; 