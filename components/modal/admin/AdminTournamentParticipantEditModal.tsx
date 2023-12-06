import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';
import { instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import TournamentSearchBarGroup from 'components/admin/tournament/TournamentSearchBarGroup';
import styles from 'styles/admin/modal/AdminTournamentParticipantEditModal.module.scss';

export default function AdminTournamentParticipantEditModal(props: {
  tournamentId: number;
}) {
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);
  const [userToAdd, setUserToAdd] = useState<ITournamentUser>({
    userId: 0,
    intraId: '',
    isJoined: false,
  });
  const [participantList, setParticipantList] = useState<ITournamentUser[]>([
    { userId: 0, intraId: '', isJoined: false },
  ]);

  const fetchParticipantList = useCallback(async () => {
    try {
      const res: { data: { users: ITournamentUser[] } } =
        await mockInstance.get(
          `/admin/tournaments/${props.tournamentId}/users`
        );
      setParticipantList(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }, [props.tournamentId]);

  useEffect(() => {
    fetchParticipantList();
  }, [fetchParticipantList]);

  useEffect(() => {
    if (userToAdd.intraId !== '') {
      setParticipantList((participantList) => {
        return [...participantList, userToAdd];
      });
    }
  }, [userToAdd]);

  return (
    <div className={styles.whole}>
      <h2>참가자 수정</h2>
      <div className={styles.hr}></div>
      <TournamentSearchBarGroup
        onAddUser={setUserToAdd}
        tournamentId={props.tournamentId}
      />
      <ul>
        {participantList.map((participant) => (
          <li key={participant.userId}>
            {participant.intraId}
            <Button variant='outlined' color='error'>
              삭제
            </Button>
          </li>
        ))}
      </ul>
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
