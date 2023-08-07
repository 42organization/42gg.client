import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { profileState } from 'utils/recoil/user';
import { errorState } from 'utils/recoil/error';
import { instance } from 'utils/axios';
import { useMockAxiosGet } from 'hooks/useAxiosGet';

interface UseBasicProfileProps {
  profileId: string;
}

const useBasicProfile = ({ profileId }: UseBasicProfileProps) => {
  const setError = useSetRecoilState(errorState);
  const [
    {
      intraId,
      userImageUri,
      racketType,
      statusMessage,
      level,
      currentExp,
      maxExp,
      expRate,
      tierImageUri,
      tierName,
    },
    setProfile,
  ] = useRecoilState(profileState);
  const MAX_LEVEL = 42;

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  /*   const getBasicProfileHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/${profileId}`);
      setProfile(res?.data);
    } catch (e) {
      setError('SJ03');
    }
  }; */

  const getBasicProfileHandler = useMockAxiosGet<any>({
    url: '/users/intraId',
    setState: (data) => {
      setProfile(data);
    },
    err: 'DK01',
    type: 'setError',
  });

  return {
    intraId,
    userImageUri,
    racketType,
    statusMessage,
    level,
    currentExp,
    maxExp,
    expRate,
    MAX_LEVEL,
    tierImageUri,
    tierName,
  };
};

export default useBasicProfile;
