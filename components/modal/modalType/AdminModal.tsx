import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import AdminCheckSendNotiModal from '../admin/AdminCheckSendNoti';
import AdminDeleteItemModal from '../admin/AdminDeleteItem';
import AdminDeleteMegaphoneModal from '../admin/AdminDeleteMegaphoneModal';
import AdminDeleteProfileModal from '../admin/AdminDeleteProfileModal';
import AdminEditCoinPolicyModal from '../admin/AdminEditCoinPolicy';
import AdminEditItemModal from '../admin/AdminEditItem';
import AdminFeedbackCheck from '../admin/AdminFeedbackCheckModal';
import AdminModifyScoreModal from '../admin/AdminModifyScoreModal';
import AdminNotiUserModal from '../admin/AdminNotiUserModal';
import AdminPenaltyModal from '../admin/AdminPenaltyModal';
import AdminProfileModal from '../admin/AdminProfileModal';
import DeletePenaltyModal from '../admin/DeletePenaltyModal';
import DetailModal from '../admin/DetailModal';
import AdminSeasonEdit from '../admin/SeasonEdit';

export default function AdminModal() {
  const {
    modalName,
    intraId,
    penaltyId,
    ISeason,
    feedback,
    detailTitle,
    detailContent,
    ModifyScore,
    megaphone,
    profile,
    item,
    coinPolicy,
  } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'ADMIN-PROFILE': intraId ? <AdminProfileModal intraId={intraId} /> : null,
    'ADMIN-PENALTY': intraId ? <AdminPenaltyModal intraId={intraId} /> : null,
    'ADMIN-PENALTY_DELETE':
      penaltyId && intraId ? (
        <DeletePenaltyModal intraId={intraId} penaltyId={penaltyId} />
      ) : null,
    'ADMIN-NOTI_USER': <AdminNotiUserModal />,
    'ADMIN-SEASON_EDIT': ISeason ? <AdminSeasonEdit {...ISeason} /> : null,
    'ADMIN-CHECK_FEEDBACK': feedback ? (
      <AdminFeedbackCheck
        id={feedback.id}
        intraId={feedback.intraId}
        isSolved={feedback.isSolved}
      />
    ) : null,
    'ADMIN-CHECK_SEND_NOTI':
      intraId && detailContent ? (
        <AdminCheckSendNotiModal
          intraId={intraId}
          detailContent={detailContent}
        />
      ) : null,
    'ADMIN-DETAIL_CONTENT':
      detailTitle && detailContent ? (
        <DetailModal detailTitle={detailTitle} detailContent={detailContent} />
      ) : null,
    'ADMIN-MODIFY_SCORE': ModifyScore ? (
      <AdminModifyScoreModal {...ModifyScore} />
    ) : null,
    'ADMIN-MEGAPHONE_DELETE': megaphone ? (
      <AdminDeleteMegaphoneModal {...megaphone} />
    ) : null,
    'ADMIN-PROFILE_DELETE': profile ? (
      <AdminDeleteProfileModal {...profile} />
    ) : null,
    'ADMIN-ITEM_EDIT': item ? <AdminEditItemModal {...item} /> : null,
    'ADMIN-ITEM_DELETE': item ? <AdminDeleteItemModal {...item} /> : null,
    'ADMIN-COINPOLICY_EDIT': coinPolicy ? (
      <AdminEditCoinPolicyModal {...coinPolicy} />
    ) : null,
  };

  if (!modalName) return null;
  return content[modalName];
}
