export {};

describe('프로필 기능 테스트 🥳', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
  });
  beforeEach(() => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.visit(Cypress.env('HOME'));
      cy.get('[class^=MainPageProfile_myImage]').click();
    });
  });
  it('페이지 이동 및 이름 랜더링 확인 🤔', () => {
    cy.origin(Cypress.env('HOME'), () => {
      // 1. 페이지 이동 확인
      cy.url().should(
        'include',
        `users/detail?intraId=${Cypress.env('ADMIN_USERNAME')}`
      );
      // wait for rendering
      cy.wait(1000);
      // 2. 이름 랜더링 확인
      cy.get('[class^=Profile_intraId]').should(
        'have.text',
        Cypress.env('ADMIN_USERNAME')
      );
    });
  });
  it('프로필 edit 취소 기능 확인 🤔', () => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait(1000);
      cy.get('[class^=Profile_statusMessage]').then((statusElement) => {
        // 0. 비교용 기존 상태메시지 저장
        const oldStatusMessage = statusElement.text();
        const newStatusMessage = 'not changed';
        // 1. 취소 버튼 작동 확인
        cy.get('[class^=Profile_buttons] > svg').click();
        cy.get('textarea').clear();
        cy.wait(1000);
        cy.get('textarea').type(newStatusMessage);
        cy.get('input[value=취소]').click();
        cy.get('[class^=Profile_statusMessage]').should(
          'have.text',
          oldStatusMessage
        );
        // 2. modal close 작동 확인
        cy.get('[class^=Profile_buttons] > svg').click();
        cy.get('textarea').clear();
        cy.wait(1000);
        cy.get('textarea').type(newStatusMessage);
        cy.get('[class^=Modal_backdrop]').click('topRight');
        cy.get('[class^=Profile_statusMessage]').should(
          'have.text',
          oldStatusMessage
        );
      });
    });
  });
  it('프로필 edit 기능 확인 🤔 - 알림', () => {
    cy.intercept(
      'PUT',
      `${Cypress.env('SERVER_ENDPOINT')}/pingpong/users/${Cypress.env('ADMIN_USERNAME')}`
    ).as('profileApi');
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait(1000);
      cy.get('[class^=Profile_buttons] > svg').click();
      cy.wait(1000);
      // 0. 기존 email click 여부 저장하기 (이후 원래대로 돌려놓기 위함)
      let emailClicked: boolean;
      cy.get('[class^=Profile_snsButton]')
        .contains('Email')
        .invoke('attr', 'class')
        .then((className) => {
          if (className) {
            emailClicked = className.includes('Profile_snsClicked');
          }
        });
      // 1. 슬랙 알림 선택 테스트
      cy.get('[class^=Profile_snsButton]').contains('Slack').click();
      // TODO : alert 내용 확인 부분 추가 필요함.
      // cy.on('window:alert', (alertContent) => {
      //   //assertions
      //   expect(alertContent).to.contains('슬랙 알림은 현재 준비중입니다.');
      // });
      // 2. 이메일 적용 결과가 잘 전송되는지 확인
      cy.get('[class^=Profile_snsButton]').contains('Email').click();
      cy.get('input[value=확인]').click();
      //cy.wait(1000);
      cy.wait('@profileApi').then((interception) => {
        const res = interception.request.body.snsNotiOpt;
        const expected = emailClicked ? 'NONE' : 'EMAIL';
        expect(res).to.equal(expected);
        // 원래대로 돌려두기
        cy.get('[class^=Profile_buttons] > svg').click();
        cy.wait(1000);
        cy.get('[class^=Profile_snsButton]').contains('Email').click();
        cy.get('input[value=확인]').click();
      });
    });
  });
  it('프로필 edit 기능 확인 🤔 - 상태메시지', () => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait(1000);
      cy.get('div[class^=Profile_statusMessage]').then((statusElement) => {
        // 0. 기존 상태메시지와 바꿀 상태메시지 저장
        const oldStatusMessage = statusElement.text();
        const newStatusMessage = 'changed';
        // 1. 상태메시지 변경이 실제로 적용되는지 확인
        cy.get('[class^=Profile_buttons] > svg').click();
        cy.wait(1000);
        cy.get('textarea').clear();
        cy.wait(1000);
        cy.get('textarea').type(newStatusMessage);
        cy.get('input[value=확인]').click();
        cy.wait(1000);
        cy.get('[class^=Profile_statusMessage]').should(
          'have.text',
          newStatusMessage
        );
        // 원래대로 돌려놓기
        cy.get('[class^=Profile_buttons] > svg').click();
        cy.wait(1000);
        cy.get('textarea').clear();
        cy.wait(1000);
        cy.get('textarea').type(oldStatusMessage);
        cy.get('input[value=확인]').click();
      });
    });
  });
  it('프로필 edit 기능 확인 🤔 - 라켓 변경', () => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.get('[class^=Profile_racket]').then((racketElement) => {
        // 0. 기존 라켓 선택 정보(원래대로 돌려놓기 위함)와 바꿀 라켓 정보 저장
        const oldRacket = racketElement.text();
        let newRacket = '';
        switch (oldRacket) {
          case 'PENHOLDER':
            newRacket = 'SHAKEHAND';
            break;
          case 'SHAKEHAND':
            newRacket = 'DUAL';
            break;
          default:
            newRacket = 'PENHOLDER';
        }
        // 1. 라켓 종류 변경이 적용되는지 확인
        cy.get('[class^=Profile_buttons] > svg').click();
        cy.wait(1000);
        cy.get('[class^=Profile_radioButton]').contains(newRacket).click();
        cy.get('input[value=확인]').click();
        cy.wait(1000);
        cy.get('[class^=Profile_racket]').should('have.text', newRacket);
        // 원래대로 돌려놓기
        cy.get('[class^=Profile_buttons] > svg').click();
        cy.wait(1000);
        cy.get('[class^=Profile_radioButton]').contains(oldRacket).click();
        cy.get('input[value=확인]').click();
      });
    });
  });
  it('시즌 api 호출 테스트 🤔', () => {
    cy.intercept(
      `${Cypress.env('SERVER_ENDPOINT')}/pingpong/users/${Cypress.env(
        'ADMIN_USERNAME'
      )}/rank*`
    ).as('rankApi');
    cy.intercept(
      `${Cypress.env('SERVER_ENDPOINT')}/pingpong/users/${Cypress.env(
        'ADMIN_USERNAME'
      )}/historics*`
    ).as('historicsApi');
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait(1000);
      // season dropdown 클릭 => season value 확인
      // 현재는 모든 시즌을 검사하지만 범위를 줄여서 테스트 할 수도 있음.
      // TODO : 응답 결과에 따른 랜더링 결과는 검사하지 않음.
      cy.get('select[class^=SeasonDropDown]')
        .children('option')
        .each(($option) => {
          const value = $option.val() as string; // 각 옵션의 value
          cy.wrap($option).parent().select(value); // 옵션 선택
          // 2개의 api 쿼리에 vaule와 동일한 값이 있는지, 호출 응답이 성공인지 확인
          cy.wait(['@historicsApi', '@rankApi']).then((interceptions) => {
            const query = interceptions[0].request.url
              .split('?')[1]
              .split('=')[1];
            expect(query).to.equal(value);
            expect(interceptions[0].response?.statusCode).to.equal(200);
            const query2 = interceptions[1].request.url
              .split('?')[1]
              .split('=')[1];
            expect(query2).to.equal(value);
            expect(interceptions[1].response?.statusCode).to.equal(200);
          });
        });
    });
  });
  it('경기 기록 api 확인 🤔', () => {
    cy.intercept(
      `${Cypress.env('SERVER_ENDPOINT')}/pingpong/games?intraId=${Cypress.env(
        'ADMIN_USERNAME'
      )}*`
    ).as('gameApi');
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait('@gameApi').then((interception) => {
        // 1. api 쿼리에 적절한 값이 들어가는지 확인. 응답코드가 성공인지 확인
        const querys = interception.request.url.split('?')[1].split('&');
        const intraId = querys[0].split('=')[1];
        const count = querys[1].split('=')[1];
        const size = querys[2].split('=')[1];
        expect(intraId).to.equal(`${Cypress.env('ADMIN_USERNAME')}`);
        expect(count).to.equal('5');
        expect(size).to.equal('1');
        expect(interception.response?.statusCode).to.equal(200);
      });
      // 2. 버튼을 눌렀을 때 유저별 game 페이지로 이동하는지 확인
      cy.get('[class^=Section_titleWrap] > button').click();// get 확인
      cy.wait(500);
      cy.url().should(
        'include',
        `/game?intraId=${Cypress.env('ADMIN_USERNAME')}`
      );
    });
  });
});
