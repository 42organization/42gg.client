import useAxiosGet from 'hooks/useAxiosGet';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentMatchState, reloadMatchState } from 'utils/recoil/match';

const useGetCurrentMatch = (): void => {
  const setCurrentMatch = useSetRecoilState(currentMatchState);
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const presentPath = useRouter().asPath;

  const getCurrentMatchHandler = useAxiosGet({
    url: '/pingpong/match/current',
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
