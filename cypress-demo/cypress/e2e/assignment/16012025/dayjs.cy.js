// Import external libraries
const dayjs = require('dayjs');

describe('Test with dayjs', () => {
    it('Uses dayjs for date manipulation', () => {
        // Get current date and format it
        const currentDate = dayjs().format('YYYY-MM-DD');
        const formattedDate = dayjs().format('dddd, MMMM D, YYYY');     // e.g., Friday, January 17, 2025
        const futureDate = dayjs().add(7, 'days').format('YYYY-MM-DD'); // 7 days from today

        cy.log('Current Date:', currentDate);
        cy.log('Formatted Date:', formattedDate);
        cy.log('Future Date:', futureDate);
    });
});

//Notes
//npm install dayjs --save
//const dayjs = require("dayjs"); (spec)


/* it('dayjs from training',() => {
    // const dayjs = require("dayjs");        
    //getting today's date

    const todaysDate = dayjs().format("MMM DD, YYYY");
    cy.log('Printing today date in required format: ' + todaysDate)
    const date = '2017-02-12'
    const newDate = dayjs(date).format("MM-DD-YY");
    const dayhr  = dayjs()
    cy.log(dayhr.toString())
    cy.log('Formatting existing date: ' +newDate);

})
 */
