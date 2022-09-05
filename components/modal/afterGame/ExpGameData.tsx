import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { sleep } from 'utils/sleep';
import { Button } from './Buttons';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/ExpGameModal.module.scss';

type gameData = {
  maxExp: number;
  exp: number;
  level: number;
  increasedExp: number;
  afterMaxExp: number;
  increasedLevel: number;
};
export default function ExpGameData({
  maxExp,
  exp,
  level,
  increasedExp,
  afterMaxExp,
  increasedLevel,
}: gameData) {
  const setModalInfo = useSetRecoilState(modalState);
  const [beforeExp, setBeforeExp] = useState<number>(exp);

  useEffect(() => {
    expGaugeAnimation();
  }, []);

  const expGaugeAnimation = async () => {
    for (let i = 0; i < 100; ++i) {
      sleep(i * 20).then(() =>
        setBeforeExp((thisExp) => thisExp + increasedExp / 100)
      );
    }
  };

  function getPercent(maxExp: number, increasedExp: number) {
    return (increasedExp / maxExp) * 100;
  }

  if (getPercent(maxExp, beforeExp) > 100) {
    return (
      <div>
        <ExpGameData
          maxExp={afterMaxExp}
          exp={0}
          level={level + increasedLevel}
          increasedExp={increasedExp - (maxExp - exp)}
          afterMaxExp={afterMaxExp}
          increasedLevel={increasedLevel}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.levelRacketWrap}>
        <div className={styles.level}>Lv. {level}</div>
        <div className={styles.exp}>
          <div className={styles.expRate}>
            {Math.ceil(beforeExp)} / {maxExp}
          </div>
          <div className={styles.bar}>
            <span
              className={styles.expCurrent}
              style={{
                width: `${getPercent(maxExp, beforeExp)}%`,
              }}
            ></span>
            <span
              className={styles.expLeft}
              style={{
                width: `${100 - getPercent(maxExp, beforeExp)}%`,
              }}
            ></span>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          style={styles.positive}
          value='확인'
          onClick={() => {
            setModalInfo({ modalName: null });
          }}
        />
      </div>
    </div>
  );
}
