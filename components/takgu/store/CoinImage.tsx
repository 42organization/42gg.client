import Image from 'next/image';
import styles from 'styles/takgu/store/CoinImage.module.scss';

export default function CoinImage({
  amount,
  size,
}: {
  amount: number;
  size: number;
}) {
  return (
    <div className={styles.ggCoin}>
      <Image
        src='/image/takgu/coinImage.svg'
        alt='coin'
        width={size}
        height={size}
      />
      {amount.toLocaleString()}
    </div>
  );
}
