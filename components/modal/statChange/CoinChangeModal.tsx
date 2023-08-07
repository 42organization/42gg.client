import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState } from 'utils/recoil/match';
import { CoinResult } from 'types/coinTypes';
import CoinAnimation from '../CoinAnimation';
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
      <div className={styles.container}>
        <div className={styles.emoji}>💲</div>
        <CoinStat before={coin?.beforeCoin} after={coin?.afterCoin} />
        <CoinAnimation amount={coin?.coinIncrement} />
        <div className={styles.guide}>화면을 클릭해주세요!</div>
      </div>
    </div>
  );
}
