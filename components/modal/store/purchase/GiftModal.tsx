import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { GiftRequest } from 'types/itemTypes';
import { PriceTag } from 'types/modalTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { PURCHASE_ALERT_MESSAGE } from 'constants/store/purchaseAlertMessage';
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
  const [giftReqData, setGiftReqData] = useState<GiftRequest>({
    ownerId: '',
  });
  const queryClient = useQueryClient();
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

  const { COMMON, GIFT } = PURCHASE_ALERT_MESSAGE;

  const errorMessages: Record<errorCodeType, string> = {
    IT100: COMMON.ITEM_ERROR,
    IT201: COMMON.OUTDATED_ERROR,
    IT202: COMMON.COIN_ERROR,
    IT203: COMMON.KAKAO_USER_ERROR,
    IT204: GIFT.KAKAO_RECIPIENT_ERROR,
    UR100: GIFT.RECIPIENT_ERROR,
  };

  const onPurchase = async () => {
    if (giftReqData.ownerId === '') {
      alert(GIFT.EMPTY_RECIPIENT);
      return;
    }
    setIsLoading(true);
    try {
      await instance.post(`/pingpong/items/gift/${itemId}`, giftReqData);
      alert(`(◞ꈍ∇ꈍ)っ■ ${giftReqData.ownerId}님께 선물이 전달되었습니다`);
      queryClient.invalidateQueries('coin');
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
          <p>⚠ 선물은 환불 및 취소가 불가합니다 ⚠</p>
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
