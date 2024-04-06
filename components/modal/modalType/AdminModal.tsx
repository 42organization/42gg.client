import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import AdminCheckSendNotiModal from 'components/modal/admin/AdminCheckSendNoti';
import AdminDeleteItemModal from 'components/modal/admin/AdminDeleteItem';
import AdminDeleteMegaphoneModal from 'components/modal/admin/AdminDeleteMegaphoneModal';
import AdminDeleteProfileModal from 'components/modal/admin/AdminDeleteProfileModal';
import AdminEditCoinPolicyModal from 'components/modal/admin/AdminEditCoinPolicy';
import AdminEditItemModal from 'components/modal/admin/AdminEditItem';
import AdminEditTournamentBraket from 'components/modal/admin/AdminEditTournamentBraket';
import AdminFeedbackCheck from 'components/modal/admin/AdminFeedbackCheckModal';
import AdminModifyScoreModal from 'components/modal/admin/AdminModifyScoreModal';
import AdminNotiUserModal from 'components/modal/admin/AdminNotiUserModal';
import AdminPenaltyModal from 'components/modal/admin/AdminPenaltyModal';
import AdminProfileModal from 'components/modal/admin/AdminProfileModal';
import AdminRecruitMessageTemplateModal from 'components/modal/admin/AdminRecruitMessageTemplateModal';
import AdminTournamentParticipantEditModal from 'components/modal/admin/AdminTournamentParticipantEditModal/AdminTournamentParticipantEditModal';
import AdminUserCoinModal from 'components/modal/admin/AdminUserCoinModal';
import DeletePenaltyModal from 'components/modal/admin/DeletePenaltyModal';
import DetailModal from 'components/modal/admin/DetailModal';
import AdminSeasonEdit from 'components/modal/admin/SeasonEdit';

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
    tournament,
    tournamentId,
  } = useRecoilValue(modalState);

  if (!modalName) {
    return null;
  }

  const content: { [key: string]: JSX.Element | null } = {
    'ADMIN-PROFILE': intraId ? <AdminProfileModal intraId={intraId} /> : null,
    'ADMIN-USER-COIN': intraId ? (
      <AdminUserCoinModal intraId={intraId} />
    ) : null,
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
    'ADMIN-TOURNAMENT_BRAKET_EDIT': tournament ? (
      <AdminEditTournamentBraket {...tournament} />
    ) : null,
    'ADMIN-TOURNAMENT_PARTICIPANT_EDIT': tournamentId ? (
      <AdminTournamentParticipantEditModal tournamentId={tournamentId} />
    ) : null,
    'ADMIN-RECRUIT_MESSAGE_TEMPLATE': <AdminRecruitMessageTemplateModal />,
    // 임시 결과 등록 모달
    'ADMIN-RECRUIT_APPLICATION_RESULT': <AdminRecruitMessageTemplateModal />,
    'ADMIN-RECRUIT_INTERVIEW_RESULT': <AdminRecruitMessageTemplateModal />,
  };

  return content[modalName];
}
