import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { logoutModalState } from 'utils/recoil/login';
import { menuBarState, reportModalState } from 'utils/recoil/layout';
import Modal from 'components/modal/Modal';
import LogoutModal from 'components/modal/LogoutModal';
import ReportModal from 'components/modal/ReportModal';
import instance from 'utils/axios';
import styles from 'styles/Layout/MenuBar.module.scss';

export default function MenuBar() {
  const userData = useRecoilValue(userState);
  const setOpenMenuBar = useSetRecoilState(menuBarState);
  const [openLogoutModal, setOpenLogoutModal] =
    useRecoilState(logoutModalState);
  const [openReportModal, setOpenReportModal] =
    useRecoilState(reportModalState);
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
      {openLogoutModal && (
        <Modal>
          <LogoutModal />
        </Modal>
      )}
      {openReportModal && (
        <Modal>
          <ReportModal />
        </Modal>
      )}
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
                <div onClick={() => setOpenReportModal(true)}>신고하기</div>
              )}
              <div onClick={() => setOpenLogoutModal(true)}>로그아웃</div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
