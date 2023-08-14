import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { User } from 'types/mainType';
import { SeasonList } from 'types/seasonTypes';
import { userState } from 'utils/recoil/layout';
import { seasonListState } from 'utils/recoil/seasons';
import useAxiosGet from 'hooks/useAxiosGet';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';

const useGetUserSeason = (presentPath: string) => {
  const setUser = useSetRecoilState<User>(userState);
  const setSeasonList = useSetRecoilState<SeasonList>(seasonListState);
  const isLogIn = useRecoilValue(loginState);
  const user = useRecoilValue(userState);

  const setModal = useSetRecoilState<Modal>(modalState);

  /*   const getUserHandler = useAxiosGet({
    url: '/pingpong/users',
    setState: setUser,
    err: 'JB02',
    type: 'setError',
  }); */

  const getUserHandler = useMockAxiosGet({
    url: '/users/user',
    setState: setUser,
    err: 'JB02',
    type: 'setError',
  });

  const getSeasonListHandler = useAxiosGet<any>({
    url: '/pingpong/seasons',
    setState: (data) => {
      setSeasonList(data);
    },
    err: 'DK02',
    type: 'setError',
  });

  useEffect(() => {
    getUserHandler();
    getSeasonListHandler();
  }, [presentPath, isLogIn]);

  return [user];
};

export default useGetUserSeason;
