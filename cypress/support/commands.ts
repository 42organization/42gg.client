/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (username: string, password: string) => {
  // intra login
  cy.visit('https://profile.intra.42.fr/users/auth/keycloak_student');
  cy.get('#username').type(Cypress.env('normal_username'));
  cy.get('#password').type(Cypress.env('normal_password'));
  cy.get('#kc-login').click();
  // check if logged in successfully
  cy.url().should('include', 'https://profile.intra.42.fr/');
  // 42gg login
  cy.visit(`${Cypress.env('SERVER_ENDPOINT')}/oauth2/authorization/42`);
  cy.wait(2000);
  // check if logged in successfully
  cy.origin(Cypress.env('home'), () => {
    cy.url().should('include', Cypress.env('home'));
    cy.get('body').then(($body) => {
      // body 내 공지 모달이 있는 경우에 모달 닫기
      if ($body.find('[class^=AnnouncementModal]').length) {
        cy.get('input#neverSeeAgain').click();
        cy.get('input[value=닫기]').click();
      }
      // body 내 welcome 모달이 있는 경우에 모달 닫기
      if ($body.find('[class^=WelcomeModal]').length) {
        cy.get('input[value=홈으로]').click();
      }
    });
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
