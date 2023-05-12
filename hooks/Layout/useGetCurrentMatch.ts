import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { currentMatchState, reloadMatchState } from 'utils/recoil/match';

const useGetCurrentMatch = (): void => {
  const setCurrentMatch = useSetRecoilState(currentMatchState);
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);
  const presentPath = useRouter().asPath;

  const getCurrentMatchHandler = async () => {
    try {
      const res = await instance.get('/pingpong/match/current');
      setCurrentMatch(res?.data);
    } catch (e) {
      setError('JB01');
    }
  };
  useEffect(() => {
    getCurrentMatchHandler();
    if (reloadMatch) {
      setReloadMatch(false);
    }
  }, [presentPath, reloadMatch]);
};

export default useGetCurrentMatch;
