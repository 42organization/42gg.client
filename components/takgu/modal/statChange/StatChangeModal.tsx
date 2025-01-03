import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { GameResult } from 'types/takgu/gameTypes';
import { Exp } from 'types/takgu/modalTypes';
import { errorState } from 'utils/recoil/error';
import { reloadMatchState } from 'utils/recoil/takgu/match';
import { modalState } from 'utils/recoil/takgu/modal';
import ExpStat from 'components/takgu/modal/statChange/ExpStat';
import PppStat from 'components/takgu/modal/statChange/PppStat';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/takgu/modal/afterGame/StatChangeModal.module.scss';

export default function StatChangeModal({ gameId, mode }: Exp) {
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);
  const [stat, setStat] = useState<GameResult | undefined>();

  const fetchStat = useAxiosGet({
    url: `/pingpong/games/${gameId}/pchange/result?mode=${mode}`,
    setState: setStat,
    err: 'KP03',
    type: 'setError',
  });

  useEffect(() => {
    fetchStat();
  }, []);

  const closeModal = () => {
    setReloadMatch(true);
    setModal({ modalName: null });
    openCoin();
  };

  const openCoin = () => {
    try {
      if (!stat) {
        return null;
      }
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
      setError('SM03');
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
        {stat && (
          <>
            {mode === 'RANK' && <PppStat stat={stat} />}
            <ExpStat stat={stat} />
          </>
        )}
        <div className={styles.guide}>화면을 클릭해주세요!</div>
      </div>
    </div>
  );
}
