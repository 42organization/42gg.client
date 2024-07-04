import { useState, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ITournamentUser } from 'types/takgu/admin/adminTournamentTypes';
import { instanceInManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

export default function useAdminTournamentParticipantEdit(
  tournamentId: number
) {
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
        await instanceInManage.get(`/tournaments/${tournamentId}/users`);
      setParticipantList(res.data.users);
    } catch (error: any) {
      setSnackBar({
        toastName: 'tournament user fetch noti',
        severity: 'error',
        message: `🔥 ${error.response?.data.message} 🔥`,
        clicked: true,
      });
    }
  }, [tournamentId, setSnackBar]);

  async function participantDeleteHandler(userId: number) {
    try {
      await instanceInManage.delete(
        `/tournaments/${tournamentId}/users/${userId}`
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
        message: `🔥 ${error.response?.data.message} 🔥`,
        clicked: true,
      });
    }
  }

  useEffect(() => {
    fetchParticipantList();
  }, [fetchParticipantList]);

  useEffect(() => {
    if (userToAdd.intraId !== '') {
      setParticipantList((participantList) => [...participantList, userToAdd]);
    }
  }, [userToAdd]);

  return { setUserToAdd, participantList, participantDeleteHandler };
}
