/* File upload
 
npm install --save-dev cypress-downloadfile
 
iimport 'cypress-downloadfile/lib/downloadFileCommand'; (cypress/support/commands.js)

//configure in cypress cobfig : "downloadsFolder": "cypress/downloads"
  */
//not using fileDownloader

describe('File Download Test', () => {
  it('Downloads a file successfully', () => {
    // Visit the page with the download link
    cy.visit('https://practice.expandtesting.com/download');

    // Intercept the file download request and provide a custom response
    //cy.intercept('GET', '**/your-file-path-or-name**').as('fileDownload');

    // Click the download link to trigger the download
    cy.get('a[data-testid="1737096589860_testfile.txt"]').click();

    // Wait for the download to complete
    //cy.wait('@fileDownload');

    // Verify the file has been downloaded
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(`${downloadsFolder}/1737096589860_testfile.txt`).should('exist');
  });
});


