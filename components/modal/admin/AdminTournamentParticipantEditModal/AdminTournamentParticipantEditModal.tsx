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
import AdminTournamentParticipantList from './AdminTournamentParticipantList';

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
      setParticipantList((participantList) => [...participantList, userToAdd]);
    }
  }, [userToAdd]);

  async function participantDeleteHandler(intraId: string) {
    try {
      await mockInstance.delete(
        `/admin/tournaments/${props.tournamentId}/users/${intraId}`
      );
      fetchParticipantList();
      console.log('삭제 완료');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.whole}>
      <div className={styles.titleContainer}>
        <h2>참가자 수정</h2>
        <div className={styles.sampleColorContainer}>
          <div className={styles.sampleJoinedColor} />: 참가자
        </div>
      </div>
      <div className={styles.hr}></div>
      <TournamentSearchBarGroup
        onAddUser={setUserToAdd}
        tournamentId={props.tournamentId}
      />
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
