describe('매치 기능 테스트', () => {
  it('게임 매치부터 게임 결과 입력까지 🤔', () => {
    cy.login(Cypress.env('NORMAL_USERNAME'), Cypress.env('NORMAL_PASSWORD'));
    cy.intercept(
      `${Cypress.env('SERVER_ENDPOINT')}pingpong/match/tables/1/single`
    ).as('singleApi');
    cy.origin(Cypress.env('HOME'), () => {
      // 매치 버튼 눌러 매치 페이지로
      cy.get('a').filter('[class^=Layout_matchingButton]').click();
      // 토글 눌러서 일반전으로 변경
      cy.wait(1000);
      cy.get('[class^=ModeToggle_toggleButton]').click();
      cy.get('span[class^=ModeToggle_toggleText]').should('have.text', '일반');
      cy.wait(1000);
      // 두번째로 가능한 슬롯 잡기
      let flag = false;
      cy.get('[class*=MatchSlot_plus]').each(($el1, index) => {
        if ($el1.text() === '+') {
          if (!flag) {
            flag = true;
            return;
          }
          cy.wrap($el1).click();
          return false;
        }
      });
      cy.wait(1000);
      cy.get('input[value=확인]').click();
      // TODO : alert 확인
      // 위 현재 매치 정보 확인, 취소 버튼 뜨는지 확인
      cy.wait(3000);
      cy.get('[class^=CurrentMatchInfo_container]').should('exist');
      cy.get('[class^=CurrentMatchInfo_cancelButton]').should('exist');
      // 2. 두번째 유저 로그인
    });
    cy.logout(Cypress.env('NORMAL_USERNAME'));
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
      cy.get('[class*=MatchSlot_headCount]').each(($el2) => {
        if ($el2.text() === '1/2') {
          cy.wrap($el2).click();
          return false;
        }
      });
      cy.wait(1000);
      cy.get('input[value=확인]').click();
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
      cy.get('[class*=MatchSlot_plus]').each(($el3) => {
        if ($el3.text() === '+') {
          cy.wrap($el3).click();
          return false;
        }
      });
      // api error 확인
      cy.get('input[value=확인]').click();
      cy.wait('@singleApi').then((interception) => {
        expect(interception.response?.statusCode).to.equal(400);
      });
      // 두번째 유저 로그아웃

      // 첫번째 유저 로그인
      // 만약에 기다리고 있는 슬롯이 있다면 취소한다. (새로 랭킹전으로 잡을 예정)
      // 매치 페이지로 이동
      // 랭크전 슬롯 등록
      // 첫번째 유저 로그아웃

      // 두번째 유저 로그인
      // 매치 페이지로 이동
      // 랭크전에 등록 가능한 슬롯 등록

      // 게임 시작까지 대기
    });
  });
});

// click on record button
