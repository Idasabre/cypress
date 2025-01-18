//Shadow DOM validation
 
describe('Shadow DOM Content Validation', () => {
    it('should validate the elemnts inside the shadow DOM', () => {        
      cy.visit('https://testautomationpractice.blogspot.com/');               
      cy.get('#shadow_host')
        .scrollIntoView()
        .shadow()
        .find('input[type="text"]').then((blog) => {
          cy.wrap(blog).type('test')
          cy.wrap(blog).siblings('input[type="checkbox"]').click()

          const filePath = 'cypress/fixtures/testUploadFile.json'
          cy.wrap(blog).siblings('input[type="file"]').selectFile(`${filePath}`)

          cy.contains('Youtube').then((youtube) => {
            cy.intercept('GET','https://www.youtube.com/@sdetpavan/videos').as('youtubeRequest')
            cy.wrap(youtube).click()
            cy.wait('@youtubeRequest').then(({response}) => {
              cy.log(response)
              expect(response.statusCode).to.eq(200)
              cy.url().should('eq','https://www.youtube.com/@sdetpavan/videos')
            })
          })
        })
    });
});




/* describe('Shadow DOM Automation with Cypress', () => {
    it('Interacts with Shadow DOM elements', () => {
      // Visit the webpage
      cy.visit('https://practice.expandtesting.com/shadowdom');
  
      // Access the Shadow DOM element and interact with it
      cy.get('#shadowHost') // First, get the shadow host element
        .shadow() // Access its shadow root
        .find('input[type="text"]') // Locate the input inside the shadow root
        .type('Testing Shadow DOM'); // Type text into the input field
  
      // Validate if the text was entered correctly
      cy.get('#shadowHost')
        .shadow()
        .find('input[type="text"]')
        .should('have.value', 'Testing Shadow DOM');
  
      // Interact with a button inside the Shadow DOM
      cy.get('#shadowHost')
        .shadow()
        .find('button')
        .click();
  
      // Assert button click response
      cy.get('#shadowHost')
        .shadow()
        .find('p')
        .should('contain', 'Button clicked!'); // Replace with the actual text shown after the click
    });
  });
   */