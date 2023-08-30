import { useSetRecoilState } from 'recoil';
import { Purchase } from 'types/itemTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

const useBuyModal = (purchasedItem: Purchase) => {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);

  const onPurchase = async () => {
    try {
      await instance.post(
        `/pingpong/items/purchases/${purchasedItem.itemId}`,
        null
      );
      alert(`구매 성공!`);
    } catch (error) {
      setError('HB03');
    }
    setModal({ modalName: null });
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPurchase, onCancel };
};

export default useBuyModal;
