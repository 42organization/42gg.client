import styles from 'styles/modal/Modal.module.scss';
import { useSetRecoilState } from 'recoil';
import { cancelModalState, matchModalState } from 'utils/recoil/match';
import { editProfileModalState } from 'utils/recoil/user';
import { newLoginState } from 'utils/recoil/layout';
import { logoutModalState } from 'utils/recoil/login';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const setLogoutModal = useSetRecoilState(logoutModalState);
  const setEditProfileModal = useSetRecoilState(editProfileModalState);
  const setMatchModal = useSetRecoilState(matchModalState);
  const setCancelModal = useSetRecoilState(cancelModalState);
  const setNewLogin = useSetRecoilState(newLoginState);
  const modalCloseHandler = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      setLogoutModal(false);
      setEditProfileModal(false);
      setMatchModal(null);
      setCancelModal(false);
      setNewLogin(false);
    }
  };
  return (
    <div
      className={styles.backdrop}
      id='modalOutside'
      onClick={modalCloseHandler}
    >
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
}
