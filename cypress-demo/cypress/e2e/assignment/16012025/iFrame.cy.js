/*describe('Accessing iFrame', () => {
    it.only('Access web element inside iframe', () => {
        cy.visit('https://jqueryui.com/droppable/');

        cy.get('iframe.demo-frame') 
            .its('0.contentDocument.body') 
            .should('not.be.empty') 
            .find('#draggable') 
            .should('be.visible')
            .and('contain.text', 'Drag me to my target'); 
    });
});
*/
describe('Access iframe elements in multiple ways', () => {
    
    // Method 1: Using .its('0.contentDocument.body')
    it('Access #droppable element using .its(0.contentDocument.body)', () => {
        cy.visit('https://jqueryui.com/droppable/');
        cy.get('iframe.demo-frame') 
            .its('0.contentDocument.body') 
            .should('not.be.empty') 
            .find('#droppable') 
            .should('be.visible')
            .and('contain.text', 'Drop here');
    });

    // Method 2: Using cy.wrap()
    it('Access #droppable element using wrap', () => {
        cy.visit('https://jqueryui.com/droppable/');
        cy.get('iframe.demo-frame') 
            .then(($iframe) => {                                    
                const body = $iframe.contents().find('body');
                cy.wrap(body)
                    .find('#droppable') 
                    .should('be.visible') 
                    .and('contain.text', 'Drop here');
            });
        
        //or direct wrap the body
        /* cy.get('iframe.demo-frame')
        .its('0.contentDocument.body').should('not.be.empty').then((frameBody) =>{
            cy.wrap(frameBody).as('iFrameBody')
            cy.get('@iFrameBody').find('#draggable > p').should('have.text','Drag me to my target')  
        })   */ 
    });

    // Method 3: Using a custom Cypress command
    Cypress.Commands.add('getIframeBody', (iframeSelector) => {
        return cy
            .get(iframeSelector) 
            .its('0.contentDocument.body')
            .should('not.be.empty') 
            .then(cy.wrap); 
    });

    it('Access #droppable element using a custom command', () => {
        cy.visit('https://jqueryui.com/droppable/');
        cy.getIframeBody('iframe.demo-frame') 
            .find('#droppable') 
            .should('be.visible') 
            .and('contain.text', 'Drop here');
    });

    // Method 4: Using an external package like cypress-iframe
    it('Access #droppable element using cypress-iframe package', () => {
        // Install cypress-iframe before running this test: npm install -D cypress-iframe
        require('cypress-iframe'); // Import cypress-iframe package

        cy.visit('https://jqueryui.com/droppable/');
        cy.frameLoaded('iframe.demo-frame'); 
        cy.iframe().find('#droppable')
            .should('be.visible') 
            .and('contain.text', 'Drop here');
    });
});

