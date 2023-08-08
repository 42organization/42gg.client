import { useSetRecoilState } from 'recoil';
import { Purchase } from 'types/itemTypes';
import { modalState } from 'utils/recoil/modal';

const useBuyModal = ({ itemId }: Purchase) => {
  const setModal = useSetRecoilState(modalState);

  // TODO: 구매 API 받아서 적용하기
  const onPurchase = () => {
    // console.log(`itemId: ${itemId}`);
    setModal({ modalName: null });
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPurchase, onCancel };
};

export default useBuyModal;
