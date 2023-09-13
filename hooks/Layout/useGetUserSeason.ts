import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SeasonList } from 'types/seasonTypes';
import { loginState } from 'utils/recoil/login';
import { seasonListState } from 'utils/recoil/seasons';
import useAxiosGet from 'hooks/useAxiosGet';

const useGetUserSeason = (presentPath: string) => {
  const setSeasonList = useSetRecoilState<SeasonList>(seasonListState);
  const isLogIn = useRecoilValue(loginState);

  const getSeasonListHandler = useAxiosGet<any>({
    url: '/pingpong/seasons',
    setState: (data) => {
      setSeasonList(data);
    },
    err: 'DK02',
    type: 'setError',
  });

  useEffect(() => {
    getSeasonListHandler();
  }, [presentPath, isLogIn]);
};

export default useGetUserSeason;
