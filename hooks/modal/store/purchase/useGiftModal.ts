// import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { Gift } from 'types/itemTypes';

const useGiftModal = (gift: Gift) => {
  const setModal = useSetRecoilState(modalState);

  // TODO: 선물 API 받아서 적용하기
  const onPurchase = () => {
    if (gift.ownerId === '') {
      // TODO: alert 대신 snackbar로 변경하기?
      alert('선물할 유저를 선택해주세요.');
      return;
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
