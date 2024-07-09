import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Live } from 'types/takgu/mainType';
import { Modal } from 'types/takgu/modalTypes';
import { liveState } from 'utils/recoil/layout';
import { openCurrentMatchState } from 'utils/recoil/takgu/match';
import { modalState } from 'utils/recoil/takgu/modal';

const useSetAfterGameModal = () => {
  const live = useRecoilValue<Live>(liveState);
  const setModal = useSetRecoilState<Modal>(modalState);
  const setOpenCurrentMatch = useSetRecoilState<boolean>(openCurrentMatchState);

  useEffect(() => {
    if (live?.event === 'match') {
      setOpenCurrentMatch(true);
    } else if (live?.event === 'game') {
      setModal({ modalName: 'FIXED-AFTER_GAME' });
      setOpenCurrentMatch(false);
    } else {
      setOpenCurrentMatch(false);
    }
  }, [live]);
};

export default useSetAfterGameModal;
