/* File upload 
npm install --save-dev cypress-downloadfile
import 'cypress-downloadfile/lib/downloadFileCommand'; (cypress/support/commands.js)

add in cypress.config
add below on top
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')

add on('task',{downloadFile})inside setupNodeEvents

setupNodeEvents(on, config) {
      on('task',{downloadFile})
      },

 */

//import 'cypress-downloadfile/lib/downloadFileCommand';

describe('File Download Test', () => {
  it('Downloads a file successfully', () => {
    cy.visit('https://practice.expandtesting.com/download');

    const fileUrl = 'https://practice.expandtesting.com/download/1737096551544_testfile.txt';  // The file URL
    const savePath = 'cypress/downloads'; // Ensure the file extension matches the file type

    try {
      // Perform the download
      cy.downloadFile(fileUrl, savePath, 'test1.txt');
      cy.log('Download successful!');
    } catch (error) {
      cy.log('Download failed: ' + error.message);
    }

    // Verify the file is downloaded by checking the file existence in the downloads folder
    cy.readFile(savePath + '/test1.txt').should('exist');
  });
});



