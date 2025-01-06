/* 
1. table validation
2. try to access element that has multiple occurrences from the webpage.(View product)
3. search with any keyword and get the list of items displayed (count and values printed) using both contains & equals
*/


describe("Assignment 2 Jan 2025", () => {
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

     it('should search for a product using wildcard and validate item display', () => {
        cy.visit('/products');
        cy.get('input[name="search"]').type('men');
        cy.get('#submit_search').click();

        //1. validate length mmatch partial value
        cy.get('.productinfo.text-center')
        .invoke('text') // Get the text of all matched elements
        .then((text) => {
            const prodArray = text.split('\n').map((prod) => prod.trim()); //map return callback function then split each prod                  //result after complete loop produArray = ['pod1','prod2','prod2']   // Split and trim product names. text.split('\n'): Creates an array by splitting the text string on newlines. callback function - trim each prod (product name) and return the trimmed prod name
            //manual filter and push to filteredProducts array
            /* const filteredProducts = [];
            for (let prodName of prodArray) {
                if (prodName.toLowerCase().includes('men')) {
                filteredProducts.push(prodName);
            } */
           //user .filter() instead
           const filteredProducts = prodArray.filter((prod) => prod.toLowerCase().includes('men'));
        
            // Log the filtered products
            filteredProducts.forEach((prod, index) => {  
                cy.log(`Found product ${index + 1}: ` + prod);
            });    
        expect(filteredProducts).to.have.length(4);
        });
    
        //2. validate length match exact value
        cy.get('.productinfo.text-center')
        .invoke('text') // Fetch all the text from elements
        .then((text) => {
            const prodArray = text.split('\n').map((prod) => prod.trim());
            const regexMen = /\bmen\b/i;                    // /b Matches 'men' as a whole word, /i ignoring case
            const filteredProducts = prodArray.filter((prodName) => regexMen.test(prodName));                           //test() is javascipt regexp object.return true if matched     //It checks if the string (prodName) matches the regular expression (regexMen).Returns true if the pattern is found; otherwise, it returns false
            
            // Log the filtered products
            filteredProducts.forEach((prod, index) => {  
                cy.log(`Found product ${index + 1}: ` + prod);
            });
        expect(filteredProducts).to.have.length(2);
        });
    });

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