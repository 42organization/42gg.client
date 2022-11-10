import { useEffect, useState } from 'react';
import { sleep } from 'utils/sleep';
import styles from 'styles/modal/ExpGameModal.module.scss';

type PppChangeProps = {
  beforePpp: number;
  changePpp: number;
  win: number;
};

export default function PppChange({
  beforePpp,
  changePpp,
  win,
}: PppChangeProps) {
  const [ppp, setPpp] = useState<number>(beforePpp);

  useEffect(() => {
    PppChangeAnimation();
  }, []);

  const PppChangeAnimation = () => {
    if (win === 1) {
      for (let i = 0; i < Math.abs(changePpp); ++i) {
        sleep(i * i * 7).then(() => setPpp((thisPpp) => thisPpp + 1));
      }
    } else {
      for (let i = 0; i < Math.abs(changePpp); ++i) {
        sleep(i * i * 7).then(() => setPpp((thisPpp) => thisPpp - 1));
      }
    }
  };

  return (
    <div className={styles.pppContainer}>
      <div className={styles.pppLeftEmogi}>🏓</div>
      <div className={win === 1 ? styles.pppChangeRed : styles.pppChangeBlue}>
        {ppp}
      </div>
      <div className={styles.pppRightEmogi}>🏓</div>
    </div>
  );
}
