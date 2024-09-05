import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// import { User } from 'types/mainType';
import { Modal } from 'types/takgu/modalTypes';
import { modalState } from 'utils/recoil/takgu/modal';
import { useUser } from 'hooks/takgu/Layout/useUser';
import useAxiosGet from 'hooks/useAxiosGet';

const useAnnouncementCheck = (presentPath: string) => {
  const user = useUser();
  const setModal = useSetRecoilState<Modal>(modalState);
  const announcementTime: string | null =
    typeof window !== 'undefined'
      ? localStorage.getItem('announcementTime')
      : null;

  const getAnnouncementHandler = useAxiosGet<any>({
    url: '/pingpong/announcement',
    setState: (data) => {
      data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: data,
          // isAttended: user?.isAttended,
        });
    },
    err: 'RJ01',
    type: 'setError',
  });

  const announcementHandler = () => {
    if (presentPath === '/' && user) {
      if (
        !announcementTime ||
        Date.parse(announcementTime) < Date.parse(new Date().toString())
      ) {
        getAnnouncementHandler();
      }
    } else {
      setModal({ modalName: null });
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user && user.isAttended === false && presentPath === 'takgu') {
      setModal({ modalName: 'EVENT-WELCOME' });
    } else announcementHandler();
  }, [user, presentPath]);
};

export default useAnnouncementCheck;
