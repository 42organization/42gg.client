import useBuyModal from 'hooks/modal/store/purchase/useBuyModal';
import styles from 'styles/modal/store/BuyModal.module.scss';

export default function BuyModal() {
  const { onPurchase, onCancel } = useBuyModal();

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🏓</div>
        <div className={styles.message}>구매하시겠습니까?</div>
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
