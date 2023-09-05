import { useSetRecoilState } from 'recoil';
import { Gift, GiftRequest } from 'types/itemTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { updateCoinState } from 'utils/recoil/updateCoin';

const useGiftModal = (gift: Gift) => {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const updateCoin = useSetRecoilState(updateCoinState);
  const data: GiftRequest = {
    ownerId: gift.ownerId,
  };

  const onPurchase = async () => {
    if (gift.ownerId === '') {
      alert('선물할 유저를 선택해주세요.');
      return;
    }
    try {
      const res = await instance.post(
        `/pingpong/items/gift/${gift.itemId}`,
        data
      );
      if (res.status === 201) {
        alert(`${gift.ownerId}님께 선물이 전달되었습니다.`);
        updateCoin(true);
      }
    } catch (error) {
      setError('HB02');
    }
    setModal({ modalName: null });
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPurchase, onCancel };
};

export default useGiftModal;
