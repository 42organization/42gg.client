// import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { Gift } from 'types/itemTypes';
// import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { mockInstance } from 'utils/mockAxios';

const useGiftModal = (gift: Gift) => {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);

  // TODO: mockInstance 대신 instance로 변경하기
  const onPurchase = async () => {
    if (gift.ownerId === '') {
      // TODO: alert 대신 toast/snackbar로 변경하기?
      alert('선물할 유저를 선택해주세요.');
      return;
    }
    try {
      const res = await mockInstance.post(`/items/gift/${gift.itemId}`, gift);
      // 테스트용 -> 지우기
      console.log(`message: ${res?.data?.message}`);
      // TODO: alert 대신 toast 띄우거나 아무것도 안하기
      alert(`${gift.ownerId}님께 선물이 전달되었습니다`);
    } catch (error) {
      setError('HB02');
    }
    // console.log(`**itemId: ${gift.itemId}, ownerId: ${gift.ownerId}`);
    setModal({ modalName: null });
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onPurchase, onCancel };
};

export default useGiftModal;
