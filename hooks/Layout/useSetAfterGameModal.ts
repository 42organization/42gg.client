import { openCurrentMatchState } from 'utils/recoil/match';
import { useEffect } from 'react';
import { modalState } from 'utils/recoil/modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { liveState } from 'utils/recoil/layout';

const useSetAfterGameModal = () => {
  const live = useRecoilValue(liveState);
  const setModal = useSetRecoilState(modalState);
  const setOpenCurrentMatch = useSetRecoilState(openCurrentMatchState);

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
