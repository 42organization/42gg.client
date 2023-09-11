import { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { GiftRequest } from 'types/itemTypes';
import { PriceTag } from 'types/modalTypes';
import { instance, isAxiosError } from 'utils/axios';
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
  const setModal = useSetRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const updateCoin = useSetRecoilState(updateCoinState);
  const [giftReqData, setGiftReqData] = useState<GiftRequest>({
    ownerId: '',
  });

  const errorCode = [
    'IT100',
    'IT201',
    'IT202',
    'IT203',
    'IT204',
    'UR100',
  ] as const;

  type errorCodeType = (typeof errorCode)[number];

  type errorPayload = {
    status: number;
    message: string;
    code: errorCodeType;
  };

  const errorMessages: Record<errorCodeType, string> = {
    IT100: '해당 아이템이 없습니다 (• ᴖ •｡)',
    IT201: '지금은 구매할 수 없는 아이템입니다 (• ᴖ •｡)',
    IT202: 'GG코인이 부족합니다 (• ᴖ •｡)',
    IT203: '카카오 유저는 상점을 이용할 수 없습니다 (• ᴖ •｡)',
    IT204: '카카오 유저에게는 선물할 수 없습니다 (• ᴖ •｡)',
    UR100: '선물하려는 유저가 없습니다 (• ᴖ •｡)',
  };

  const onPurchase = async () => {
    if (giftReqData.ownerId === '') {
      alert('선물할 유저를 선택해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await instance.post(`/pingpong/items/gift/${itemId}`, giftReqData);
      alert(`${giftReqData.ownerId}님께 선물이 전달되었습니다 (◞ꈍ∇ꈍ)っ■`);
      updateCoin(true);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      if (isAxiosError<errorPayload>(error) && error.response) {
        const { code } = error.response.data;
        if (errorCode.includes(code)) {
          if (code === 'IT202') {
            setModal({
              modalName: 'PURCHASE-NO_COIN',
            });
            return;
          } else {
            alert(errorMessages[code]);
          }
        } else {
          setError('HB02');
        }
      } else {
        setError('HB02');
      }
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
            <div>{price.toLocaleString()} 코인</div>
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
