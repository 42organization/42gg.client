import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProfileRank } from 'types/takgu/userTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/takgu/recoil/error';

const useGetRankProfile = (profileId: string, season?: number) => {
  const setError = useSetRecoilState(errorState);
  const [rankProfile, setRankProfile] = useState<ProfileRank>({
    rank: 0,
    ppp: 0,
    wins: 0,
    losses: 0,
    winRate: '',
  });

  useEffect(() => {
    if (season != undefined) getRankProfileHandler();
  }, [season]);

  const getRankProfileHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/users/${profileId}/rank?season=${season}`
      );
      setRankProfile(res?.data);
    } catch (e) {
      setError('JH07');
    }
  };

  return rankProfile;
};

export default useGetRankProfile;
