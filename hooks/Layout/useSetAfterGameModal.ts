import { openCurrentMatchState } from 'utils/recoil/match';
import { useEffect } from 'react';
import { modalState } from 'utils/recoil/modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { liveState } from 'utils/recoil/layout';
import { Live } from 'types/mainType';
import { Modal } from 'types/modalTypes';

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
    }
  }, [live]);
};

export default useSetAfterGameModal;
