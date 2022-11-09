import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { sleep } from 'utils/sleep';
import styles from 'styles/modal/ExpGameModal.module.scss';
import ExpCelebration from './ExpCelebration';

type ExpGuageProps = {
  maxExp: number;
  exp: number;
  level: number;
  increasedExp: number;
  afterMaxExp: number;
  increasedLevel: number;
};

export default function ExpGuage({
  maxExp,
  exp,
  level,
  increasedExp,
  afterMaxExp,
  increasedLevel,
}: ExpGuageProps) {
  const setModal = useSetRecoilState(modalState);
  const [currentExp, setCurrentExp] = useState<number>(0);
  const [currentMaxExp, setCurrentMaxExp] = useState<number>(maxExp);
  const [currentLevel, setCurrentLevel] = useState<number>(level);
  const [celebrateEvent, setCelebrateEvent] = useState<Boolean>(false);

  useEffect(() => {
    if (getPercent(maxExp, exp + currentExp) >= 100) {
      setCurrentMaxExp(afterMaxExp);
      setCurrentLevel(level + increasedLevel);
      setCelebrateEvent(true);
    }
  }, [currentExp]);

  useEffect(() => {
    expGaugeAnimation();
  }, []);

  const expGaugeAnimation = () => {
    for (let i = 0; i < increasedExp; ++i) {
      sleep(i * 20).then(() => setCurrentExp((thisExp) => thisExp + 1));
    }
  };

  return (
    <div className={styles.container}>
      {celebrateEvent && <ExpCelebration />}
      <div className={styles.levelRacketWrap}>
        <div className={styles.level}>Lv. {currentLevel}</div>
        <div className={styles.exp}>
          <div className={styles.expContainer}>
            <div className={styles.expRate}>
              {getCurrentExp(currentExp + exp, maxExp)} / {currentMaxExp}
            </div>
            <div className={styles.expIncrease}>+{currentExp}</div>
          </div>
          <div className={styles.bar}>
            <span
              className={styles.expCurrent}
              style={{
                width: `${getPercent(
                  currentMaxExp,
                  getCurrentExp(currentExp + exp, maxExp)
                )}%`,
              }}
            ></span>
            <span
              className={styles.expLeft}
              style={{
                width: `${
                  100 -
                  getPercent(
                    currentMaxExp,
                    getCurrentExp(currentExp + exp, maxExp)
                  )
                }%`,
              }}
            ></span>
          </div>
        </div>
      </div>
      <div className={styles.guideWord}>화면을 클릭해주세요!</div>
    </div>
  );
}

function getPercent(currentMaxExp: number, increasedExp: number) {
  return (increasedExp / currentMaxExp) * 100;
}

function getCurrentExp(currentExp: number, maxExp: number) {
  if (currentExp >= maxExp) {
    return currentExp - maxExp;
  } else {
    return currentExp;
  }
}
