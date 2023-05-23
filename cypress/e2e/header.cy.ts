describe('헤더 테스트 🥳', () => {
  before(() => {
    cy.login(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
  });

  beforeEach(() => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.visit(Cypress.env('HOME'));
    });
  });

  it('햄버거 버튼 랜더링 테스트 🍔 - 어드민 유저', () => {
    cy.origin(Cypress.env('HOME'), () => {
      cy.get('[class^=Header_headerLeft]').click();
      // 버튼을 눌렀을 때 메뉴가 랜더링 되는지 확인
      cy.get('[class^=MenuBar_container').should('exist');
      // 어드민 유저이므로 관리자 버튼이 있는지 확인
      cy.get('[id^=MenuBar_logout').should('contain', '관리자');
    });
  });

  it('햄버거 버튼 기능 테스트 🍔 - 건의하기', () => {
    cy.intercept(`${Cypress.env('SERVER_ENDPOINT')}/pingpong/feedback`).as(
      'feedbackApi'
    );
    cy.origin(Cypress.env('HOME'), () => {
      cy.get('[class^=Header_headerLeft]').click();
      // 1. 건의하기 버튼 누르기 -> 모달이 떠야 한다.
      cy.get('[class^=MenuBar_subMenu').contains('건의하기').click();
      cy.get('[class^=Modal_modalContainer]').should('exist');
      const sendButton = cy.get('input[type=button][value=보내기]');
      // 2. 기타 버튼 클릭 - 체크되는지 확인 (?)
      cy.get('input[id^=ETC]').click();
      cy.get('input[id^=ETC]').should('be.checked');
      // 3. 300자 이상 입력해보기 -> 그 이상은 입력되면 안됨.
      const longText = 'a'.repeat(300) + 'bbb';
      const textArea = cy.get('textarea[name^=content]');
      textArea.type(longText);
      textArea.should('have.value', longText.slice(0, 300));
      // 4. 빈 칸 보내보기 -> alert 내용 확인
      textArea.clear();
      cy.wait(500);
      sendButton.click();
      // TODO : alert 확인
      // cy.on('window:alert', (alertContent) => {
      //   expect(alertContent).to.contains('마음을 담아 의견을 보내주세요 ❤️');
      // });
      // 5. 정상적인 건의는 보내져야 한다.
      const suggestion = '이것은 테스트. 화이팅 (ว˙∇˙)ง';
      textArea.type(suggestion);
      sendButton.click();
      // TODO : alert 확인
      // cy.on('window:alert', (alertContent) => {
      //   expect(alertContent).to.contains('의견 주셔서 감사합니다 ❤️');
      // });
      cy.wait('@feedbackApi').then((interception) => {
        const category = interception.request.body.category;
        const content = interception.request.body.content;
        // 요청 내용이 적절한지 확인
        expect(category).to.equal('ETC');
        expect(content).to.equal(suggestion);
        // 보낸 이후에 메뉴바와 모달이 모두 사라지는지 확인
        // cy.get('[class^=MenuBar_container').should('not.exist');
        cy.get('[class^=Modal_modalContainer]').should('not.exist');
      });
    });
  });

  it('Noti 기능 테스트 🔔', () => {
    const noti = '테스트용 알림 ୧(﹒︠ᴗ﹒︡)୨';

    cy.origin(Cypress.env('HOME'), { args: { noti } }, ({ noti }) => {
      // notibar 열기
      cy.get('[id^=Header_notiIcon]').click();
      cy.wait(500);
      // 기존 알림 모두 삭제
      cy.get('button[class^=NotiBar_deleteButton]').click();
      cy.wait(500);
      // 테스트용 알림 전송
      cy.request({
        method: 'POST',
        url: `${Cypress.env(
          'SERVER_ENDPOINT'
        )}/pingpong/admin/notifications/${Cypress.env('ADMIN_USERNAME')}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('42gg-token')}`,
        },
        body: {
          keyword: Cypress.env('ADMIN_USERNAME'),
          message: noti,
        },
      }).then((res) => {
        expect(res.status).to.equal(200);
      });
      cy.wait(1000);
      // 1. 버튼을 누르면 노티 바가 보여야 함.
      cy.get('[id^=Header_notiIcon]').click();
      cy.get('[class^=NotiBar_container]').should('exist');
      cy.wait(1000);
      // 노티바에 미리 만들어둔 알림에 대한 항목이 있을 것
      cy.get('[class^=NotiItem_content]').should('have.text', noti);
      // 2. 전체 삭제 버튼을 누르기
      cy.get('button[class^=NotiBar_deleteButton]').click();
      // TODO : alert 확인
      // cy.on('window:alert', (alertContent) => {
      //   expect(alertContent).to.contains('알림이 성공적으로 삭제되었습니다.');
      // });
      // 노티 바가 꺼지는지 확인
      cy.get('[class^=NotiBar_container]').should('not.exist');
      // 노티 바에 빈 컨텐츠 표시
      cy.get('[id^=Header_notiIcon]').click();
      cy.get('[class^=NotiBar_emptyContent]').should('exist');
    });
  });

  it('페이지 이동 테스트 🏃', () => {
    cy.origin(Cypress.env('HOME'), () => {
      // 1. 프로필 페이지 이동
      cy.get('[class^=PlayerImage_header]').click();
      cy.url().should(
        'include',
        `users/detail?intraId=${Cypress.env('ADMIN_USERNAME')}`
      );
      // 2. 로고 클릭해서 홈 이동
      cy.get('[id^=Header_logo]').click();
      cy.url().should('eq', Cypress.env('HOME'));
    });
  });

  it('햄버거 버튼 랜더링 테스트 🍔 - 일반 유저', () => {
    cy.logout(Cypress.env('ADMIN_USERNAME'));
    cy.login(Cypress.env('NORMAL_USERNAME'), Cypress.env('NORMAL_PASSWORD'));
    cy.wait(1000);
    cy.origin(Cypress.env('HOME'), () => {
      cy.get('[class^=Header_headerLeft]').click();
      // 일반 유저에게는 관리자 메뉴가 보이면 안된다.
      cy.get('[id^=MenuBar_logout').should('not.contain', '관리자');
    });
  });

  // TODO : 공지사항 버튼 (헤더 확성기 아이콘) 테스트 필요
  // TODO : 공지사항 버튼 (햄버거 메뉴 내) 테스트 필요
});
