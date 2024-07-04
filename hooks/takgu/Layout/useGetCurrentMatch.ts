import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CurrentMatchList } from 'types/takgu/matchTypes';
import { currentMatchState, reloadMatchState } from 'utils/recoil/match';
import useAxiosGet from 'hooks/useAxiosGet';

const useGetCurrentMatch = () => {
  const setCurrentMatchList =
    useSetRecoilState<CurrentMatchList>(currentMatchState);
  const [reloadMatch, setReloadMatch] =
    useRecoilState<boolean>(reloadMatchState);
  const presentPath: string = useRouter().asPath;

  const getCurrentMatchHandler = useAxiosGet({
    url: '/pingpong/match',
    setState: setCurrentMatchList,
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
