import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { CoinResult } from 'types/coinTypes';
import { modalState } from 'utils/recoil/modal';
import CoinAnimation from 'components/modal/CoinAnimation';
import CoinPopcon from 'components/modal/CoinPopcon';
import CoinStat from 'components/modal/statChange/CoinStatChange';
import styles from 'styles/modal/CoinChangeModal.module.scss';

export default function CoinChangeModal(coin: CoinResult) {
  const setModal = useSetRecoilState(modalState);

  const closeModal = () => {
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
          <Image src='/image/coinImage.svg' width={70} height={70} alt='Coin' />
        </div>
        <div className={styles.coinStat}>
          <CoinStat before={coin?.beforeCoin} after={coin?.afterCoin} />
          {coin.coinIncrement === 0 && (
            <div className={`${styles.appear}`}>
              획득한 코인이 없습니다.ㅜㅜ
            </div>
          )}
        </div>
        <CoinAnimation amount={coin?.coinIncrement} />
        <div className={styles.guide}>화면을 클릭해주세요!</div>
      </div>
    </div>
  );
}
