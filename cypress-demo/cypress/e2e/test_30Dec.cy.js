describe('Automation Exercise Website Tests', () => {
    /* 
    cy.log
    it.skip / it.only
    then()
    wihin()
    clear()
    implicit and explicit assertions in cypress - using chai - 
        implicit cy.get(), cy.contains(), or cy.url().
        explicit  .should(), .expect(), and .assert(), .and() assertion - https://docs.cypress.io/api/commands/should
        
        Aspect	        Implicit Assertions	                                                            Explicit Assertions
        How it works	Automatically built into Cypress commands and assertions.	                    Manually defined by the test author using assertion libraries (Chai).
        Waiting for     Cypress automatically waits for elements to be available or visible.	        You need to explicitly define waiting or checking conditions.
        conditions	
        Usage	        Used for common checks like visibility, existence, etc.	                        Used for custom checks on values, properties, or specific conditions.
        Examples	    cy.get('button').should('be.visible')	                                        expect($message).to.have.text('Welcome')
        Level of        Less control over specific checks but automatically handles waits.	            More control, as you manually define what to assert and check.
        control	
    
    cy.pause / cy.debug / debugger; - pause the run - for debugging purposes
    invoke() /text()
    cy.wait() or cy.reload() - predefine time, use only when necessary
    cy.screenshot? / screenshotOnRunFailure configure on cypress.config()
    
    
     */
    // Function to generate random email and password
    /* const randomEmail = () => {
      const randEmail = Math.random().toString(36).substring(2, 8); //string with a base 36 (which means it uses digits 0-9 and letters a-z).
      return `user_${randEmail}@gmail.com`;
    }; */
  
    const randomPassword = () => {
      const randomPwd = Math.random().toString(36).substring(2, 10);
      return randomPwd;
    };
  
    const randomPhoneNo = () => {
      const phNo = Math.floor(1000000 + Math.random() * 5000000).toString(); // This shifts the range from [100000, 9000000]
      return `+6019-${phNo}`  };
  
    //need to configure before use this to save session cookies etc
   /*  beforeEach(() => {
      cy.visit('/');
    }); */

    it.skip('should navigate to the website', () => { //skip this it block
      cy.visit('/');
    }); 
  
    it.only('should navigate to the website and signup', () => {        //only run this block. ;e.g for regression case/retest
      cy.visit('/');
      //cy.contains('Automation Exercise').should('be.visible'); // Verify page content or 
      //cy.get('img[src="/static/images/home/logo.png"]').should('exist');
      cy.xpath('//h2[contains(text(),"Features Items")]').should('exist'); 
  
    //should perform Sign Up process
      // Click the "Sign Up / Login" button
      cy.get('a[href="/login"]').click();
  
      // Verify that the URL includes '/login'
      cy.url().should('include', '/login');
  
/*      without assertion .then() or within()
      // Verify that the "New User Signup!" text is visible
      cy.contains('New User Signup!').should('be.visible');
      
      // Fill in signup details
      cy.get('input[data-qa="signup-name"]').type("Ida Sabre");
      
      let randEmail = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`
      console.log(randEmail);   //log on console 
      cy.log(randEmail);        //log in cypress dashboard
      cy.get('input[data-qa="signup-email"]').type(randEmail);    
      
      //cy.get('input[data-qa="signup-email"]').type(randomEmail());
      //cy.get('input[data-qa="signup-email"]').type("user_123@gmail.com");
      //cy.get('input[data-qa="signup-button"]').click();
      cy.get('button[type="submit"]').contains('Signup').click();
      cy.contains('Enter Account Information').should('be.visible'); */

    //modify to use .then() - chain parent and child - Chain commands and assertions based on previous command results. - After getting elements, use then() to manipulate, assert, or chain further actions.
        //Use then() when you need to work with the result of a previous Cypress command, such as extracting values or chaining further actions.
    cy.contains('New User Signup!').should('be.visible').then(() => {
        // Fill in signup details
      cy.get('input[data-qa="signup-name"]').type("Ida Sabre");
      
      let randEmail = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`
      console.log(randEmail);   //log on console 
      cy.log(randEmail);        //log in cypress dashboard
      cy.get('input[data-qa="signup-email"]').type(randEmail);   
      cy.get('button[type="submit"]').contains('Signup').click();
      cy.contains('Enter Account Information').should('be.visible');
    });

    //modify to use .within() - grouping - Limit command scope to a parent element or container. - Use within() to interact with elements that are children or descendants of a parent element.
        //Use within() when you want to limit the scope of commands to a particular part of the page (i.e., within a specific DOM element).
    cy.contains('New User Signup!').should('be.visible').then(() => {
        // Fill in signup details
      cy.get('input[data-qa="signup-name"]').type("Ida Sabre");
      
      let randEmail = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`
      console.log(randEmail);   //log on console 
      cy.log(randEmail);        //log in cypress dashboard
      cy.get('input[data-qa="signup-email"]').type(randEmail);   
      cy.get('button[type="submit"]').contains('Signup').click();
      cy.contains('Enter Account Information').should('be.visible');
    });
  
      // Enter account information
      cy.get('#uniform-id_gender2 input[value="Mrs"]').check(); // Select gender (Female)
      cy.get('#password').type(randomPassword()); // Enter password
      cy.get('[data-qa="days"]').select('4');  //Date of Birth using attribute data-qa
      cy.get('#months').select('February');  //Date of Birth using id
      cy.get('[name="years"]').select('1990');   //Date of Birth using name
      cy.get('[name="newsletter"]').check();
  
      // Fill in address information
      cy.get('#first_name').type('Ida');
      cy.get('#last_name').type('Sabre');
      cy.get('#company').type('Company Ltd.');
      cy.get('#address1').type('89 Main Street');
      cy.get('#address2').type('Rentak Perdana');
      cy.get('#country').select('Singapore');
      cy.get('#state').type('Selangor');
      cy.get('#city').type('Puncak Alam');
      cy.get('#zipcode').type('12300');
      cy.get('#mobile_number').type(randomPhoneNo());
  
      // Submit the signup form
      //cy.get('[data-qa="create-account"]').click();
      cy.contains('Create Account').click();
  
      // Verify successful account creation then click on Continue button
      cy.contains('Account Created!').should('be.visible').then(() => {
        cy.get('[data-qa="continue-button"]').click();  
        cy.contains('Ida Sabre').should('be.visible');
      });
    });
  });