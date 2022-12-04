import Link from 'next/link';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { seasonListState } from 'utils/recoil/seasons';
import { openMenuBarState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/Layout/MenuBar.module.scss';

export default function MenuBar() {
  const { intraId, isAdmin } = useRecoilValue(userState);
  const { seasonMode } = useRecoilValue(seasonListState);
  const resetOpenMenuBar = useResetRecoilState(openMenuBarState);
  const setModal = useSetRecoilState(modalState);
  const menuList = [
    {
      name: `${seasonMode === 'normal' ? 'VIP' : '랭킹'}`,
      link: '/rank',
    },
    { name: '최근 경기', link: '/game' },
    { name: '내 정보', link: `/users/detail?intraId=${intraId}` },
  ];

  const goToAdminPage = async () => {
    try {
      window.open(
        `${
          process.env.NEXT_PUBLIC_SERVER_ENDPOINT
        }/admin?token=${localStorage.getItem('42gg-token')}`
      );
    } catch (e) {
      alert('👊 콱 씨...!');
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={resetOpenMenuBar}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <button onClick={resetOpenMenuBar}>&#10005;</button>
          <nav>
            <div className={styles.menu}>
              {menuList.map((menuList, index: number) => (
                <Link href={menuList.link} key={index}>
                  <div onClick={resetOpenMenuBar}>{menuList.name}</div>
                </Link>
              ))}
              <div className={styles.subMenu}>
                <div onClick={() => setModal({ modalName: 'MENU-REPORT' })}>
                  건의하기
                </div>
                <div
                  onClick={() =>
                    window.open(
                      'https://github.com/42organization/42arcade.gg.client/wiki/42gg.kr--%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%80%EC%9D%B4%EB%93%9C'
                    )
                  }
                >
                  사용 설명서
                </div>
              </div>
            </div>
            <div className={styles.subMenu} id={styles.logout}>
              {isAdmin && (
                <>
                  <div onClick={goToAdminPage}>😎 관리자</div>
                  <div
                    onClick={() => setModal({ modalName: 'MENU-MATCHTRIGGER' })}
                  >
                    🛎️ 매치 시작
                  </div>
                  <div onClick={() => setModal({ modalName: 'MENU-LOGOUT' })}>
                    로그아웃
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
