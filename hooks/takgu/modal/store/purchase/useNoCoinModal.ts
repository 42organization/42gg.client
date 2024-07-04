import router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/takgu/modal';

const useNoCoinModal = () => {
  const setModal = useSetRecoilState(modalState);

  const onPlay = () => {
    setModal({ modalName: null });
    router.push(`/takgu/match`);
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPlay, onCancel };
};

export default useNoCoinModal;
