import useAxiosGet from 'hooks/useAxiosGet';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { liveState, userState } from 'utils/recoil/layout';
import { reloadMatchState } from 'utils/recoil/match';

const useLiveCheck = (presentPath) => {
  const user = useRecoilValue(userState);
  const setLive = useSetRecoilState(liveState);
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);

  const getLiveHandler = useAxiosGet({
    url: '/pingpong/users/live',
    setState: setLive,
    err: 'JB03',
    type: 'setError',
  });

  useEffect(() => {
    if (user.intraId) {
      getLiveHandler();
      if (reloadMatch) setReloadMatch(false);
    }
  }, [presentPath, user, reloadMatch]);
};

export default useLiveCheck;
