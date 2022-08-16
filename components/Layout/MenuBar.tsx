import Link from 'next/link';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { menuBarState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { adminState } from 'utils/recoil/admin';
import instance from 'utils/axios';
import styles from 'styles/Layout/MenuBar.module.scss';

export default function MenuBar() {
  const userData = useRecoilValue(userState);
  const resetOpenMenuBar = useResetRecoilState(menuBarState);
  const setModalInfo = useSetRecoilState(modalState);
  const setIsAdmin = useSetRecoilState(adminState);
  const menuList = [
    { name: '랭킹', link: '/rank' },
    { name: '최근 경기', link: '/game' },
    { name: '내 정보', link: `/users/detail?intraId=${userData.intraId}` },
  ];

  const goToStatisticsPage = () => {
    setIsAdmin(true);
  };

  const goToAdminPage = async () => {
    try {
      await instance.get('/admin');
      window.open(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin`);
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
                <div onClick={() => setModalInfo({ modalName: 'MENU-REPORT' })}>
                  건의하기
                </div>
              </div>
            </div>
            <div className={styles.subMenu} id={styles.logout}>
              {userData.isAdmin && (
                <>
                  <div onClick={goToStatisticsPage}>📊 통계페이지</div>
                  <div onClick={goToAdminPage}>😎 관리자</div>
                </>
              )}
              <div onClick={() => setModalInfo({ modalName: 'MENU-LOGOUT' })}>
                로그아웃
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
