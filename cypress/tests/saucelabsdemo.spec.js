const users = require('../fixtures/users');

describe('Sauce Demo - Authentication Test Suite ', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it(' SC1 - Valid username and password', () => {
        cy.login(users[0].username, users[0].password);

        cy.url().should('include', 'inventory');
        cy.get('.inventory_item').should('have.length', 6).and('be.visible');
    });

    it('SC2 - Valid username and invalid password', () => {
        cy.login(users[1].username, users[1].password);

        cy.get('[data-test=error]')
            .should('be.visible')
            .and('include.text', 'Username and password do not match any user');
    });

    it('SC3 - Invalid username and valid password', () => {
        cy.login(users[2].username, users[2].password);

        cy.get('[data-test=error]')
            .should('be.visible')
            .and('include.text', 'Username and password do not match any user');
    });

    it('SC4 - Locked out user', () => {
        cy.login(users[3].username, users[3].password);

        cy.get('[data-test=error]')
            .should('be.visible')
            .and('include.text', 'this user has been locked out');
    });

    it(' SC5 - Use Custom Commands', () => {
        cy.login('standard_user', 'secret_sauce');

        cy.url().should('include', 'inventory');
        cy.get('.inventory_item').should('have.length', 6).and('be.visible');
    });
});
