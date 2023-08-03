import Image from 'next/image';
import { Item } from 'types/itemTypes';
import styles from 'styles/store/ItemCard.module.scss';

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className={styles.itemCard}>
      <div className={styles.preview}>
        <div className={styles.img}>
          <Image src={item.imageUrl} alt={item.itemName} fill />
        </div>
        <div className={styles.badge}>{item.discount}%</div>
      </div>
      <div className={styles.title}>
        <h4>{item.itemName}</h4>
      </div>
      <div className={styles.details}>
        <div className={styles.itemPrice}>
          <h5 className={styles.discounted}>${item.price}</h5>
          <h5 className={styles.discountedPrice}>${item.salePrice}</h5>
        </div>
        <div>
          <p>{item.content}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.gift}>선물하기</button>
          <button className={styles.buy}>구매하기</button>
        </div>
      </div>
    </div>
  );
}
