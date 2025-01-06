describe('search product using wildcard', () => {
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
})