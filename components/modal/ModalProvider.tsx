import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState } from 'utils/recoil/match';
import WelcomeModal from './event/WelcomeModal';
import ReportModal from './menu/ReportModal';
import LogoutModal from './menu/LogoutModal';
import MatchTriggerModal from './menu/MatchTriggerModal';
import MatchRejectModal from './match/MatchRejectModal';
import MatchEnrollModal from './match/MatchEnrollModal';
import CancelModal from './match/CancelModal';
import MatchManualModal from './match/MatchManualModal';
import EditProfileModal from './profile/EditProfileModal';
import AfterGameModal from './afterGame/AfterGameModal';
import StatChangeModal from './statChange/StatChangeModal';
import styles from 'styles/modal/Modal.module.scss';
import MatchChallengeModal from './match/MatchChallengeModal';

export default function ModalProvider() {
  const [{ modalName, cancel, enroll, challenge, exp }, setModal] =
    useRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const content: { [key: string]: JSX.Element | null } = {
    'MAIN-WELCOME': <WelcomeModal />,
    'MENU-REPORT': <ReportModal />,
    'MENU-LOGOUT': <LogoutModal />,
    'MENU-MATCHTRIGGER': <MatchTriggerModal />,
    'MATCH-REJECT': <MatchRejectModal />,
    'MATCH-ENROLL': enroll ? <MatchEnrollModal {...enroll} /> : null,
    'MATCH-CHALLENGE': challenge ? (
      <MatchChallengeModal {...challenge} />
    ) : null,
    'MATCH-CANCEL': cancel ? <CancelModal {...cancel} /> : null,
    'MATCH-MANUAL': <MatchManualModal />,
    'USER-PROFILE_EDIT': <EditProfileModal />,
    'FIXED-AFTER_GAME': <AfterGameModal />,
    'FIXED-STAT': <StatChangeModal {...exp} />,
  };

  useEffect(() => {
    setModalOutsideScroll();
  }, [modalName]);

  const setModalOutsideScroll = () =>
    (document.body.style.overflow = modalName ? 'hidden' : 'unset');

  const closeModalHandler = (e: React.MouseEvent) => {
    if (modalName?.split('-')[0] === 'FIXED') return;
    if (modalName?.split('-')[1] === 'CHALLENGE') return;
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      if (modalName === 'MATCH-CANCEL') setReloadMatch(true);
      setModal({ modalName: null });
    }
  };

  return (
    modalName && (
      <div
        className={styles.backdrop}
        id='modalOutside'
        onClick={closeModalHandler}
      >
        <div className={styles.modalContainer}>{content[modalName]}</div>
      </div>
    )
  );
}
