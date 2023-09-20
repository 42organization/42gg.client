import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import AfterGameModal from 'components/modal/afterGame/AfterGameModal';
import AnnouncementModal from 'components/modal/event/AnnouncementModal';
import WelcomeModal from 'components/modal/event/WelcomeModal';
import MatchCancelModal from 'components/modal/match/MatchCancelModal';
import MatchEnrollModal from 'components/modal/match/MatchEnrollModal';
import MatchManualModal from 'components/modal/match/MatchManualModal';
import MatchRejectModal from 'components/modal/match/MatchRejectModal';
import LogoutModal from 'components/modal/menu/LogoutModal';
import ReportModal from 'components/modal/menu/ReportModal';
import EditProfileModal from 'components/modal/profile/EditProfileModal';
import KakaoEditModal from 'components/modal/profile/KakaoEditModal';
import StatChangeModal from 'components/modal/statChange/StatChangeModal';

export default function NormalModal() {
  const { modalName, announcement, isAttended, enroll, cancel, manual, exp } =
    useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'EVENT-ANNOUNCEMENT': announcement ? (
      <AnnouncementModal announcement={announcement} />
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
