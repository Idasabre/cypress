// Import random data generation functions from the support file
const { generateRandomEmail, generateRandomPassword, generateRandomPhone } = require('../fixtures/randomData');

describe('Automation Exercise Website Tests', () => {
  let testData;

  beforeEach(() => {
    // Load static user data from the fixture file
    cy.fixture('testData').then((data) => {
      // Dynamically generate random values and merge with fixture data
      testData = {
        ...data, // Spread the static data from fixture
        email: generateRandomEmail(),
        password: generateRandomPassword(),
        phone: generateRandomPhone()
      };

      // Visit the website
      cy.visit('/');
    });
  });

  it('should navigate to the website', () => {
    // Verify that the website loads successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('img[src="/static/images/home/logo.png"]').should('exist');
  });

  it('should perform Sign Up process with random values', () => {
    // Use the custom command to perform the signup process
    cy.signup(userData);
  });
});
