import { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { GiftRequest } from 'types/itemTypes';
import { PriceTag } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { updateCoinState } from 'utils/recoil/updateCoin';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import GiftSearchBar from 'components/store/purchase/GiftSearchBar';
import styles from 'styles/modal/store/GiftModal.module.scss';

export default function GiftModal({ itemId, product, price }: PriceTag) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const updateCoin = useSetRecoilState(updateCoinState);
  const [giftReqData, setGiftReqData] = useState<GiftRequest>({
    ownerId: '',
  });

  // TODO: 에러 처리
  const onPurchase = async () => {
    if (giftReqData.ownerId === '') {
      alert('선물할 유저를 선택해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await instance.post(`/pingpong/items/gift/${itemId}`, giftReqData);
      alert(`${giftReqData.ownerId}님께 선물이 전달되었습니다.`);
      updateCoin(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('HB02');
    }
    resetModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🎁</div>
        <div className={styles.message}>선물하기</div>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>
            <div>아이템:</div>
            <div>{product}</div>
          </div>
          <div className={styles.itemPrice}>
            <div>가격:</div>
            <div>{price} 코인</div>
          </div>
        </div>
        <GiftSearchBar setGiftReqData={setGiftReqData} />
        {giftReqData.ownerId !== '' && (
          <div className={styles.recipient}>
            <span>{giftReqData.ownerId}</span>님에게 선물하시겠습니까?
          </div>
        )}
        <div className={styles.warning}>
          <p>⚠ 선물한 아이템은 환불 및 취소가 불가합니다 ⚠</p>
        </div>
      </div>
      <ModalButtonContainer>
        <ModalButton style='negative' value='취소' onClick={resetModal} />
        <ModalButton
          style='positive'
          value='보내기'
          isLoading={isLoading}
          onClick={onPurchase}
        />
      </ModalButtonContainer>
    </div>
  );
}
