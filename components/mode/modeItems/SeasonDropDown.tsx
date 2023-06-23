import { Season } from 'types/seasonTypes';
import styles from 'styles/mode/SeasonDropDown.module.scss';
import { slice } from 'cypress/types/lodash';

interface SeasonDropDownProps {
  seasonList: Season[];
  value: number;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SeasonDropDown({
  seasonList,
  value,
  onSelect,
}: SeasonDropDownProps) {
  console.log(seasonList);
  return (
    <div className={styles.selectBox}>
      <select className={styles.select} onChange={onSelect} value={value}>
        {seasonList
          .map((season: Season) => (
            <option key={season.id} value={season.id}>
              {season.name}
            </option>
          ))}
      </select>
    </div>
  );
}
