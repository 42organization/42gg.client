import useBuyModal from 'hooks/modal/store/purchase/useBuyModal';
import styles from 'styles/modal/store/BuyModal.module.scss';
import { PriceTag } from 'types/modalTypes';

export default function BuyModal({ product, price }: PriceTag) {
  const { onPurchase, onCancel } = useBuyModal();

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🛍️</div>
        <div className={styles.message}>구매하시겠습니까?</div>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>아이템: {product}</div>
          <div className={styles.itemPrice}>가격: {price}</div>
        </div>
        <div className={styles.warning}>
          <p>⚠ 구매한 아이템은 환불이 불가합니다 ⚠</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={onCancel} type='button' value='아니오' />
        </div>
        <div className={styles.positive}>
          <input onClick={onPurchase} type='button' value='예' />
        </div>
      </div>
    </div>
  );
}
