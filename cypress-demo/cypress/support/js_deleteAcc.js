export const deleteAcc = (email) =>{
    //delete account
    cy.get('a[href="/delete_account"]').click();
    cy.get('.col-sm-9.col-sm-offset-1').should('be.visible').then((element) => {
      const deleteAccTxt = element.text();                                                  //const deleteAccTxt = cy.get('.col-sm-9.col-sm-offset-1').text();    this wont work as text() is a jquery function and it should be used after promise is resolved by .then() (cy.get is resolved first only can get text()) as non cypress command cannot resolve promise by themselve. all cypress command resolve promise by themselve
      if (deleteAccTxt.includes('Your account has been permanently deleted!'))
        cy.log(deleteAccTxt);
      else
        cy.log('Account deleted page content is not as expected');
      
      cy.get('[data-qa="continue-button"]').click();
    
      // Verify account is deleted
      cy.get('a[href="/login"]').click();
      cy.get('input[data-qa="login-email"]').type(email);
      cy.get('input[data-qa="login-password"]').type(Cypress.testData.loginData.password);
      cy.get('button[type="submit"]').contains('Login').click();
    
      // Verify error message
      cy.contains('Your email or password is incorrect!').should('be.visible');
    });
};