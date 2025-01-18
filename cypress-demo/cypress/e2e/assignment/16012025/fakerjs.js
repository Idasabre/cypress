// Import external libraries
//const faker = require('faker');

import { faker } from '@faker-js/faker';

describe('Test with fakerjs', () => {
  it('Use faker for random test data', () => {
    // Generate random test data using Faker.js
    const randomName = faker.name.fullName();                               // Correct method for a full name
    const randomEmail = faker.internet.email();                             // Random email
    const randomAddress = faker.address.streetAddress();                    // Random address
    const randomPhone = faker.phone.number();                               // Random phone number

    cy.log('Random Name:', randomName);
    cy.log('Random Email:', randomEmail);
    cy.log('Random Address:', randomAddress);
    cy.log('Random Phone:', randomPhone);
  });
});


/* Example of filling out a form with random data
    cy.visit('https://example.com/form'); // Replace with your actual URL
    cy.get('#name').type(randomName); // Assuming input field with id 'name'
    cy.get('#email').type(randomEmail); // Assuming input field with id 'email'
    cy.get('#address').type(randomAddress); // Assuming input field with id 'address'
    cy.get('#phone').type(randomPhone); // Assuming input field with id 'phone'

    // Submit the form
    cy.get('#submit').click(); // Assuming a submit button with id 'submit' */

    
//Notes
//npm install @faker-js/faker --save-dev
//import { faker } from '@faker-js/faker'; (spec)