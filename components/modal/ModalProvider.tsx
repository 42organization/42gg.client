import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import CancelController from './matchCancel/CancelController';
import EditProfileModal from './profile/EditProfileModal';
import LogoutModal from './menu/LogoutModal';
import MatchEnrollModal from './match/MatchEnrollModal';
import MatchManualModal from './match/MatchManualModal';
import MatchRejectModal from './match/MatchRejectModal';
import ReportModal from './menu/ReportModal';
import WelcomeModal from './event/WelcomeModal';
import AfterGameModal from './afterGame/score/AfterGameModal';
import ExpChangeModal from './afterGame/exp/ExpChangeModal';
import styles from 'styles/modal/Modal.module.scss';

export default function ModalProvider() {
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    setModalOutsideScroll();
  }, [modal]);

  const setModalOutsideScroll = () =>
    (document.body.style.overflow = modal.modalName ? 'hidden' : 'unset');

  const closeModalHandler = (e: React.MouseEvent) => {
    if (modal.modalName?.split('-')[0] === 'FIXED') return;
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      setModal({ modalName: null });
    }
  };

  const findModal = () => {
    const { modalName, cancelInfo, enrollInfo } = modal;
    switch (modalName) {
      case 'MAIN-WELCOME':
        return <WelcomeModal />;
      case 'MENU-REPORT':
        return <ReportModal />;
      case 'MENU-LOGOUT':
        return <LogoutModal />;
      case 'MATCH-ENROLL':
        return typeof enrollInfo !== 'undefined' ? (
          <MatchEnrollModal {...enrollInfo} />
        ) : null;
      case 'MATCH-REJECT':
        return <MatchRejectModal />;
      case 'MATCH-CANCEL':
        return typeof cancelInfo !== 'undefined' ? (
          <CancelController {...cancelInfo} />
        ) : null;
      case 'MATCH-MANUAL':
        return <MatchManualModal />;
      case 'USER-PROFILE_EDIT':
        return <EditProfileModal />;
      case 'FIXED-AFTER_GAME':
        return <AfterGameModal />;
      case 'FIXED-EXP':
        return <ExpChangeModal />;
      default:
        return null;
    }
  };

  return (
    modal.modalName && (
      <div
        className={styles.backdrop}
        id='modalOutside'
        onClick={closeModalHandler}
      >
        <div className={styles.modalContainer}>{findModal()}</div>
      </div>
    )
  );
}
