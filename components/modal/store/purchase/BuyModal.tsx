import { useEffect, useState } from 'react';
import { Purchase } from 'types/itemTypes';
import { PriceTag } from 'types/modalTypes';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import useBuyModal from 'hooks/modal/store/purchase/useBuyModal';
import styles from 'styles/modal/store/BuyModal.module.scss';

export default function BuyModal({ itemId, product, price }: PriceTag) {
  const [purchaseItem, setPurchaseItem] = useState<Purchase>({ itemId: -1 });
  const { onPurchase, onCancel } = useBuyModal(purchaseItem);

  useEffect(() => {
    setPurchaseItem({
      itemId: itemId,
    });
  }, [itemId]);

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
        <ModalButton style='negative' value='아니오' onClick={onCancel} />
        <ModalButton style='positive' value='예' onClick={onPurchase} />
      </ModalButtonContainer>
    </div>
  );
}
