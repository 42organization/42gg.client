import { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { PriceTag } from 'types/modalTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { updateCoinState } from 'utils/recoil/updateCoin';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/BuyModal.module.scss';

export default function BuyModal({ itemId, product, price }: PriceTag) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setModal = useSetRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const updateCoin = useSetRecoilState(updateCoinState);

  const errorCode = ['IT100', 'IT201', 'IT202', 'IT203', 'UR100'] as const;

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
    UR100: 'USER NOT FOUND',
  };

  const onPurchase = async () => {
    setIsLoading(true);
    try {
      await instance.post(`/pingpong/items/purchases/${itemId}`, null);
      alert(`구매 성공 ¡¡¡( •̀ ᴗ •́ )و!!!`);
      updateCoin(true);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      if (isAxiosError<errorPayload>(error) && error.response) {
        const { code } = error.response.data;
        if (errorCode.includes(code) && code !== 'UR100') {
          if (code === 'IT202') {
            setModal({
              modalName: 'PURCHASE-NO_COIN',
            });
            return;
          } else {
            alert(errorMessages[code]);
          }
        } else {
          setError('HB03');
        }
      } else {
        setError('HB03');
      }
    }
    resetModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🛍️</div>
        <div className={styles.message}>구매하시겠습니까?</div>
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
        <div className={styles.warning}>
          <p>⚠ 구매한 아이템은 환불이 불가합니다 ⚠</p>
        </div>
      </div>
      <ModalButtonContainer>
        <ModalButton style='negative' value='아니오' onClick={resetModal} />
        <ModalButton
          style='positive'
          value='예'
          isLoading={isLoading}
          onClick={onPurchase}
        />
      </ModalButtonContainer>
    </div>
  );
}
