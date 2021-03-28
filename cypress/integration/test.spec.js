/// <reference types="cypress" />

describe('Feature: Authentication', () => {
  it('should load the authentication page', () => {
    cy
      .visit('/')
      .get('[data-cy=lnk-home')
      .should('have.text', 'Recipe Book')
      .get('[data-cy=lnk-authenticate')
      .should('have.text', 'Authenticate')
      .get('[data-cy=lnk-shopping-list')
      .should('have.text', 'Shopping list');
  });
});