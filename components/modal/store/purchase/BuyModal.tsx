import { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { PriceTag } from 'types/modalTypes';
import { instance } from 'utils/axios';
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
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const updateCoin = useSetRecoilState(updateCoinState);

  // TODO: 에러 처리
  const onPurchase = async () => {
    setIsLoading(true);
    try {
      await instance.post(`/pingpong/items/purchases/${itemId}`, null);
      alert(`구매 성공!`);
      updateCoin(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('HB03');
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
            <div>{price} 코인</div>
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
