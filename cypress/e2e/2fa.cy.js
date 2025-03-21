import { authenticator } from 'otplib';

describe('2FA Login Test', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    const secretKey = Cypress.env('secretKey');

  it('Logs in with 2FA', () => {
    cy.visit('https://github.com/login');

    cy.get('input[name="login"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/sessions/two-factor/app');

    const otpCode = authenticator.generate(secretKey);

    cy.get('#app_totp').type(otpCode);
    cy.url().should('eq', 'https://github.com/');
  });
}); 