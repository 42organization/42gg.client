import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { seasonListState } from 'utils/recoil/seasons';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/Layout/MenuBar.module.scss';
import { isMainThread } from 'worker_threads';

import { HeaderContextState, HeaderContext } from './HeaderContext';
import { useContext } from 'react';

export default function MenuBar() {
  const { intraId, isAdmin } = useRecoilValue(userState);
  const { seasonMode } = useRecoilValue(seasonListState);
  // const resetOpenMenuBar = useResetRecoilState(openMenuBarState);
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  const setModal = useSetRecoilState(modalState);
  const menuList = [
    {
      name: `${seasonMode === 'normal' ? 'VIP' : '랭킹'}`,
      link: '/rank',
    },
    { name: '최근 경기', link: '/game' },
    { name: '내 정보', link: `/users/detail?intraId=${intraId}` },
  ];

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => HeaderState?.resetOpenMenuBarState()}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => HeaderState?.resetOpenMenuBarState()}>
            &#10005;
          </button>
          <nav>
            <div className={styles.menu}>
              {menuList.map((menuList, index: number) => (
                <Link href={menuList.link} key={index}>
                  <div onClick={() => HeaderState?.resetOpenMenuBarState()}>
                    {menuList.name}
                  </div>
                </Link>
              ))}
              <div className={styles.subMenu}>
                <div
                  onClick={() =>
                    window.open(
                      'https://far-moonstone-7ff.notion.site/91925f9c945340c6a139f64fb849990d'
                    )
                  }
                >
                  공지사항
                </div>
                <div
                  onClick={() =>
                    window.open(
                      'https://far-moonstone-7ff.notion.site/917df2bd339d42c3a7689277246e7f64'
                    )
                  }
                >
                  사용 설명서
                </div>
                <div onClick={() => setModal({ modalName: 'MENU-REPORT' })}>
                  건의하기
                </div>
              </div>
            </div>
            <div className={styles.subMenu} id={styles.logout}>
              {isAdmin && (
                <>
                  <Link href='/statistics'>
                    <div>📊 통계페이지</div>
                  </Link>
                  <Link href='/admin'>
                    {/* <div onClick={resetOpenMenuBar}>😎 관리자</div> */}
                    <div onClick={() => HeaderState?.resetOpenMenuBarState()}>
                      😎 관리자
                    </div>
                  </Link>
                </>
              )}
              <div onClick={() => setModal({ modalName: 'MENU-LOGOUT' })}>
                로그아웃
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
