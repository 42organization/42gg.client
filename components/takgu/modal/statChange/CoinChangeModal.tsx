import Image from 'next/image';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { CoinResult } from 'types/takgu/coinTypes';
import { modalState } from 'utils/recoil/takgu/modal';
import CoinAnimation from 'components/takgu/modal/CoinAnimation';
import CoinPopcon from 'components/takgu/modal/CoinPopcon';
import CoinStat from 'components/takgu/modal/statChange/CoinStatChange';
import styles from 'styles/takgu/modal/CoinChangeModal.module.scss';

export default function CoinChangeModal(coin: CoinResult) {
  const setModal = useSetRecoilState(modalState);
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.refetchQueries('user');
    };
  }, []);

  const closeModal = () => {
    queryClient.refetchQueries('user');
    setModal({ modalName: null });
  };

  return (
    <div>
      <div
        className={`${styles.fixedContainer} ${styles.front}`}
        onClick={closeModal}
      />
      <div>
        {!coin.isAttended && (
          <CoinPopcon
            amount={coin.coinIncrement * 3}
            coin={coin.coinIncrement}
          />
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.coinImage}>
          <Image
            src='/image/takgu/coinImage.svg'
            width={70}
            height={70}
            alt='Coin'
          />
        </div>
        <div className={styles.coinStat}>
          <CoinStat before={coin?.beforeCoin} after={coin?.afterCoin} />
          {coin.coinIncrement === 0 && (
            <div className={`${styles.appear}`}>획득한 코인이 없습니다. 😢</div>
          )}
        </div>
        <CoinAnimation amount={coin?.coinIncrement} />
        <div className={styles.guide}>화면을 클릭해주세요!</div>
      </div>
    </div>
  );
}
