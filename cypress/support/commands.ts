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
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#kc-login').click();
  // check if logged in successfully
  cy.url().should('eq', 'https://profile.intra.42.fr/');
  // 42gg login
  cy.visit(`${Cypress.env('SERVER_ENDPOINT')}/oauth2/authorization/42`);
  cy.wait(2000);
  // check if logged in successfully
  cy.origin(Cypress.env('HOME'), () => {
    cy.url().should('eq', Cypress.env('HOME'));
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

Cypress.Commands.add('logout', (username: string) => {
  // step 1. 42gg logout
  cy.visit(Cypress.env('HOME'));
  cy.origin(Cypress.env('HOME'), () => {
    cy.get('[class^=Header_headerLeft]').click();
    cy.get('div[id^=MenuBar_logout] > div').contains('로그아웃').click();
    cy.get('div[class^=LogoutModal_positive] > input[type=button]').click();
  });
  // step 2. intra logout
  cy.visit('https://profile.intra.42.fr/');
  cy.url().should('eq', 'https://profile.intra.42.fr/');
  cy.wait(500);
  cy.get('span[class=dropdown]').contains(username).click();
  cy.get('ul[class=dropdown-menu] > li').contains('Logout').click();
  Cypress.on('uncaught:exception', (err: Error, runnable: Mocha.Runnable) => {
    // FIXME : 원인 모를 에러 임시 처리. 해결 필요.
    if (
      err.message.includes(
        "Cannot read properties of undefined (reading 'reset')"
      )
    ) {
      return false;
    }
  });
  cy.visit(Cypress.env('HOME'));
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
