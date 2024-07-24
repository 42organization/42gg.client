import { ColorListProps, colorMapping } from 'types/agenda/utils/colorList';
import styles from 'styles/agenda/utils/colorList.module.scss';

export default function ColorList({
  peopleCount,
  totalPeople,
}: ColorListProps) {
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
