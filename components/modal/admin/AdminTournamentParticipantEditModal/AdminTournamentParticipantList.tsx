import { Button } from '@mui/material';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';
import styles from 'styles/admin/modal/AdminTournamentParticipantEditModal.module.scss';

interface AdminTournamentParticipantListProps {
  participantList: ITournamentUser[];
  onDelete: (intraId: string) => Promise<void>;
}

export default function AdminTournamentParticipantList({
  participantList,
  onDelete,
}: AdminTournamentParticipantListProps) {
  return (
    <ul>
      {participantList.map((participant, index) => (
        <li
          key={participant.userId}
          className={participant.isJoined ? styles.joined : styles.notJoined}
        >
          <div>
            <i>{index + 1}</i> {participant.intraId}{' '}
            <small>{participant.isJoined ? '참가 중' : '대기 중'}</small>
          </div>
          <Button
            className={styles.deleteButtonColor}
            color='error'
            onClick={() => onDelete(participant.intraId)}
          >
            삭제
          </Button>
        </li>
      ))}
    </ul>
  );
}
