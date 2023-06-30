import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Live, User } from 'types/mainType';
import { liveState, userState } from 'utils/recoil/layout';
import { reloadMatchState } from 'utils/recoil/match';
import useAxiosGet from 'hooks/useAxiosGet';

const useLiveCheck = (presentPath: string) => {
  const user = useRecoilValue<User>(userState);
  const setLive = useSetRecoilState<Live>(liveState);
  const [reloadMatch, setReloadMatch] =
    useRecoilState<boolean>(reloadMatchState);

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
