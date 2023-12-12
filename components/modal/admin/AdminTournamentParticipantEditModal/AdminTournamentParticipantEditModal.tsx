import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { modalState } from 'utils/recoil/modal';
import AdminTournamentSearchBarGroup from 'components/modal/admin/AdminTournamentParticipantEditModal/AdminTournamentSearchBarGroup';
import useAdminTournamentParticipantEdit from 'hooks/admin/modal/useAdminTournamentParticipantEdit';
import styles from 'styles/admin/modal/AdminTournamentParticipantEditModal.module.scss';
import AdminTournamentParticipantList from './AdminTournamentParticipantList';

export default function AdminTournamentParticipantEditModal(props: {
  tournamentId: number;
}) {
  const setModal = useSetRecoilState(modalState);
  const { setUserToAdd, participantList, participantDeleteHandler } =
    useAdminTournamentParticipantEdit(props.tournamentId);

  return (
    <div className={styles.whole}>
      <h2>참가자 수정</h2>
      <div className={styles.hr}></div>
      <div className={styles.stickyHeader}>
        <AdminTournamentSearchBarGroup
          onAddUser={setUserToAdd}
          tournamentId={props.tournamentId}
        />
      </div>
      <AdminTournamentParticipantList
        participantList={participantList}
        onDelete={participantDeleteHandler}
      />
      <div className={styles.buttonGroup}>
        <Button
          variant='outlined'
          onClick={() => setModal({ modalName: null })}
        >
          취소
        </Button>
      </div>
    </div>
  );
}
