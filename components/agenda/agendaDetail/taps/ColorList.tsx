import { Coalition } from 'constants/agenda/coalition';
import styles from 'styles/agenda/agendaDetail/taps/colorList.module.scss';

interface ColorMapping {
  [key: string]: string;
}

interface PeopleCount {
  [key: string]: number;
}

const colorMapping: ColorMapping = {
  [Coalition.GUN]: styles.colorGun,
  [Coalition.GON]: styles.colorGon,
  [Coalition.GAM]: styles.colorGam,
  [Coalition.LEE]: styles.colorLee,
  [Coalition.SPRING]: styles.colorSpring,
  [Coalition.SUMMER]: styles.colorSummer,
  [Coalition.AUTUMN]: styles.colorAutumn,
  [Coalition.WINTER]: styles.colorWinter,
  [Coalition.OTHER]: styles.colorDefault,
};

const peopleCount: PeopleCount = {
  [Coalition.GUN]: 2,
  [Coalition.GON]: 7,
  [Coalition.GAM]: 1,
  [Coalition.LEE]: 3,
};

export default function ColorList() {
  const totalPeople = Object.values(peopleCount).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className={styles.colorWarp}>
      {Object.keys(peopleCount).map((key) => {
        const percentage = (peopleCount[key] / totalPeople) * 100;

        return (
          <div
            key={key}
            className={`${styles.colorBar} ${colorMapping[key]}`}
            style={{ width: `${percentage}%` }}
          ></div>
        );
      })}
    </div>
  );
}
