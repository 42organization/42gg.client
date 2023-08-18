import { useSetRecoilState } from 'recoil';
import { Purchase } from 'types/itemTypes';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';

const useBuyModal = (purchasedItem: Purchase) => {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);

  // TODO: mockInstance 대신 instance로 변경하기
  const onPurchase = async () => {
    try {
      await mockInstance.post(`/items/purchases/${purchasedItem.itemId}`, null);
      // TODO: alert 대신 toast 띄우거나 아무것도 안하기
      alert(`구매 성공!`);
    } catch (error) {
      setError('HB01');
    }
    setModal({ modalName: null });
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPurchase, onCancel };
};

export default useBuyModal;
