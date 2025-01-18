/* File upload
npm install --save-dev cypress-file-upload
import 'cypress-file-upload'; (cypress/support/commands.js)
*/
//import 'cypress-file-upload'; //can confgure in e2e.cy for global access

describe('File Upload Test', () => {
  before(() => {
    // Prevent Cypress from failing on uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Returning false prevents the error from failing the test
      if (err.message.includes('Assignment to constant variable')) {
        return false;
      }
    });
  });

  // Test case: Upload a file using attachFile (requires cypress-file-upload plugin)
  it('upload a file with attachFile', () => {
    cy.visit('https://practice.expandtesting.com/upload');
    
    cy.get('input[type="file"]')
      .attachFile('testUploadFile.json')
      .then(() => {
        cy.get('button[type="submit"]').click();
        cy.contains('File Uploaded!').should('be.visible'); 
      });
  });

  // Test case: Upload a file using selectFile (cypress built in feature)
  it('Uploads a file with selectFile', () => {
    cy.visit('https://practice.expandtesting.com/upload');

    const filePath = 'cypress/fixtures/testUploadFile.json';
    
    cy.get('input[type="file"]').selectFile(filePath);

    // Verify the file exists in the input after selection
    cy.get('input[type="file"]').then((input) => {
      const fileName = input[0].files[0].name;        // Get file name from input
      expect(fileName).to.equal('testUploadFile.json'); 
    });
    
    cy.get('button[type="submit"]').click();
    cy.contains('File Uploaded!').should('be.visible'); 
  });
});



