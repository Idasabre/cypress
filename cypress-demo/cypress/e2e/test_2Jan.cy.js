/*
sign up
Login
check for attributes - logged in username, logout and delete account
check for any products available in below list by click functionality
then proceed with logout as a 1 functionality
then proceed with delete as another functionality

getting element through table <tr> <td>
*/

describe('Automation Exercise Website - Signup, Login, add to cart, logout and delete', () => {
  let randomEmail = '';                      
  const password = 'Qwerty@1234';
  const name = 'Ida Sabre';
  const gender = 'Mrs';
  const day = '4';
  const months = 'February';
  const year = '1990';
  const first_name = 'Ida';
  const last_name = 'Sabre';
  const company = 'Company ltd';
  const address1 = '9 Main Street';
  const address2 = 'Rentak Perdana';
  const country = 'Singapore';
  const state = 'Selangor';
  const city = 'Puncak Alam';
  const zipcode = '12300';
  //let randomPhoneNo = '';      
  const randomPhoneNo = () => {   
    const phNo = Math.floor(1000000 + Math.random() * 5000000).toString(); // This shifts the range from [100000, 5000000]
    return `+6019-${phNo}`  };
  const productNames = ['Blue Top','Men Tshirt'];

  it('should launch the url', () => {
    cy.visit('/');
    //cy.url().should('eq', 'https://automationexercise.com/'); 
    cy.get('[alt="Website for automation practice"]').should('be.visible');
    cy.xpath('//h2[contains(text(),"Features Items")]').should('exist'); 
    //cy.screenshot();
  });

  it('should perform valid signup', () => {
    randomEmail =`user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;    
    console.log('Generated Email:', randomEmail);                                //log to console 
    cy.log('Generated Email:', randomEmail);                                     //log to cypress dashboard  

    // Navigate to the signup/login page
    cy.visit('/');                                 
    cy.get('a[href="/login"]').click();                 
    cy.url().should('include', '/login');              
    cy.contains('New User Signup!').should('be.visible'); 
    
    // Fill in signup details
    cy.get('input[data-qa="signup-name"]').type(name);
    cy.get('input[data-qa="signup-email"]').type(randomEmail);
    cy.screenshot('login');
    cy.get('button[type="submit"]').contains('Signup').click();
    cy.contains('Enter Account Information').should('be.visible');

    // Fill in account information
    cy.get(`#uniform-id_gender2 input[value="${gender}"]`).check(); 
    cy.get('#password').type(password);                   
    cy.get('[data-qa="days"]').select(`${day}`);                  
    cy.get('#months').select(`${months}`);                 
    cy.get('[name="years"]').select(`${year}`);                
    cy.get('[name="newsletter"]').check();               

    // Fill in address information
    cy.get('#first_name').type(`${first_name}`);
    cy.get('#last_name').type(`${last_name}`);
    cy.get('#company').type(`${company}`);
    cy.get('#address1').type(`${address1}`);
    cy.get('#address2').type(`${address2}`);
    cy.get('#country').select(`${country}`);
    cy.get('#state').type(`${state}`);
    cy.get('#city').type(`${city}`);
    cy.get('#zipcode').type(`${zipcode}`);
    //cy.get('#mobile_number').type(randomPhoneNo);
    cy.get('#mobile_number').type(randomPhoneNo());
    cy.screenshot('signup');
    // Submit the signup form
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!').then(() => {  
      cy.get('[data-qa="continue-button"]').click();  
    });
  });

  it('should login with the generated email, validate attributes, add items to cart, delete one item from cart and logout', () => {
    cy.visit('/login'); 
    cy.get('button[type="submit"]').contains('Login').should('be.visible').then((loginBtn) => {
      // Log in with the buffered email
      cy.get('input[data-qa="login-email"]').type(randomEmail);
      cy.get('input[data-qa="login-password"]').type(password);
      cy.wrap(loginBtn).click();
  
      // Verify successful login 
      cy.contains(`Logged in as ${name}`).should('be.visible');
      cy.get('a[href="/logout"]').contains("Logout").should('exist');
      cy.get('[href="/delete_account"]').contains(" Delete Account").should('exist');

      /* // Add items to cart by looping through the array of product names
      productNames.forEach((productName) => {
        cy.contains('.productinfo.text-center p', `${productName}`)
          .siblings('a')
          .contains('Add to cart')
          .eq(0)  // eq(0) = first element found
          .click(); 

          cy.contains('Continue Shopping').click();
      });    
      //go to cart
      cy.get('li a[href="/view_cart"]').click(); */

      // Add items to cart by looping through the array of product names and go to cart from popup element
      cy.get('.productinfo.text-center p').should('be.visible').then((prod) => {
        productNames.forEach((productName, index) => {
          cy.log('Product #: ' + index);
          cy.wrap(prod).contains(`${productName}`).siblings('a.btn.btn-default.add-to-cart').click();
          if (index === productNames.length - 1) {
            cy.contains('View Cart').click();
          } else {
            cy.contains('Continue Shopping').click();
          }
        });
      });

      //delete item based on product index
      cy.get('#cart_info_table tbody tr')
      .contains('td.cart_description h4 a', productNames[0])
      .should('be.visible')
      .parents('tr')
      .find('.cart_delete .cart_quantity_delete')
      .click();

      // Verify if the product is deleted, and check if the table row disappears
      cy.contains(productNames[0]).should('not.exist');

      //logout
      cy.get('a[href="/logout"]').contains("Logout").click();
      cy.url().should('include', '/login'); 
    });
  });

  it('should login and delete account', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').contains('Login').should('be.visible').then((loginBtn) => {
      // Log in with the buffered email
      cy.get('input[data-qa="login-email"]').type(randomEmail);
      cy.get('input[data-qa="login-password"]').type(password);
      cy.wrap(loginBtn).click();
      cy.contains(`Logged in as ${name}`).should('be.visible');
         
      
      //delete account
      cy.get('a[href="/delete_account"]').click();
      cy.get('.col-sm-9.col-sm-offset-1').should('be.visible').then((deleteAcc) => {
        const deleteAccTxt = deleteAcc.text();             //const deleteAccTxt = cy.get('.col-sm-9.col-sm-offset-1').text();    this wont work as text() is a jquery function and it should be used after promise is resolved by .then() (cy.get is resolved first only can get text()) as non cypress command cannot resolve promise by themselve. all cypress command resolve promise by themselve
        if (deleteAccTxt.includes('Your account has been permanently deleted!'))
          cy.log(deleteAccTxt);
        else
          cy.log('Account deleted page content is not as expected');
        
        cy.get('[data-qa="continue-button"]').click();
      
        // Verify account is deleted
        cy.get('a[href="/login"]').click();
        cy.get('input[data-qa="login-email"]').type(randomEmail);
        cy.get('input[data-qa="login-password"]').type(password);
        cy.get('button[type="submit"]').contains('Login').click();
      
        // Verify error message
        cy.contains('Your email or password is incorrect!').should('be.visible');
      });
    });    
  }); 
});