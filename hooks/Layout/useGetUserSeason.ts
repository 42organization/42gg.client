import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { User } from 'types/mainType';
import { SeasonList } from 'types/seasonTypes';
import { userState } from 'utils/recoil/layout';
import { seasonListState } from 'utils/recoil/seasons';
import useAxiosGet from 'hooks/useAxiosGet';

const useGetUserSeason = () => {
  const setUser = useSetRecoilState<User>(userState);
  const setSeasonList = useSetRecoilState<SeasonList>(seasonListState);

  const getUserHandler = useAxiosGet({
    url: '/pingpong/users',
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
  }, []);
};

export default useGetUserSeason;
