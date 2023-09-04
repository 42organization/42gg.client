import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { CoinResult } from 'types/coinTypes';
import { GameResult } from 'types/gameTypes';
import { Exp } from 'types/modalTypes';
import { errorState } from 'utils/recoil/error';
import { reloadMatchState } from 'utils/recoil/match';
import { modalState } from 'utils/recoil/modal';
import ExpStat from 'components/modal/statChange/ExpStat';
import PppStat from 'components/modal/statChange/PppStat';
import useAxiosGet, { useMockAxiosGet } from 'hooks/useAxiosGet';
import styles from 'styles/modal/afterGame/StatChangeModal.module.scss';

export default function StatChangeModal({ gameId, mode }: Exp) {
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);
  const [stat, setStat] = useState<GameResult | undefined>();

  const getExpHandler = useAxiosGet({
    url: `/pingpong/games/${gameId}/result/${mode?.toLowerCase()}`,
    setState: setStat,
    err: 'KP03',
    type: 'setError',
  });

  useEffect(() => {
    getExpHandler();
  }, []);

  const closeModal = () => {
    setReloadMatch(true);
    setModal({ modalName: null });
    openCoin();
  };

  const openCoin = async () => {
    try {
      if (!stat) return null;
      setModal({
        modalName: 'COIN-ANIMATION',
        CoinResult: {
          isAttended: false,
          afterCoin: stat.afterCoin,
          beforeCoin: stat.beforeCoin,
          coinIncrement: stat.coinIncrement,
        },
      });
    } catch (error) {
      setError('SM02');
    }
  };

  return (
    <div>
      <div
        className={`${styles.fixedContainer} ${styles.front}`}
        onClick={closeModal}
      />
      <div className={styles.container}>
        <div className={styles.emoji}>🏓</div>
        {mode === 'RANK' && stat && <PppStat stat={stat} />}
        {stat && <ExpStat stat={stat} />}
        <div className={styles.guide}>화면을 클릭해주세요!</div>
      </div>
    </div>
  );
}
