import { useState } from 'react';
import { Button } from '@mui/material';
import { ITournamentUser } from 'types/takgu/admin/adminTournamentTypes';
import styles from 'styles/takgu/admin/modal/AdminTournamentParticipantEditModal.module.scss';
import AdminTournamentParticipantDeleteConfirmInput from './AdminTournemntParticipantDeleteConfirmInput';

interface AdminTournamentParticipantListProps {
  participantList: ITournamentUser[];
  onDelete: (userId: number) => Promise<void>;
}

export default function AdminTournamentParticipantList({
  participantList,
  onDelete,
}: AdminTournamentParticipantListProps) {
  const [deleteMode, setDeleteMode] = useState<Record<number, boolean>>({});
  const [isSame, setIsSame] = useState<Record<number, boolean>>({});

  function toggleDeleteMode(userId: number) {
    setDeleteMode((prev) => ({ [userId]: !prev[userId] }));
  }

  function deleteHandler(userId: number) {
    if (deleteMode[userId]) {
      if (isSame[userId]) {
        onDelete(userId);
        setDeleteMode({});
      }
    } else {
      toggleDeleteMode(userId);
    }
  }

  return (
    <div className={styles.tournamentUserList}>
      <ul>
        {participantList.map((participant, index) => (
          <>
            {deleteMode[participant.userId] && (
              <small className={styles.deleteInputTitle}>
                삭제할 유저의 아이디를 입력해주세요.
              </small>
            )}
            <li
              key={participant.userId}
              className={
                participant.isJoined ? styles.joined : styles.notJoined
              }
            >
              {deleteMode[participant.userId] ? (
                <>
                  <AdminTournamentParticipantDeleteConfirmInput
                    isSame={isSame[participant.userId]}
                    intraId={participant.intraId}
                    userId={participant.userId}
                    setIsSame={setIsSame}
                  />
                </>
              ) : (
                <div>
                  <i>{index + 1}</i>
                  {participant.intraId}{' '}
                  <small>{participant.isJoined ? '참가 중' : '대기 중'}</small>
                </div>
              )}
              {deleteMode[participant.userId] && (
                <Button onClick={() => toggleDeleteMode(participant.userId)}>
                  취소
                </Button>
              )}
              <Button
                color='error'
                disabled={
                  deleteMode[participant.userId] && !isSame[participant.userId]
                }
                onClick={() => deleteHandler(participant.userId)}
              >
                삭제
              </Button>
            </li>
            {deleteMode[participant.userId] && !isSame[participant.userId] && (
              <small className={styles.deleteInputWarning}>
                아이디가 일치하지 않습니다!
              </small>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
