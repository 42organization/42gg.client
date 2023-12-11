import { useState, useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

export default function useAdminSearchUser() {
  const [inputId, setInputId] = useState('');
  const [isIdExist, setIsIdExist] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userList, setUserList] = useState<string[]>([]);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
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

      if (users.length > 0 && users[0] !== inputId) {
        setMenuOpen(true);
      }
      setIsIdExist(users.length === 1 && users[0] === inputId);
    } catch (e) {
      setError('JC02');
    }
  }, [inputId, setError]);

  useEffect(() => {
    if (inputId === '' || isIdExist) {
      return;
    }
    const identifier = setTimeout(() => {
      setIsTyping(false);
      fetchUserIntraId();
    }, 500);
    return () => clearTimeout(identifier);
  }, [inputId, isIdExist, fetchUserIntraId]);

  return {
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
  };
}
