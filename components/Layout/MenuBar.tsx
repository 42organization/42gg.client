import Link from 'next/link';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { menuBarState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/Layout/MenuBar.module.scss';

export default function MenuBar() {
  const userData = useRecoilValue(userState);
  const resetOpenMenuBar = useResetRecoilState(menuBarState);
  const setModalInfo = useSetRecoilState(modalState);
  const menuList = [
    { name: '랭킹', link: '/rank' },
    { name: '최근 경기', link: '/game' },
    { name: '내 정보', link: `/users/detail?intraId=${userData.intraId}` },
  ];

  const goToAdminPage = async () => {
    try {
      await instance.get('/admin');
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin`;
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
            </div>
            <div className={styles.subMenu}>
              <div
                onClick={() =>
                  window.open(
                    'https://github.com/42organization/42arcade.gg.client/wiki/42gg.kr--%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%80%EC%9D%B4%EB%93%9C'
                  )
                }
              >
                페이지 가이드
              </div>
              <Link href={'/manual'}>
                <div onClick={resetOpenMenuBar}>경기 매뉴얼</div>
              </Link>
              {userData.isAdmin ? (
                <div onClick={goToAdminPage}>😎 관리자</div>
              ) : (
                <div onClick={() => setModalInfo({ modalName: 'MENU-REPORT' })}>
                  건의하기
                </div>
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
