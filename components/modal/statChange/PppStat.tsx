import { useEffect, useState } from 'react';
import { sleep } from 'utils/sleep';
import styles from 'styles/modal/StatChangeModal.module.scss';

interface PppChangeProps {
  stat: { [key: string]: number };
}
export default function PppStat({ stat }: PppChangeProps) {
  const { beforePpp, changedPpp } = stat;
  const isWinner = Math.sign(changedPpp) === 1;
  const [ppp, setPpp] = useState<number>(beforePpp);

  useEffect(() => {
    PppChangeAnimation();
  }, []);

  const PppChangeAnimation = () => {
    if (isWinner) {
      for (let i = 0; i < Math.abs(changedPpp); ++i) {
        sleep(i * i * 7).then(() => setPpp((thisPpp) => thisPpp + 1));
      }
    } else {
      for (let i = 0; i < Math.abs(changedPpp); ++i) {
        sleep(i * i * 7).then(() => setPpp((thisPpp) => thisPpp - 1));
      }
    }
  };

  return (
    <div className={styles.pppWrap}>
      <div className={`${styles.ppp} ${isWinner && styles.winner}`}>
        <span>{ppp}</span>
        <span>[{(changedPpp >= 0 ? '+' : '') + changedPpp}]</span>
      </div>
    </div>
  );
}
