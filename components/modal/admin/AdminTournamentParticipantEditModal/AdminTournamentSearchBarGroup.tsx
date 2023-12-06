import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import useAdminSearchUser from 'hooks/admin/modal/useAdminSearchUser';
import AdminSearchUserDropDownMenu from './AdminSearchUserDropDownMenu';
import AdminTournamentSearchBar from './AdminTournamenSearchBar';

interface AdminTournamentSearchBarGroupProps {
  onAddUser: React.Dispatch<React.SetStateAction<ITournamentUser>>;
  tournamentId: number;
}

export default function AdminTournamentSearchBarGroup({
  onAddUser,
  tournamentId,
}: AdminTournamentSearchBarGroupProps) {
  const {
    inputId,
    isIdExist,
    isTyping,
    menuOpen,
    setMenuOpen,
    userList,
    isWaitingResponse,
    setIsWaitingResponse,
    inputChangeHandler,
    handleMenuItemClick,
  } = useAdminSearchUser();

  const inputRef = useRef<HTMLInputElement>(null);
  const setSnackBar = useSetRecoilState(toastState);

  async function addButtonHandler() {
    if (isIdExist) {
      setIsWaitingResponse(true);
      try {
        const res: { data: ITournamentUser } = await mockInstance.post(
          `/admin/tournaments/${tournamentId}/users`,
          { intraId: inputId }
        );
        onAddUser(res.data);
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
      setIsWaitingResponse(false);
    }
  }

  return (
    <>
      <AdminTournamentSearchBar
        inputRef={inputRef}
        inputChangeHandler={inputChangeHandler}
        isIdExist={isIdExist}
        inputId={inputId}
        isTyping={isTyping}
      />
      <AdminSearchUserDropDownMenu
        inputRef={inputRef.current}
        menuOpen={menuOpen}
        onMenuClose={() => setMenuOpen(false)}
        userList={userList}
        onMenuClick={handleMenuItemClick}
      />
      <Button
        variant='contained'
        onClick={addButtonHandler}
        disabled={isWaitingResponse}
      >
        추가
      </Button>
    </>
  );
}
