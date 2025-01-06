// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import testData from '../fixtures/testData.json'; //or const testData = require('../fixtures/testData.json');
Cypress.testData = testData;    //global property
import './commands';
import './randomGen';
import './signup';
import './login';
import './cart';  
import './deleteAcc';     
import 'cypress-xpath';
