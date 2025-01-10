describe('Javascript Alert', () => {
   
    it('JS Alert', () => {                  
          cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
        cy.contains('Click for JS Alert').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('I am a JS Alert');
        });
        cy.get('button[onclick="jsAlert()"]').click(); 
        cy.get('#result').invoke('text').then(($result) => {
            expect($result).to.equal('You successfully clicked an alert')
        })
    })

    it('JS Confirm', () => {                  
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
      
        const confirmChoice = false; // Change this to true to simulate "OK"
      
        cy.on('window:confirm', (confirmText) => {
          expect(confirmText).to.equal('I am a JS Confirm');
          return confirmChoice; // Return true for "OK", false for "Cancel"
        });
      
        cy.get('button[onclick="jsConfirm()"]').click(); 
      
        cy.get('#result').invoke('text').then((resultText) => {
          if (confirmChoice) {
            expect(resultText).to.equal('You clicked: Ok');
          } else {
            expect(resultText).to.equal('You clicked: Cancel');
          }
        });
      });
        
      
      
    /* it('JS Confirm with Loop', () => {                  
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
        
        const confirmChoices = [true, false]; // Perform both actions: true for OK, false for Cancel
        
        cy.window().then((win) => {
          cy.stub(win, 'confirm');                                  // Stub confirm once outside the loop
        });
      
        confirmChoices.forEach((choice) => {
          cy.log(`choice is ${choice}`);
          
          cy.window().then((win) => {
            win.confirm.callsFake(() => choice);                    // Simulate confirm with the current choice
          });
          
          cy.get('button[onclick="jsConfirm()"]').click();          // Trigger the confirm dialog
      
          cy.get('#result').invoke('text').then((resultText) => {
            if (choice) {
              expect(resultText).to.equal('You clicked: Ok'); // Verify OK result
            } else {
              expect(resultText).to.equal('You clicked: Cancel'); // Verify Cancel result
            }
          });
        });
      });
     */    

    it('JS Prompt', () => {                  
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        const promptText = 'test'
 
        cy.window().then((win => { 
            cy.stub(win,'prompt').returns(`${promptText}`) 
        }))
        
        cy.get('[onclick="jsPrompt()"]').click()
        cy.get('#result').should('have.text',`You entered: ${promptText}`)
 
    })

    it.only('Prompt alert - Loop through actions', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
        
        const promptActions = [
          { input: 'test', expectedText: 'You entered: test' },     // OK action
          { input: '', expectedText: 'You entered: ' },             // Cancel action
        ];
      
        promptActions.forEach(({ input, expectedText }) => {
          cy.window().then((win) => {
            if (win.prompt.restore) {
              win.prompt.restore();                                                                     // Restore the original `prompt` method. This Clear Stub Before Reuse: Ensures a clean state for each iteration, preventing conflicts or wrapping errors.
            }
            cy.stub(win, 'prompt').returns(input);                                                      // Stub the prompt with the desired input
          });      
          cy.get('button[onclick="jsPrompt()"]').click();       
          cy.get('#result').should('have.text', expectedText); 
        });
      });
      
});