import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/takgu/recoil/modal';
import AdminCheckSendNotiModal from 'components/takgu/modal/admin/AdminCheckSendNoti';
import AdminDeleteItemModal from 'components/takgu/modal/admin/AdminDeleteItem';
import AdminDeleteMegaphoneModal from 'components/takgu/modal/admin/AdminDeleteMegaphoneModal';
import AdminDeleteProfileModal from 'components/takgu/modal/admin/AdminDeleteProfileModal';
import AdminEditCoinPolicyModal from 'components/takgu/modal/admin/AdminEditCoinPolicy';
import AdminEditItemModal from 'components/takgu/modal/admin/AdminEditItem';
import AdminEditTournamentBraket from 'components/takgu/modal/admin/AdminEditTournamentBraket';
import AdminFeedbackCheck from 'components/takgu/modal/admin/AdminFeedbackCheckModal';
import AdminModifyScoreModal from 'components/takgu/modal/admin/AdminModifyScoreModal';
import AdminNotiUserModal from 'components/takgu/modal/admin/AdminNotiUserModal';
import AdminPartyPenaltyModal from 'components/takgu/modal/admin/AdminPartyPenaltyModal';
import AdminPenaltyModal from 'components/takgu/modal/admin/AdminPenaltyModal';
import AdminProfileModal from 'components/takgu/modal/admin/AdminProfileModal';
import AdminRecruitMessageTemplateModal from 'components/takgu/modal/admin/AdminRecruitMessageTemplateModal';
import AdminTournamentParticipantEditModal from 'components/takgu/modal/admin/AdminTournamentParticipantEditModal/AdminTournamentParticipantEditModal';
import AdminUserCoinModal from 'components/takgu/modal/admin/AdminUserCoinModal';
import DeletePenaltyModal from 'components/takgu/modal/admin/DeletePenaltyModal';
import DetailModal from 'components/takgu/modal/admin/DetailModal';
import AdminSeasonEdit from 'components/takgu/modal/admin/SeasonEdit';
import AdminRecruitResultModal from '../admin/AdminRecruitResultModal';
import TemplateModal from '../admin/AdminTemplateModal';
import PartyRoomEditModal from '../party/PartyRoomEditModal';

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
    recruitResult,
    template,
    partyPenalty,
    roomId,
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
    'ADMIN-RECRUIT_RESULT': recruitResult ? (
      <AdminRecruitResultModal {...recruitResult} />
    ) : null,
    'ADMIN-PARTY_TEMPLATE': <TemplateModal template={template} />,
    'ADMIN-PARTY_PENALTY': (
      <AdminPartyPenaltyModal partyPenalty={partyPenalty} />
    ),
    'ADMIN-PARTY_EDIT': roomId ? <PartyRoomEditModal roomId={roomId} /> : null,
  };

  return content[modalName];
}
