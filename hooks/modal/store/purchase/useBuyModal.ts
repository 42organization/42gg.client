import { useSetRecoilState } from 'recoil';
import { Purchase } from 'types/itemTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { updateCoinState } from 'utils/recoil/updateCoin';

const useBuyModal = (purchasedItem: Purchase) => {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const updateCoin = useSetRecoilState(updateCoinState);

  const onPurchase = async () => {
    try {
      await instance.post(
        `/pingpong/items/purchases/${purchasedItem.itemId}`,
        null
      );
      alert(`구매 성공!`);
      updateCoin(true);
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
