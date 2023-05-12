import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

const useAnnouncementCheck = (presentPath) => {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  const announcementTime = localStorage.getItem('announcementTime');

  const getAnnouncementHandler = async () => {
    try {
      const res = await instance.get('/pingpong/announcemnet');
      res?.data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: res.data,
        });
    } catch (e) {
      setError('RJ01');
    }
  };

  useEffect(() => {
    if (presentPath === '/') {
      if (
        !announcementTime ||
        Date.parse(announcementTime) < Date.parse(new Date().toString())
      )
        getAnnouncementHandler();
    } else {
      setModal({ modalName: null });
    }
  }, [presentPath]);
};

export default useAnnouncementCheck;
