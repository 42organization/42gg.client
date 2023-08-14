// import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { Gift } from 'types/itemTypes';
import { errorState } from 'utils/recoil/error';
import { mockInstance } from 'utils/mockAxios';
import { instanceInManage } from 'utils/axios';

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
      if (res.status === 201) {
        // TODO: alert 대신 toast 띄우거나 아무것도 안하기
        alert(`${gift.ownerId}님께 선물이 전달되었습니다`);
        await instanceInManage.post(`/notifications`, {
          intraId: gift.ownerId,
          message: `선물이 도착했어요🎁 상점 보관함에서 선물과 발송인을 확인하세요!`,
        });
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
