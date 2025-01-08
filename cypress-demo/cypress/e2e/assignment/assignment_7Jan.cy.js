import * as common from "../../support/common_intercept.js";

describe('Login multiple users and Logout with intercept validation', () => {
  it('Logs in and logs out for multiple users', () => {
    cy.fixture('testData').then((userData) => {      
        const users = userData.users;
        //const userss = Object.values(userData.users); // Convert object to array if user userss object
        users.forEach((user) => {
            cy.log("Logging in");        
            common.login(user.type, user.email, user.password);

            cy.log("Logging out");        
            common.logout(user.email);   
        });
    });
  });
});
