import { useSetRecoilState } from 'recoil';
import { Purchase } from 'types/itemTypes';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { mockInstance } from 'utils/mockAxios';

const useBuyModal = (purchasedItem: Purchase) => {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);

  // TODO: mockInstance 대신 instance로 변경하기
  const onPurchase = async () => {
    try {
      const res = await mockInstance.post(
        `/items/purchases/${purchasedItem.itemId}`,
        purchasedItem
      );
      // 테스트용 -> 지우기
      console.log(`message: ${res?.data?.message}`);
      // TODO: alert 대신 toast 띄우거나 아무것도 안하기
      alert(`구매 성공!`);
    } catch (error) {
      setError('HB01');
    }
    // console.log(`**itemId: ${purchasedItem.itemId}`);
    setModal({ modalName: null });
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPurchase, onCancel };
};

export default useBuyModal;
