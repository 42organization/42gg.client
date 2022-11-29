import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Exp } from 'types/modalTypes';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { reloadMatchState } from 'utils/recoil/match';
import ExpStat from './ExpStat';
import PppStat from 'components/modal/statChange/PppStat';
import styles from 'styles/modal/StatChangeModal.module.scss';

export default function StatChangeModal({ gameId }: Exp) {
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const [stat, setStat] = useState();

  useEffect(() => {
    getExpHandler();
  }, []);

  const getExpHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/games/${gameId}/result/rank`);
      setStat({ ...res.data });
    } catch (e) {
      setError('KP03');
    }
  };

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
        <PppStat stat={stat} />
        <ExpStat stat={stat} />
        <div className={styles.guide}>화면을 클릭해주세요!</div>
      </div>
    </div>
  );
}
