import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState } from 'utils/recoil/match';
import EditProfileModal from './profile/EditProfileModal';
import LogoutModal from './menu/LogoutModal';
import MatchCancelModal from './match/MatchCancelModal';
import MatchEnrollModal from './match/MatchEnrollModal';
import MatchManualModal from './match/MatchManualModal';
import MatchRejectModal from './match/MatchRejectModal';
import ReportModal from './menu/ReportModal';
import AnnouncementModal from './event/AnnouncementModal';
import AfterGameModal from './afterGame/AfterGameModal';
import StatChangeModal from './statChange/StatChangeModal';
import AdminProfileModal from './admin/AdminProfileModal';
import AdminPenaltyModal from './admin/AdminPenaltyModal';
import AdminNotiAllModal from './admin/AdminNotiAllModal';
import AdminNotiUserModal from './admin/AdminNotiUserModal';
import AdminCheckFeedback from './admin/AdminFeedbackCheckModal';
import FeedbackDetailModal from './admin/FeedbackDetailModal';
import styles from 'styles/modal/Modal.module.scss';

export default function ModalProvider() {
  const [
    {
      modalName,
      cancel,
      enroll,
      manual,
      announcement,
      exp,
      intraId,
      detailContent,
      feedback,
      userId,
    },
    setModal,
  ] = useRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const content: { [key: string]: JSX.Element | null } = {
    'EVENT-ANNOUNCEMENT': announcement ? (
      <AnnouncementModal announcement={announcement} />
    ) : null,
    'MENU-REPORT': <ReportModal />,
    'MENU-LOGOUT': <LogoutModal />,
    'MATCH-REJECT': <MatchRejectModal />,
    'MATCH-ENROLL': enroll ? <MatchEnrollModal {...enroll} /> : null,
    'MATCH-CANCEL': cancel ? <MatchCancelModal {...cancel} /> : null,
    'MATCH-MANUAL': manual ? <MatchManualModal {...manual} /> : null,
    'USER-PROFILE_EDIT': <EditProfileModal />,
    'FIXED-AFTER_GAME': <AfterGameModal />,
    'FIXED-STAT': <StatChangeModal {...exp} />,
    'ADMIN-PROFILE': userId ? <AdminProfileModal value={userId} /> : null,
    'ADMIN-PENALTY': intraId ? <AdminPenaltyModal value={intraId} /> : null,
    'ADMIN-NOTI_ALL': <AdminNotiAllModal />,
    'ADMIN-NOTI_USER': intraId ? <AdminNotiUserModal value={intraId} /> : null,
    'ADMIN-CHECK_FEEDBACK': feedback ? (
      <AdminCheckFeedback {...feedback} />
    ) : null,
    'ADMIN-DETAIL_CONTENT':
      intraId && detailContent ? (
        <FeedbackDetailModal intraId={intraId} detailContent={detailContent} />
      ) : null,
  };

  useEffect(() => {
    setModalOutsideScroll();
  }, [modalName]);

  const setModalOutsideScroll = () =>
    (document.body.style.overflow = modalName ? 'hidden' : 'unset');

  const closeModalHandler = (e: React.MouseEvent) => {
    if (modalName?.split('-')[0] === 'FIXED') return;
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
