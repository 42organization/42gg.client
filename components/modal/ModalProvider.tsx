import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import CancelControll from './cancel/CancelControll';
import EditProfileModal from './EditProfileModal';
import LogoutModal from './LogoutModal';
import MatchEnrollModal from './MatchEnrollModal';
import MatchManualModal from './MatchManualModal';
import MatchRejectModal from './MatchRejectModal';
import ReportModal from './ReportModal';
import WelcomeModal from './WelcomeModal';
import InputScoreModal from './InputScoreModal';
import styles from 'styles/modal/Modal.module.scss';

export default function ModalProvider() {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  useEffect(() => {
    setModalOutsideScroll();
  }, [modalInfo]);

  const setModalOutsideScroll = () =>
    (document.body.style.overflow = modalInfo.modalName ? 'hidden' : 'unset');

  const modalCloseHandler = (e: React.MouseEvent) => {
    if (modalInfo.modalName?.split('-')[0] === 'FIXED') return;
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      setModalInfo({ modalName: null });
      document.body.style.overflow = 'unset';
    }
  };

  const findModal = () => {
    const { modalName, cancelInfo, enrollInfo } = modalInfo;
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
          <CancelControll {...cancelInfo} />
        ) : null;
      case 'MATCH-MANUAL':
        return <MatchManualModal isPage={false} />;
      case 'USER-PROFILE_EDIT':
        return <EditProfileModal />;
      case 'FIXED-INPUT_SCORE':
        return <InputScoreModal />;
      default:
        return null;
    }
  };

  return (
    modalInfo.modalName && (
      <div
        className={styles.backdrop}
        id='modalOutside'
        onClick={modalCloseHandler}
      >
        <div className={styles.modalContainer}>{findModal()}</div>
      </div>
    )
  );
}
