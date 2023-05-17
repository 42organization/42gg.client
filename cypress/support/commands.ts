/// <reference types="cypress" />

import { valuesIn } from 'cypress/types/lodash';

// 로그인
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

// 로그아웃
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

// target 표시의 슬롯 중 flag 번째의 슬롯을 등록하는 command
Cypress.Commands.add('register', (flag: number, target: '+' | '1/2') => {
  let count = 0;
  cy.get('[class*=MatchSlot_plus]').each(($el4) => {
    if ($el4.text() === target) {
      if (flag != count) {
        count++;
        return;
      }
      cy.wrap($el4).click();
      return false;
    }
  });
  cy.wait(1000);
  cy.get('input[value=확인]').click();
});

// 경기 결과 입력 테스트 command (success: true => 의도한 성공, false => 의도한 실패)
Cypress.Commands.add(
  'typeScore',
  (myScore: number | string, enemyScore: number | string, success: boolean) => {
    cy.origin(
      Cypress.env('HOME'),
      { args: { myScore, enemyScore, success } },
      ({ myScore, enemyScore, success }) => {
        cy.wait(1000);

        const myTeamScore = cy.get('#myTeamScore');
        const enemyTeamScore = cy.get('#enemyTeamScore');
        enemyTeamScore.clear();
        myTeamScore.clear();
        if (myScore !== '') myTeamScore.type(String(myScore));
        if (enemyScore !== '') enemyTeamScore.type(String(enemyScore));

        let myTeamInput = '';
        let enemyTeamInput = '';
        cy.get('#myTeamScore')
          .invoke('val')
          .then((value) => {
            myTeamInput = value as string;
            cy.get('#enemyTeamScore')
              .invoke('val')
              .then((value) => {
                enemyTeamInput = value as string;
                if (
                  myTeamInput === String(myScore) &&
                  enemyTeamInput === String(enemyScore)
                ) {
                  cy.get('[class^=AfterGameModal_container]')
                    .find('input[type=button]')
                    .click();
                  cy.wait(1000);
                }
              });
          });

        if (success) {
          cy.get('[class^=AfterGameModal_container]')
            .find('input[value=제출하기]')
            .click();
          cy.wait(3000);
          cy.get('div[class^=AfterGameModal]').should('not.exist');
        } else cy.get('div[class^=AfterGameModal]').should('exist');
      }
    );
  }
);
