import Celebration from './Celebration';
import styles from 'styles/modal/afterGame/StatChangeModal.module.scss';
import useExpStat from 'hooks/modal/statchange/useExpStat';

interface ExpGuageProps {
  stat: { [key: string]: number };
}
export default function ExpStat({ stat }: ExpGuageProps) {
  const {
    percent,
    celebrateEvent,
    MAX_LEVEL,
    level,
    currentExp,
    maxExp,
    addedExp,
  } = useExpStat({ stat });

  return (
    <div>
      <div className={styles.levelExpWrap}>
        <div className={styles.level}>Lv. {level}</div>
        <div className={styles.expWrap}>
          <div className={styles.expString}>
            <div className={styles.expRate}>
              <span>{`Exp : ${currentExp} / ${
                level !== MAX_LEVEL ? maxExp : 'Max'
              }`}</span>
            </div>
            <div className={styles.increasedExp}>
              <span>+</span>
              <span>{addedExp}</span>
            </div>
          </div>
          <div className={styles.expBar}>
            <span
              className={styles.expCurrent}
              style={{
                width: `${percent}%`,
              }}
            ></span>
            <span
              className={styles.expLeft}
              style={{
                width: `${100 - percent}%`,
              }}
            ></span>
          </div>
        </div>
      </div>
      {celebrateEvent && <Celebration />}
    </div>
  );
}
