import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserData } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import { logoutModalState } from 'utils/recoil/login';
import Modal from 'components/modal/Modal';
import LogoutModal from 'components/modal/LogoutModal';
import instance from 'utils/axios';
import styles from 'styles/Layout/MenuBar.module.scss';

type MenuBarProps = {
  showMenuBarHandler: () => void;
};

export default function MenuBar({ showMenuBarHandler }: MenuBarProps) {
  const userData = useRecoilValue<UserData>(userState);
  const [openLogoutModal, setOpenLogoutModal] =
    useRecoilState<boolean>(logoutModalState);
  const router = useRouter();

  const MenuPathHandler = (path: string) => {
    showMenuBarHandler();
    setOpenLogoutModal(false);
    router.push(`/${path}`);
  };

  const logoutModalHandler = () => {
    setOpenLogoutModal(true);
  };

  const closeMenubarHandler = () => {
    setOpenLogoutModal(false);
    showMenuBarHandler();
  };

  const goToAdminPage = () => {
    instance
      .get('/admin')
      .then(
        () =>
          (window.location.href = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin`)
      )
      .catch(() => alert('관리자가 아닙니다!'));
  };

  return (
    <>
      {openLogoutModal && (
        <Modal>
          <LogoutModal />
        </Modal>
      )}
      <div className={styles.backdrop} onClick={closeMenubarHandler}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <button onClick={closeMenubarHandler}>&#10005;</button>
          <nav>
            <div className={styles.menu}>
              <div onClick={() => MenuPathHandler('rank')}>랭킹</div>
              <div onClick={() => MenuPathHandler('game')}>최근 경기</div>
              <div onClick={() => MenuPathHandler(`users/${userData.intraId}`)}>
                내 정보
              </div>
            </div>
            <div className={styles.subMenu}>
              <div
                onClick={() =>
                  window.open(
                    'https://github.com/42organization/42arcade.gg.client#주요-기능-소개'
                  )
                }
              >
                페이지 가이드
              </div>
              <div onClick={() => MenuPathHandler('manual')}>경기 매뉴얼</div>
              <div onClick={logoutModalHandler}>로그아웃</div>
              {userData.isAdmin && <div onClick={goToAdminPage}>😎 관리자</div>}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
