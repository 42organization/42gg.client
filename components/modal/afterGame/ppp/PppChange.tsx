import { useEffect, useState } from 'react';
import styles from 'styles/modal/ExpGameModal.module.scss';
import { sleep } from 'utils/sleep';

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
    <div>
      {win === 1 ? (
        <>
          <span className={styles.pppWordRed}>ppp.</span>
          <span className={styles.pppChangeRed}>{ppp}</span>
        </>
      ) : (
        <>
          <span className={styles.pppWordBlue}>ppp.</span>
          <span className={styles.pppChangeBlue}>{ppp}</span>
        </>
      )}
    </div>
  );
}
