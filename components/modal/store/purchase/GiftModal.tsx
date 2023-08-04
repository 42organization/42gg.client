import useGiftModal from 'hooks/modal/store/purchase/useGiftModal';
import styles from 'styles/modal/store/GiftModal.module.scss';
import { PriceTag } from 'types/modalTypes';

export default function GiftModal({ product, price }: PriceTag) {
  const { onPurchase, onCancel } = useGiftModal();

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🎁</div>
        <div className={styles.message}>선물하기</div>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>아이템: {product}</div>
          <div className={styles.itemPrice}>가격: {price}</div>
        </div>
        <div className={styles.warning}>
          <p>⚠ 선물한 아이템은 환불 및 취소가 불가합니다 ⚠</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={onCancel} type='button' value='취소' />
        </div>
        <div className={styles.positive}>
          <input onClick={onPurchase} type='button' value='확인' />
        </div>
      </div>
    </div>
  );
}
