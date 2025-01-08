//cypress command function
/* Cypress.Commands.add('genRandomEmail', () => {
    const randomString = Math.random().toString(36).substring(7);
    const randomEmail = `user_${randomString}@gmail.com`;
    Cypress.env('randomEmail', randomEmail);  // Store the email in Cypress.env
    return randomEmail;
}); */

//custom javascript function
export const genRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(7);
    const randomEmail = `user_${randomString}@gmail.com`;
    Cypress.env('randomEmail', randomEmail);  // Store the email in Cypress.env
    return randomEmail;
};