import React from 'react';
import styles from 'styles/modal/CoinAnimation.module.scss';
import CoinIcon from 'public/image/coin_image.svg';

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
        <svg className={`${styles.coin}`}>
          <CoinIcon />
        </svg>
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
