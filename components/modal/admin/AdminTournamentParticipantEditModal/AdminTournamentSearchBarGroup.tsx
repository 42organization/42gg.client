import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Input, InputAdornment, Button, Menu, MenuItem } from '@mui/material';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';
import { instance, instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import AdminSearchUserDropDownMenu from './AdminSearchUserDropDownMenu';

interface AdminTournamentSearchBarGroupProps {
  onAddUser: React.Dispatch<React.SetStateAction<ITournamentUser>>;
  tournamentId: number;
}

export default function AdminTournamentSearchBarGroup({
  onAddUser,
  tournamentId,
}: AdminTournamentSearchBarGroupProps) {
  const [inputId, setInputId] = useState('');
  const [isIdExist, setIsIdExist] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userList, setUserList] = useState<string[]>([]);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const setError = useSetRecoilState<string>(errorState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
    setIsTyping(true);
    setIsIdExist(false);
  };

  const handleMenuItemClick = (id: string) => {
    setInputId(id);
    setIsIdExist(true);
    setMenuOpen(false);
  };

  const fetchUserIntraId = useCallback(async () => {
    try {
      const res = await instance.get(
        `/pingpong/users/searches?intraId=${inputId}`
      );
      const users = res.data.users;
      setUserList(users);
    } catch (e) {
      setError('JC02');
    }
  }, [inputId, setError]);

  useEffect(() => {
    if (inputId === '' || isIdExist == true) {
      return;
    }
    const identifier = setTimeout(async () => {
      setIsTyping(false);
      fetchUserIntraId();
      if (userList.length > 0 && userList[0] !== inputId) {
        setMenuOpen(true);
      }
      setIsIdExist(userList.length === 1 && userList[0] === inputId);
    }, 500);
    return () => clearTimeout(identifier);
  }, [inputId, isIdExist, fetchUserIntraId, userList]);

  async function addButtonHandler() {
    if (isIdExist) {
      setIsWaitingResponse(true);
      try {
        const res: { data: ITournamentUser } = await mockInstance.post(
          `/admin/tournaments/${tournamentId}/users`,
          { intraId: inputId }
        );
        onAddUser(res.data);
      } catch (error) {
        // error handling
        console.log(error);
      }
      setIsWaitingResponse(false);
    }
  }

  return (
    <>
      <Input
        ref={inputRef}
        onChange={inputChangeHandler}
        placeholder='인트라 ID를 입력하세요.'
        error={!isIdExist}
        value={inputId}
        endAdornment={
          inputId &&
          !isTyping && (
            <InputAdornment position='end'>
              {isIdExist ? (
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
              ) : (
                <CancelOutlinedIcon style={{ color: 'red' }} />
              )}
            </InputAdornment>
          )
        }
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
