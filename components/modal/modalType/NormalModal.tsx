import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import AfterGameModal from '../afterGame/AfterGameModal';
import AnnouncementModal from '../event/AnnouncementModal';
import WelcomeModal from '../event/WelcomeModal';
import MatchCancelModal from '../match/MatchCancelModal';
import MatchEnrollModal from '../match/MatchEnrollModal';
import MatchManualModal from '../match/MatchManualModal';
import MatchRejectModal from '../match/MatchRejectModal';
import LogoutModal from '../menu/LogoutModal';
import ReportModal from '../menu/ReportModal';
import EditProfileModal from '../profile/EditProfileModal';
import KakaoEditModal from '../profile/KakaoEditModal';
import StatChangeModal from '../statChange/StatChangeModal';

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

  if (!modalName) return null;
  return content[modalName];
}
