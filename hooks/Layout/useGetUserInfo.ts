import useAxiosGet from 'hooks/useAxiosGet';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { seasonListState } from 'utils/recoil/seasons';

const useGetUserInfo = () => {
  const setUser = useSetRecoilState(userState);
  const setSeasonList = useSetRecoilState(seasonListState);

  const getUserHandler = useAxiosGet({
    url: '/pingpong/users',
    setState: setUser,
    err: 'JB02',
    type: 'setError',
  });

  const getSeasonListHandler = useAxiosGet({
    url: '/pingpong/seasonlist',
    setState: setSeasonList,
    err: 'DK02',
    type: 'setError',
  });

  useEffect(() => {
    getUserHandler();
    getSeasonListHandler();
  }, []);
};

export default useGetUserInfo;
