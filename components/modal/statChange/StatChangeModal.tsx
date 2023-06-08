import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Exp } from 'types/modalTypes';
import { GameResult } from 'types/gameTypes';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState } from 'utils/recoil/match';
import ExpStat from './ExpStat';
import PppStat from 'components/modal/statChange/PppStat';
import styles from 'styles/modal/afterGame/StatChangeModal.module.scss';
import useAxiosGet from 'hooks/useAxiosGet';

export default function StatChangeModal({ gameId, mode }: Exp) {
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const [stat, setStat] = useState<GameResult | undefined>();
  useEffect(() => {
    getExpHandler();
  }, []);

  const getExpHandler = useAxiosGet({
    url: `/pingpong/games/${gameId}/result/${mode?.toLowerCase()}`,
    setState: setStat,
    err: 'KP03',
    type: 'setError',
  });

  const closeModal = () => {
    setReloadMatch(true);
    setModal({ modalName: null });
  };

  if (!stat) return null;

  return (
    <div>
      <div
        className={`${styles.fixedContainer} ${styles.front}`}
        onClick={closeModal}
      />
      <div className={styles.container}>
        <div className={styles.emoji}>🏓</div>
        {mode === 'RANK' && <PppStat stat={stat} />}
        <ExpStat stat={stat} />
        <div className={styles.guide}>화면을 클릭해주세요!</div>
      </div>
    </div>
  );
}
