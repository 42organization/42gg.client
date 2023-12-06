import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';
import { instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import AdminTournamentSearchBarGroup from 'components/modal/admin/AdminTournamentParticipantEditModal/AdminTournamentSearchBarGroup';
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
    } catch (error: any) {
      setSnackBar({
        toastName: 'tournament user fetch noti',
        severity: 'error',
        message: `🔥 ${error.response.data.message} 🔥`,
        clicked: true,
      });
    }
  }, [props.tournamentId, setSnackBar]);

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
      setSnackBar({
        toastName: 'tournament user delete noti',
        severity: 'success',
        message: '유저를 성공적으로 삭제하였습니다!',
        clicked: true,
      });
    } catch (error: any) {
      setSnackBar({
        toastName: 'tournament user delete noti',
        severity: 'error',
        message: `🔥 ${error.response.data.message} 🔥`,
        clicked: true,
      });
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
      <AdminTournamentSearchBarGroup
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
