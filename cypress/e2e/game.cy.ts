export {};

describe('게임 기능 테스트', () => {
  beforeEach(() => {
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
      const gameComponentRegex =
        '[class^="GameResultItem"][class*="ItemContainer"]';
      cy.get(gameComponentRegex).then(() => {
        // 2. big 컴포넌트와 small 컴포넌트 갯수 확인
        cy.get(gameComponentRegex)
          .filter('[class^=GameResultItem_bigItemContainer]')
          .should('have.length', 1);

        cy.get(gameComponentRegex)
          .filter('[class^=GameResultItem_smallItemContainer]')
          .should('have.length', 2);

        // 3. 첫번째 컴포넌트가 big인지 확인
        cy.get(gameComponentRegex)
          .first()
          .invoke('attr', 'class')
          .then((className) => {
            expect(className).to.include('big');
          });
        // 4. 첫번째 small 컴포넌트 클릭
        cy.get('[class^=GameResultItem_smallItemContainer]').first().click();
        // wait for rendering
        cy.wait(1000);
        // 5. 첫번째 Container 컴포넌트가 small인지 확인
        cy.get(gameComponentRegex)
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
      cy.contains('Current Play').parent().find('button').click();
      // wait for rendering
      cy.wait(1000);
      // 2. 게임 컴포넌트 랜더링 확인
      cy.get('button[class*="getButton"]').click();
      // wait for rendering
      cy.wait(1000);
      cy.get('div[class*="smallItemContainer"]').each(($el1) => {
        cy.wrap($el1).click();
      });
      // 3. 노말 게임으로 변경 및 컴포넌트 렌더링 확인
      cy.get('input[type="radio"][value="NORMAL"]')
        .as('normalRadioBtn')
        .click()
        .then(() => {
          cy.wait(1000);
          cy.get('div[class*="smallItemContainer"]').each(($el2) => {
            cy.wrap($el2).click();
          });
        });
      // wait for rendering
      cy.wait(1000);
      // 4. 랭크 게임으로 변경 및 컴포넌트 렌더링 확인
      cy.get('input[type="radio"][value="RANK"]')
        .as('rankRadioBtn')
        .click()
        .then(() => {
          cy.wait(1000);
          cy.get('div[class*="smallItemContainer"]').each(($el3) => {
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
  it('Live 상태 컴포넌트 랜더링 확인 🤔', () => {
    // 1. live 상태 컴포넌트 랜더링 확인
    cy.origin(Cypress.env('HOME'), () => {
      let gameId = '';
      cy.get('[class^=GameResultItem_bigContainer]').each(($bigContainer) => {
        const $bigScore = $bigContainer.find(
          '[class^=GameResultItem_bigScore]'
        );
        const $status = $bigScore.find('[class^=GameResultItem_gameStatus]');

        // 첫번째 컴포넌트 live 상태인지 확인 및 맞으면 저장
        if (
          $status.hasClass('GameResultItem_gameStatusWait') ||
          ($status.text() && $status.text() === 'LIVE')
        ) {
          cy.wrap($bigContainer)
            .invoke('attr', 'id')
            .then((id) => {
              gameId = String(id);
            });
        }
      });
      cy.get('a').filter("[href='/game']").click();
      // Wait for rendering
      cy.wait(2000);
      cy.get('[class^=GameResultItem_bigContainer]')
        .invoke('attr', 'id')
        .then((id) => {
          if (gameId === id) {
            throw new Error('live 상태가 있습니다');
          }
        });
      cy.get('div[class*="smallContainer"]').each(($el1) => {
        cy.wrap($el1).click();
        cy.wait(1000);
        cy.get('[class^=GameResultItem_bigContainer]')
          .invoke('attr', 'id')
          .then((id) => {
            if (gameId === id) {
              throw new Error('live 상태가 있습니다');
            }
          });
      });
    });
  });
});
