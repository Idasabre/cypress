describe('Automation Exercise Website Tests', () => {
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
  
    it('should navigate to the website and signup', () => {
      cy.visit('/');
      //cy.contains('Automation Exercise').should('be.visible'); // Verify page content or 
      //cy.get('img[src="/static/images/home/logo.png"]').should('exist');
      cy.xpath('//h2[contains(text(),"Features Items")]').should('exist'); 
  
    //should perform Sign Up process
      // Click the "Sign Up / Login" button
      cy.get('a[href="/login"]').click();
  
      // Verify that the URL includes '/login'
      cy.url().should('include', '/login');
  
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
      cy.contains('Enter Account Information').should('be.visible');
  
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