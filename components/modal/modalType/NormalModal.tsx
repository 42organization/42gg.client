import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import AnnouncementModal from '../event/AnnouncementModal';
import ReportModal from '../menu/ReportModal';
import LogoutModal from '../menu/LogoutModal';
import MatchRejectModal from '../match/MatchRejectModal';
import MatchEnrollModal from '../match/MatchEnrollModal';
import MatchCancelModal from '../match/MatchCancelModal';
import MatchManualModal from '../match/MatchManualModal';
import EditProfileModal from '../profile/EditProfileModal';
import AfterGameModal from '../afterGame/AfterGameModal';
import StatChangeModal from '../statChange/StatChangeModal';
import KakaoEditModal from '../profile/KakaoEditModal';
import WelcomeModal from '../event/WelcomeModal';

export default function NormalModal() {
  const { modalName, announcement, isAttended, enroll, cancel, manual, exp } =
    useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'EVENT-ANNOUNCEMENT': announcement ? (
      <AnnouncementModal announcement={announcement} isAttended={isAttended} />
    ) : null,
    'EVENT-WELCOME': <WelcomeModal />,
    'MENU-REPORT': <ReportModal />,
    'MENU-LOGOUT': <LogoutModal />,
    'USER-PROFILE_EDIT': <EditProfileModal />,
    'USER-KAKAO_EDIT': <KakaoEditModal />,
    'FIXED-AFTER_GAME': <AfterGameModal />,
    'FIXED-STAT': <StatChangeModal {...exp} />,
    'MATCH-REJECT': <MatchRejectModal />,
    'MATCH-ENROLL': enroll ? <MatchEnrollModal {...enroll} /> : null,
    'MATCH-CANCEL': cancel ? <MatchCancelModal {...cancel} /> : null,
    'MATCH-MANUAL': manual ? <MatchManualModal {...manual} /> : null,
  };

  return <>{modalName && content[modalName]}</>;
}
