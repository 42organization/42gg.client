import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { liveState, userState } from 'utils/recoil/layout';
import { reloadMatchState } from 'utils/recoil/match';

const useLiveCheck = (presentPath) => {
  const user = useRecoilValue(userState);
  const [live, setLive] = useRecoilState(liveState);
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);

  const getLiveHandler = async () => {
    try {
      const res = await instance.get('/pingpong/users/live');
      setLive(res?.data);
    } catch (e) {
      setError('JB03');
    }
  };

  useEffect(() => {
    if (user.intraId) {
      getLiveHandler();
      if (reloadMatch) setReloadMatch(false);
    }
  }, [presentPath, user, reloadMatch]);
};

export default useLiveCheck;
