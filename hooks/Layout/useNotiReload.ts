import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { Noti } from 'types/notiTypes';

type useNotiReloadResult = [Noti[], boolean, Dispatch<SetStateAction<boolean>>];

const useNotiReload = (): useNotiReloadResult => {
  const [noti, setNoti] = useState<Noti[]>([]);
  const [clickReloadNoti, setClickReloadNoti] = useState(false);
  const [spinReloadButton, setSpinReloadButton] = useState(false);

  const setError = useSetRecoilState(errorState);

  const getNotiHandler = async () => {
    if (clickReloadNoti) {
      setSpinReloadButton(true);
      setTimeout(() => {
        setSpinReloadButton(false);
      }, 1000);
    }
    try {
      const res = await instance.get('/pingpong/notifications');
      setNoti(res?.data.notifications);
      setClickReloadNoti(false);
    } catch (e) {
      setError('JB04');
    }
  };

  useEffect(() => {
    getNotiHandler();
  }, []);

  useEffect(() => {
    if (clickReloadNoti) {
      getNotiHandler();
    }
  }, [clickReloadNoti]);

  return [noti, spinReloadButton, setClickReloadNoti];
};

export default useNotiReload;
