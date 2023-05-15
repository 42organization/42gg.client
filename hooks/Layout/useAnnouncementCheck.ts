import useAxiosGet from 'hooks/useAxiosGet';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

const useAnnouncementCheck = (presentPath) => {
  const setModal = useSetRecoilState(modalState);
  const announcementTime = localStorage.getItem('announcementTime');

  const getAnnouncementHandler = useAxiosGet({
    url: '/pingpong/announcement',
    setState: (data) => {
      data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: data,
        });
    },
    err: 'RJ01',
    type: 'setError',
  });

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
