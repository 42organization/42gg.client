describe('게임 기능 테스트', () => {
  before(() => {
    cy.login(Cypress.env('NORMAL_USERNAME'), Cypress.env('NORMAL_PASSWORD'));
  });
  beforeEach(() => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.visit(Cypress.env('HOME'));
    });
  });
  it('HOME에서 게임 컴포넌트 랜더링 확인 🤔', () => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait(1000);
      // 1. 게임 컴포넌트 랜더링 확인
      cy.get('[class^=GameResultItem]').then((gameResultItem) => {
        // 2. big 컴포넌트와 small 컴포넌트 갯수 확인
        cy.get('[class^=GameResultItem]')
          .filter('[class^=GameResultItem_bigContainer]')
          .should('have.length', 1);

        cy.get('[class^=GameResultItem]')
          .filter('[class^=GameResultItem_smallContainer]')
          .should('have.length', 2);

        // 3. 첫번째 컴포넌트가 big인지 확인
        cy.get('[class^=GameResultItem')
          .first()
          .invoke('attr', 'class')
          .then((className) => {
            expect(className).to.include('big');
          });
        // 4. 첫번째 small 컴포넌트 클릭
        cy.get('[class^=GameResultItem_smallContainer]').first().click();
        // wait for rendering
        cy.wait(1000);
        // 5. 첫번째 Container 컴포넌트가 small인지 확인
        cy.get('[class^=GameResultItem')
          .first()
          .invoke('attr', 'class')
          .then((className) => {
            expect(className).to.include('small');
          });
      });
    });
  });
  it('게임 페이지 이동 및 컴포넌트 렌더링 확인 🤔', () => {
    cy.origin(Cypress.env('HOME'), () => {
      //1. 게임 페이지 이동
      cy.get('a').filter("[href='/game']").click();
      // wait for rendering
      cy.wait(1000);
      // 2. 게임 컴포넌트 랜더링 확인
      cy.get('input[value="더 보기"]').click();
      // wait for rendering
      cy.wait(1000);
      cy.get('div[class*="smallContainer"]').each(($el1, index, $list) => {
        cy.wrap($el1).click();
      });
      // 3. 노말 게임으로 변경 및 컴포넌트 렌더링 확인
      cy.get('input[type="radio"][value="normal"]')
        .as('normalRadioBtn')
        .click()
        .then(() => {
          cy.wait(1000);
          cy.get('div[class*="smallContainer"]').each(($el2, index, $list) => {
            cy.wrap($el2).click();
          });
        });
      // wait for rendering
      cy.wait(1000);
      // 4. 랭크 게임으로 변경 및 컴포넌트 렌더링 확인
      cy.get('input[type="radio"][value="rank"]')
        .as('rankRadioBtn')
        .click()
        .then(() => {
          cy.wait(1000);
          cy.get('div[class*="smallContainer"]').each(($el3, index, $list) => {
            cy.wrap($el3).click();
          });
        });
    });
  });
  it('유저 검색 확인 🤔', () => {
    cy.origin(Cypress.env('HOME'), () => {
      // 1. 게임 페이지 이동
      cy.get('a').filter("[href='/game']").click();
      // wait for rendering
      cy.wait(1000);
      // 2. 가장 최근 경기한 유저 아이디 검색
      cy.get('[class^=GameResultItem_userId]')
        .first()
        .invoke('text')
        .then((userId) => {
          cy.get('input[type="text"][placeholder="유저 검색하기"]').type(
            userId
          );
          // wait for rendering
          cy.wait(2000);
          cy.get('div[class^=SearchBar_dropdown]').children().first().click();
          // wait for rendering
          cy.wait(1000);
          // 3. 모든 작은 게임 컴포넌트에 유저 아이디가 일치하는지 확인
          cy.get('[class^=GameResultItem_smallContainer]').each(
            ($smallContainer) => {
              const $smallTeams = $smallContainer.find(
                '[class^=GameResultItem_smallTeam]'
              );
              const intraId1 = $smallTeams.eq(0).find('span div').text();
              const intraId2 = $smallTeams.eq(1).find('span div').text();

              if (intraId1 === userId || intraId2 === userId) {
                return;
              } else {
                throw new Error('일치하는 유저 아이디가 없습니다');
              }
            }
          );
        });
    });
  });
  //   it('Live 상태 컴포넌트 랜더링 확인 🤔', () => {
  //     // 1. live 상태 컴포넌트 랜더링 확인
  //     cy.origin(Cypress.env('HOME'), () => {});
  //     // 컴포넌트 ... 또는 live 상태인지 확인 및 맞으면 저장
  //   });
});

// click on record button
