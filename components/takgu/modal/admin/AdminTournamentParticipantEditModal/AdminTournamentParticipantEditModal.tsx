import { useState, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/takgu/modal';
import { toastState } from 'utils/recoil/toast';
import AdminSearchBar from 'components/admin/takgu/common/AdminSearchBar';
import useAdminTournamentParticipantEdit from 'hooks/admin/takgu/modal/useAdminTournamentParticipantEdit';
import styles from 'styles/admin/takgu/modal/AdminTournamentParticipantEditModal.module.scss';
import AdminTournamentParticipantList from './AdminTournamentParticipantList';

export default function AdminTournamentParticipantEditModal(props: {
  tournamentId: number;
}) {
  const setModal = useSetRecoilState(modalState);
  const [inputId, setInputId] = useState('');
  const setSnackBar = useSetRecoilState(toastState);

  const { setUserToAdd, participantList, participantDeleteHandler } =
    useAdminTournamentParticipantEdit(props.tournamentId);

  const postUser = useCallback(async () => {
    try {
      const res: { data: ITournamentUser } = await instanceInManage.post(
        `/tournaments/${props.tournamentId}/users`,
        { intraId: inputId }
      );
      setUserToAdd(res.data);
      setSnackBar({
        toastName: 'tournament user add noti',
        severity: 'success',
        message: '유저를 성공적으로 추가하였습니다!',
        clicked: true,
      });
    } catch (error: any) {
      setSnackBar({
        toastName: 'tournament user add noti',
        severity: 'error',
        message: `🔥 ${error.response.data.message} 🔥`,
        clicked: true,
      });
    }
  }, [inputId, setSnackBar, setUserToAdd, props.tournamentId]);

  useEffect(() => {
    postUser();
  }, [inputId, postUser]);

  function addUser(intraId?: string) {
    setInputId(intraId || '');
  }

  return (
    <div className={styles.whole}>
      <h2>참가자 수정</h2>
      <div className={styles.searchBarWrapper}>
        <AdminSearchBar initSearch={addUser} />
      </div>
      <AdminTournamentParticipantList
        participantList={participantList}
        onDelete={participantDeleteHandler}
      />
      <div className={styles.cancleButton}>
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
