import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { Modal } from 'types/modalTypes';
import styles from 'styles/store/ItemCard.module.scss';
import { modalState } from 'utils/recoil/modal';

export default function ItemCard({ item }: { item: Item }) {
  const setModal = useSetRecoilState<Modal>(modalState);

  const handleGift = () => {
    setModal({
      modalName: 'PURCHASE-GIFT',
    });
  };
  const handleBuying = () => {
    setModal({
      modalName: 'PURCHASE-BUY',
    });
  };

  return (
    <div className={styles.itemCard}>
      <div className={styles.preview}>
        <div className={styles.img}>
          <Image src={item.imageUrl} alt={item.itemName} fill />
        </div>
        <div className={styles.badge}>{item.discount}%</div>
      </div>
      <div className={styles.details}>
        <div className={styles.itemPriceTag}>
          <div className={styles.title}>
            <h4>{item.itemName}</h4>
          </div>
          <div className={styles.priceTags}>
            <h5 className={styles.originalPrice}>${item.price}</h5>
            <h5 className={styles.discountedPrice}>${item.salePrice}</h5>
          </div>
        </div>
        <div className={styles.content}>
          <p>{item.content}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.gift} onClick={handleGift}>
            선물하기
          </button>
          <button className={styles.buy} onClick={handleBuying}>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
