describe('Javascript Alert', () => {   
    it('JS simple alert', () => {                  
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
      
    it('JS confirm alert', () => {                  
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
      
        const confirmChoice = false;    // Change this to true to simulate "OK"
      
        cy.on('window:confirm', (confirmText) => {
          expect(confirmText).to.equal('I am a JS Confirm');
          return confirmChoice;         // Return true for "OK", false for "Cancel"
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
        
    it('JS Prompt alert - loop through actions', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
        
        const promptActions = [
          { input: 'test', result: 'You entered: test' },     // OK 
          { input: '', result: 'You entered: ' },             // Cancel 
        ];
      
        promptActions.forEach(({ input, result }) => {
          cy.window().then((win) => {
            if (win.prompt.restore) {
              win.prompt.restore();                                                                                     // Restore the original `prompt` method. This Clear Stub Before Reuse: Ensures a clean state for each iteration, preventing conflicts or wrapping errors.
            }
            cy.stub(win, 'prompt').returns(input);                                                                       // Stub the prompt with the desired input
          });      
          cy.get('button[onclick="jsPrompt()"]').click();       
          cy.get('#result').should('have.text', result); 
        });
      });

      it('Authenticated alert - method 1',() =>{
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {auth: {username: "admin", password: "admin"}})
         cy.get('.example > p').should('have.text','\n    Congratulations! You must have the proper credentials.\n  ')  
     })
  
     it('Authenticated alert - method 2',() =>{
        cy.visit(`https://admin:admin@the-internet.herokuapp.com/basic_auth`);
        
         cy.get('.example > p').should('have.text','\n    Congratulations! You must have the proper credentials.\n  ')
  
      })  
 })