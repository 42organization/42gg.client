import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { menuBarState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/Layout/MenuBar.module.scss';

export default function MenuBar() {
  const userData = useRecoilValue(userState);
  const setOpenMenuBar = useSetRecoilState(menuBarState);
  const setModalInfo = useSetRecoilState(modalState);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  const router = useRouter();

  const MenuPathHandler = (path: string) => {
    router.push(`/${path}`);
  };

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
      <div className={styles.backdrop} onClick={() => setOpenMenuBar(false)}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setOpenMenuBar(false)}>&#10005;</button>
          <nav>
            <div className={styles.menu}>
              <div onClick={() => MenuPathHandler('rank')}>랭킹</div>
              <div onClick={() => MenuPathHandler('game')}>최근 경기</div>
              <div
                onClick={() =>
                  MenuPathHandler(`users/detail?intraId=${userData.intraId}`)
                }
              >
                내 정보
              </div>
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
              <div onClick={() => MenuPathHandler('manual')}>경기 매뉴얼</div>
              {userData.isAdmin ? (
                <div onClick={goToAdminPage}>😎 관리자</div>
              ) : (
                <div onClick={() => setModalInfo({ modalName: 'MENU-REPORT' })}>
                  신고하기
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
