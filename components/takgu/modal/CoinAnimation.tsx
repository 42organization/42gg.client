import Image from 'next/image';
import React from 'react';
import styles from 'styles/modal/CoinAnimation.module.scss';

interface amountProps {
  amount: number;
}

export default function CoinAnimation({ amount }: amountProps) {
  const tilts = ['l', 'r', 'none'];

  const moneyamount = Array.from({ length: amount }).map((_, index) => {
    const randomTilt = tilts[Math.floor(Math.random() * 3)];
    const stackStyle =
      randomTilt === 'none'
        ? styles.stack
        : randomTilt === 'l'
        ? styles.stackl
        : styles.stackr;

    return (
      <div key={index} className={`${stackStyle} ${styles.fall}`}>
        <div className={`${styles.coin}`}>
          <Image
            src='/image/takgu/coin_image.svg'
            width={60}
            height={60}
            alt='Coin'
          />
        </div>
      </div>
    );
  });

  return (
    <div id='stage-coins' className={`${styles.stageCoins}`}>
      <div className={`${styles.stage}`}>
        <div className={`${styles.column}`}>{moneyamount}</div>
        <div className={`${styles.appear}`}>+{amount}</div>
      </div>
    </div>
  );
}
