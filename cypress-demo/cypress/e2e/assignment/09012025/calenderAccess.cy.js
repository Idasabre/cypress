describe('calender access - date picker', () => {
    it('date picker 1', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get('p #datepicker').scrollIntoView().then(($input) => {
            cy.wrap($input).clear().type('01/09/2020{enter}')
        })
    })

    it('date picker 2', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get('p #txtDate').scrollIntoView().then(($input) => {
            cy.wrap($input).click()
            cy.get('.ui-datepicker-calendar tbody tr td a').contains('2').click()
        })
        cy.get('.ui-datepicker-month').select('Jan')
        cy.get('.ui-datepicker-year').select('2015')
    })
    it('date picker 3', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get('div .date-picker-box').scrollIntoView().then(($input) => {
            cy.wrap($input).click()
            cy.get('#start-date').type('2015-01-02')
        })
        cy.get('div .date-picker-box').scrollIntoView().then(($input) => {
            cy.wrap($input).click()
            cy.get('#end-date').type('2015-01-29')
        })
    })
})