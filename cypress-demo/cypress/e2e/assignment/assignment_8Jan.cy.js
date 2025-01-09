/**using cypress hook
 * before - run once before it blocks
 * beforeEach - run before each it
 * after - run once after it blocks
 * afterEach - run after esch it
 */

import * as common from "../../support/common_intercept.js";

describe('Login multiple users and Logout with intercept validation', () => {
  beforeEach(function () {
    cy.fixture('testData').then((userData) => {      
      this.userData = userData; 
    });
  });    

  it('Logs in and logs out for multiple users', function () {
    const users = this.userData.users;
    users.forEach((user) => {
      cy.log("Logging in");        
      common.login(user.type, user.email, user.password);

      cy.log("Logging out");        
      common.logout(user.email);   
    });
  });
});
