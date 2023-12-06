import React, { useState, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Input, InputAdornment, Button, Menu, MenuItem } from '@mui/material';
import { ITournamentUser } from 'types/admin/adminTournamentTypes';
import { instance, instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';

interface TournamentSearchBarGroupProps {
  onAddUser: React.Dispatch<React.SetStateAction<ITournamentUser>>;
  tournamentId: number;
}

export default function TournamentSearchBarGroup({
  onAddUser,
  tournamentId,
}: TournamentSearchBarGroupProps) {
  const [inputId, setInputId] = useState('');
  const [isIdExist, setIsIdExist] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userList, setUserList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const setError = useSetRecoilState<string>(errorState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
    setIsTyping(true);
    setIsIdExist(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (id: string) => {
    setInputId(id);
    setIsIdExist(true);
    handleMenuClose();
  };

  useEffect(() => {
    if (inputId === '' || isIdExist == true) {
      return;
    }
    const identifier = setTimeout(async () => {
      setIsTyping(false);
      try {
        const res = await instance.get(
          `/pingpong/users/searches?intraId=${inputId}`
        );
        const users = res.data.users;
        setUserList(users);
        if (users.length > 0 && users[0] !== inputId) {
          setMenuOpen(true);
        }
        setIsIdExist(users.length === 1 && users[0] === inputId);
      } catch (e) {
        setError('JC02');
      }
    }, 500);
    return () => clearTimeout(identifier);
  }, [inputId, isIdExist, setError]);

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
      <Menu
        id='simple-menu'
        anchorEl={inputRef.current}
        keepMounted
        open={menuOpen}
        onClose={handleMenuClose}
      >
        {userList.map((id) => (
          <MenuItem key={id} onClick={() => handleMenuItemClick(id)}>
            {id}
          </MenuItem>
        ))}
        <small>
          {' '}
          <b>esc</b>: 포커스 탈출{' '}
        </small>
      </Menu>
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
