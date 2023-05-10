// /game record 부분에서 경기 경과창
// onSelect 텍스트가 선택되었을때 실행 = season.name이 선택되면 실행
import { Season } from 'types/seasonTypes';
import styles from 'styles/mode/SeasonDropDown.module.scss';

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
  return (
    <div className={styles.selectBox}>
      <select className={styles.select} onChange={onSelect} value={value}>
        {seasonList.map((season: Season) => (
          <option key={season.id} value={season.id}>
            {season.name}
          </option>
        ))}
      </select>
    </div>
  );
}
