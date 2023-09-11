import Image from 'next/image';
import { SyntheticEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { Item } from 'types/itemTypes';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/store/ItemCard.module.scss';

export default function ItemCard({ item }: { item: Item }) {
  const setModal = useSetRecoilState<Modal>(modalState);

  const handleGift = () => {
    setModal({
      modalName: 'PURCHASE-GIFT',
      priceTag: {
        itemId: item.itemId,
        product: item.itemName,
        price: item.salePrice,
      },
    });
  };

  const handleBuying = () => {
    setModal({
      modalName: 'PURCHASE-BUY',
      priceTag: {
        itemId: item.itemId,
        product: item.itemName,
        price: item.salePrice,
      },
    });
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/image/not_found.svg';
  };

  return (
    <div className={styles.itemCard}>
      {item.discount > 0 && (
        <div className={styles.badge}>{item.discount}%</div>
      )}

      <div className={styles.preview}>
        <div className={styles.img}>
          <Image
            src={item.imageUri}
            alt={item.itemName}
            onError={handleImageError}
            fill
          />
        </div>
      </div>
      <div className={styles.title}>{item.itemName}</div>
      <div className={styles.priceTag}>
        <Image src='/image/coinImage.svg' alt={'coin'} width={15} height={15} />
        <span
          className={item.discount > 0 ? styles.onDiscount : styles.salePrice}
        >
          {item.originalPrice.toLocaleString()}
        </span>
        {item.discount > 0 && (
          <span className={styles.salePrice}>
            {item.salePrice.toLocaleString()}
          </span>
        )}
      </div>
      <div className={styles.mainContent}>{item.mainContent}</div>
      <div className={styles.subContent}>{item.subContent}</div>
      <div className={styles.buttons}>
        <button className={styles.gift} onClick={handleGift}>
          선물하기
        </button>
        <button className={styles.buy} onClick={handleBuying}>
          구매하기
        </button>
      </div>
    </div>
  );
}
