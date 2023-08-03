import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

const useGiftModal = () => {
  const setModal = useSetRecoilState(modalState);

  // TODO: 선물 API 받아서 적용하기
  const onPurchase = () => {
    setModal({ modalName: null });
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPurchase, onCancel };
};

export default useGiftModal;
