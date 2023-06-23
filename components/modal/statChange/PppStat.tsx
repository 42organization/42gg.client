import { useEffect, useState } from 'react';
import { sleep } from 'utils/sleep';
import styles from 'styles/modal/afterGame/StatChangeModal.module.scss';

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
    const toAdd = isWinner ? 1 : -1;
    for (let i = 0; i < Math.abs(changedPpp); ++i) {
      sleep(i * i * 7).then(() => setPpp((thisPpp) => thisPpp + toAdd));
    }
  };

  return (
    <div className={styles.pppWrap}>
      <div className={styles.ppp}>
        <span>{ppp}&nbsp;</span>
        <span>[{(changedPpp >= 0 ? '+' : '') + changedPpp}]</span>
      </div>
    </div>
  );
}
