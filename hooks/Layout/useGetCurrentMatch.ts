import useAxiosGet from 'hooks/useAxiosGet';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CurrentMatchList } from 'types/matchTypes';
import { currentMatchState, reloadMatchState } from 'utils/recoil/match';

const useGetCurrentMatch = () => {
  const setCurrentMatch =
    useSetRecoilState<CurrentMatchList>(currentMatchState);
  const [reloadMatch, setReloadMatch] =
    useRecoilState<boolean>(reloadMatchState);
  const presentPath: string = useRouter().asPath;

  const getCurrentMatchHandler = useAxiosGet({
    url: '/pingpong/match',
    setState: setCurrentMatch,
    err: 'JB01',
    type: 'setError',
  });

  useEffect(() => {
    getCurrentMatchHandler();
    if (reloadMatch) {
      setReloadMatch(false);
    }
  }, [presentPath, reloadMatch]);
};

export default useGetCurrentMatch;
