import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { profileState } from 'utils/recoil/user';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';

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
    },
    setProfile,
  ] = useRecoilState(profileState);
  const MAX_LEVEL = 42;

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/${profileId}/detail`);
      setProfile(res?.data);
    } catch (e) {
      setError('SJ03');
    }
  };

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
  };
};

export default useBasicProfile;
