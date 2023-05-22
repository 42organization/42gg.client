describe('매치 기능 테스트', () => {
  it('일반전 매칭과 패널티 테스트 🤔', () => {
    cy.login(Cypress.env('NORMAL_USERNAME'), Cypress.env('NORMAL_PASSWORD'));
    cy.origin(Cypress.env('HOME'), () => {
      // 매치 버튼 눌러 매치 페이지로
      cy.get('a').filter('[class^=Layout_matchingButton]').click();
      // 토글 눌러서 일반전으로 변경
      cy.wait(1000);
      cy.get('[class^=ModeToggle_toggleButton]').click();
      cy.get('span[class^=ModeToggle_toggleText]').should('have.text', '일반');
      cy.wait(1000);
      // 두번째로 가능한 슬롯 잡기
      cy.register(1, '1/2');
      // TODO : alert 확인
      // 위 현재 매치 정보 확인, 취소 버튼 뜨는지 확인
      cy.wait(3000);
      cy.get('[class^=CurrentMatchInfo_container]').should('exist');
      cy.get('[class^=CurrentMatchInfo_cancelButton]').should('exist');
    });
    cy.logout(Cypress.env('NORMAL_USERNAME'));
    // 2. 두번째 유저 로그인
    cy.login(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait(1000);
      // notibar 열기 (unread 상태의 메세지들을 없애기 위함)
      cy.get('[id^=Header_notiIcon]').click();
      cy.wait(500);
      // notibar 닫기
      cy.get('div[class^=NotiBar_container]').find('button').first().click();
      // 두번째 유저 일반전 매치
      cy.get('a').filter('[class^=Layout_matchingButton]').click();
      cy.wait(1000);
      cy.get('[class^=ModeToggle_toggleButton]').click();
      cy.get('span[class^=ModeToggle_toggleText]').should('have.text', '일반');
      cy.wait(1000);
      // 1/2 슬롯 잡기
      cy.register(0, '1/2');
      // 게임 매치 알림 확인
      cy.get('[id^=Header_notiIcon]').click();
      cy.wait(500);
      cy.get('[class^=NotiItem_unreadWrap]')
        .find('span[class^=NotiItem_title]')
        .should('have.text', '매칭 성사');
      cy.get('div[class^=NotiBar_container]').find('button').first().click();
      cy.wait(1000);
      // 두번째 유저가 게임 취소
      cy.get('[class^=CurrentMatchInfo_cancelButton]').click();
      cy.get('input[value=예]').click();
      // 새로고침해서 확인
      cy.reload();
      cy.wait(3000);
      // 다시 슬롯 클릭해서 모달 안뜨는지 확인 -> 패널티 여부 확인 겸
      cy.register(0, '+');
      // api error 확인
      cy.get('input[value=확인]').click();
      cy.wait(3000); // api 처리 결과 기다림
      cy.get('[class^=CurrentMatchInfo_container]').should('not.exist'); // 경기가 잡히지 않아야 함.
    });
    // 두번째 유저 로그아웃
    cy.logout(Cypress.env('ADMIN_USERNAME'));
  });
  it('랭크전 매칭 테스트 🤔', () => {
    // 첫번째 유저 로그인
    cy.login(Cypress.env('NORMAL_USERNAME'), Cypress.env('NORMAL_PASSWORD'));
    cy.origin(Cypress.env('HOME'), () => {
      cy.wait(1000);
      // 기다리고 있는 슬롯을 취소한다. (새로 랭킹전으로 잡을 예정)
      cy.get('[class^=CurrentMatchInfo_cancelButton]').click();
      cy.get('input[value=예]').click();
      // 매치 페이지로 이동
      cy.get('a').filter('[class^=Layout_matchingButton]').click();
      cy.wait(1000);
      // 랭크전 슬롯 등록
      cy.register(1, '+');
    });
    // 첫번째 유저 로그아웃
    cy.logout(Cypress.env('NORMAL_USERNAME'));
    // 두번째 유저 로그인
    cy.login(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
    cy.origin(Cypress.env('HOME'), () => {
      // notibar 열기 (unread 상태의 메세지들을 없애기 위함)
      cy.get('[id^=Header_notiIcon]').click();
      cy.wait(500);
      // notibar 닫기
      cy.get('div[class^=NotiBar_container]').find('button').first().click();
      cy.wait(1000);
      // 매치 페이지로 이동
      cy.get('a').filter('[class^=Layout_matchingButton]').click();
      cy.wait(1000);
      // 랭크전에 등록 가능한 슬롯 등록
      cy.register(0, '1/2');
      //랭크 게임 매치 상태 확인
      cy.get('[id^=Header_notiIcon]').click();
      cy.wait(500);
      cy.get('[class^=NotiItem_unreadWrap]')
        .find('span[class^=NotiItem_title]')
        .should('have.text', '매칭 성사');
      // 게임 시작까지 대기
      cy.wait(Cypress.env('GAME_SLOT_TIME'));
    });
  });
  it('게임 결과 입력 테스트 🤔', () => {
    // 위 주석때문에 추가함. 로그인 주석도 추가함.
    cy.login(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
    cy.origin(Cypress.env('HOME'), () => {
      // 게임 결과 입력 테스트
      // 1. 결과 등록 모달이 떠야 함.
      cy.get('[class^=AfterGameModal_container]').should('exist');
      // 2. 결과 등록 모달 외 다른 부분 클릭이 되면 안됨
      // cy.get('[class*=MatchSlot_plus]:not(:enabled)');
      //   cy.get('[class*=MatchSlot_plus]').should('not.be.enabled');
      // 3. 점수 등록하기
    });
    // 3. 입력 안했을 경우에 등록이 가능한지 확인
    cy.typeScore('', '', false);
    // 1. 0, 1, 2 범위 외의 문자가 등록 가능한지 확인 (-1, 3, a, ...)
    cy.typeScore(-1, 2, false);
    cy.typeScore(2, -1, false);
    const randomNumberAboveTwo =
      Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 2)) + 2;
    cy.typeScore(randomNumberAboveTwo, 1, false);
    cy.typeScore(1, randomNumberAboveTwo, false);
    const randomNegativeNumber = -Math.floor(Math.random() * 10) - 1;
    cy.typeScore(randomNegativeNumber, 1, false);
    cy.typeScore(1, randomNegativeNumber, false);
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()가나다라마바사아자차카타파하';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    cy.typeScore(randomString[0], randomString[1], false);
    cy.typeScore(1, randomString, false);

    // 2. 무승부 점수 등록이 가능한지 확인
    cy.typeScore(0, 0, false);
    cy.typeScore(1, 1, false);
    cy.typeScore(2, 2, false);

    cy.typeScore('0000', '0000', false);

    // 4. 정상적인 입력 넣어서 확인
    cy.typeScore(1, 2, true);
    // 두번째 유저 로그아웃
    cy.logout(Cypress.env('ADMIN_USERNAME'));
  });
  it('경기 기록 테스트 🤔', () => {
    // 첫번째 유저 로그인
    cy.login(Cypress.env('NORMAL_USERNAME'), Cypress.env('NORMAL_PASSWORD'));
    cy.origin(Cypress.env('HOME'), () => {
      // 경기 결과 조회 테스트
      cy.wait(1000);
      // 1. 게임 모달 종료 누르기
      cy.get('[class^=AfterGameModal_container]')
        .find('input[type=button]')
        .click();
      cy.wait(1000);
      cy.get('[class^=StatChangeModal]').click();
      // 2. 최근 경기가 첫번째, 두번째 아이디로 되어있는지 확인
      let gameId = '';
      cy.get('[class^=GameResultItem_bigContainer]').then(($bigContainer) => {
        const $bigTeams = $bigContainer.find('[class^=GameResultItem_userId]');
        const intraId1 = $bigTeams.eq(0).text();
        const intraId2 = $bigTeams.eq(1).text();
        // 최근 경기 id 저장
        cy.wrap($bigContainer)
          .invoke('attr', 'id')
          .then((id) => {
            gameId = String(id);
          });
        if (
          intraId1 === 'hyungjpa' /* Cypress.env('NORMAL_USERNAME') */ &&
          intraId2 === 'sangmipa' /* Cypress.env('ADMIN_USERNAME') */
        ) {
          return;
        } else {
          throw new Error('일치하는 유저 아이디가 없습니다');
        }
      });
      cy.get('a').filter("[href='/game']").click();
      cy.wait(1000);
      // 3. 시즌 바꿔서 확인 (다른 시즌에는 없어야 함)
      cy.get('input[type="radio"][value="rank"]')
        .as('rankRadioBtn')
        .click()
        .then(() => {
          cy.wait(1000);
          cy.get('select[class^=SeasonDropDown_select]').trigger('change', {
            value: '3',
          });
          cy.wait(1000);
          cy.get('[class^=GameResultItem_bigContainer]').then(
            ($bigContainer) => {
              cy.wrap($bigContainer)
                .invoke('attr', 'id')
                .then((id) => {
                  if (String(id) == gameId) {
                    throw new Error('다른 시즌에 게임이 존재합니다');
                  }
                });
            }
          );
        });
      // 4. 일반 버튼을 눌러서 확인 (기록이 없어야 함)
      cy.get('input[type="radio"][value="normal"]')
        .as('normalRadioBtn')
        .click()
        .then(() => {
          cy.wait(1000);
          cy.get('[class^=GameResultItem_bigContainer]').then(
            ($bigContainer) => {
              cy.wrap($bigContainer)
                .invoke('attr', 'id')
                .then((id) => {
                  if (String(id) == gameId) {
                    throw new Error('일반게임에 랭크게임이 존재합니다');
                  }
                });
            }
          );
        });
    });
  });
});
