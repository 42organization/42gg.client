import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { profileState } from 'utils/recoil/user';

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
      edge,
      backgroundType,
    },
    setProfile,
  ] = useRecoilState(profileState);
  const MAX_LEVEL = 42;

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/${profileId}`);
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
    tierImageUri,
    tierName,
    edge,
    backgroundType,
  };
};

export default useBasicProfile;
