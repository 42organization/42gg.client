import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import AfterGameModal from 'components/takgu/modal/afterGame/AfterGameModal';
import AnnouncementModal from 'components/takgu/modal/event/AnnouncementModal';
import WelcomeModal from 'components/takgu/modal/event/WelcomeModal';
import MatchCancelModal from 'components/takgu/modal/match/MatchCancelModal';
import MatchEnrollModal from 'components/takgu/modal/match/MatchEnrollModal';
import MatchManualModal from 'components/takgu/modal/match/MatchManualModal';
import MatchRejectModal from 'components/takgu/modal/match/MatchRejectModal';
import LogoutModal from 'components/takgu/modal/menu/LogoutModal';
import ReportModal from 'components/takgu/modal/menu/ReportModal';
import EditProfileModal from 'components/takgu/modal/profile/EditProfileModal';
import KakaoEditModal from 'components/takgu/modal/profile/KakaoEditModal';
import StatChangeModal from 'components/takgu/modal/statChange/StatChangeModal';

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
