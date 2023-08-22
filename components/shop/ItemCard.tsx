import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { FaCoins } from 'react-icons/fa';
import { Item } from 'types/itemTypes';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/store/ItemCard.module.scss';

export default function ItemCard({ item, coin }: { item: Item; coin: number }) {
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

  const handleNoCoin = () => {
    setModal({
      modalName: 'PURCHASE-NO_COIN',
    });
  };

  return (
    <div className={styles.itemCard}>
      <div className={styles.preview}>
        <div className={styles.img}>
          <Image src={item.imageUri} alt={item.itemName} fill />
        </div>
        {item.discount && <div className={styles.badge}>{item.discount}%</div>}
      </div>
      <div className={styles.details}>
        <div className={styles.itemPriceTag}>
          <div className={styles.title}>
            <h4>{item.itemName}</h4>
          </div>
          <div className={styles.priceTags}>
            <h5
              className={
                item.discount ? styles.onDiscount : styles.originalPrice
              }
            >
              {item.originalPrice} <FaCoins />
            </h5>
            {item.discount !== 0 && (
              <h5 className={styles.discountedPrice}>
                {item.salePrice} <FaCoins />{' '}
              </h5>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <p>{item.content}</p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.gift}
            onClick={item.salePrice < coin ? handleGift : handleNoCoin}
          >
            선물하기
          </button>
          <button
            className={styles.buy}
            onClick={item.salePrice < coin ? handleBuying : handleNoCoin}
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
