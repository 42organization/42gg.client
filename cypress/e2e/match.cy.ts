describe('매치 기능 테스트', () => {
  it('게임 매치부터 게임 결과 입력까지 🤔', () => {
    cy.login(Cypress.env('NORMAL_USERNAME'), Cypress.env('NORMAL_PASSWORD'));
    cy.origin(Cypress.env('HOME'), () => {
      // 매치 버튼 눌러 매치 페이지로
      cy.get('a').filter('[class^=Layout_matchingButton]').click();
      // 토글
      cy.wait(1000);
      cy.get('[class^=ModeToggle_toggleButton]').click();
      cy.get('span[class^=ModeToggle_toggleText]').should('have.text', '일반');
      cy.wait(1000);
      // 두번째로 가능한 슬롯 잡기
      cy.get('[class*=MatchSlot_normal]').eq(1).click();
      cy.wait(1000);
      cy.get('input[value=확인]').click();
      // TODO : alert 확인
      // 위 현재 매치 정보 확인, 취소 버튼 뜨는지 확인
      cy.get('[class^=CurrentMatchInfo_container]').should('exist');
      cy.get('[class^=CurrentMatchInfo_cancelButton]').should('exist');
      // 2. 두번째 유저 로그인
      cy.login(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
    });
  });
});

// click on record button
