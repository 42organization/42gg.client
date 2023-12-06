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
      {participantList.map((participant) => (
        <li
          key={participant.userId}
          className={participant.isJoined ? styles.joined : undefined}
        >
          {participant.intraId}
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
