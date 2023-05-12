import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { userState } from 'utils/recoil/layout';
import { seasonListState } from 'utils/recoil/seasons';

const useGetUserInfo = () => {
  const setUser = useSetRecoilState(userState);
  const setSeasonList = useSetRecoilState(seasonListState);
  const setError = useSetRecoilState(errorState);

  const getUserHandler = async () => {
    try {
      const res = await instance.get('/pingpong/users');
      setUser(res?.data);
    } catch (e) {
      setError('JB02');
    }
  };

  const getSeasonListHandler = async () => {
    try {
      const res = await instance.get('/pingpong/seasonlist');
      setSeasonList(res?.data);
    } catch (e) {
      setError('DK02');
    }
  };

  useEffect(() => {
    getUserHandler();
    getSeasonListHandler();
  }, []);
};

export default useGetUserInfo;
