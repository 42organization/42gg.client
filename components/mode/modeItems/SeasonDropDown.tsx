import { Season, Seasons } from 'types/seasonTypes';

interface SeasonDropDownProps {
  seasons: Seasons;
  value: number;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SeasonDropDown({
  seasons,
  value,
  onSelect,
}: SeasonDropDownProps) {
  if (seasons.seasonList === undefined) {
    return null;
  }
  return (
    <select onChange={onSelect} value={value}>
      {seasons.seasonList.map((season: Season) => (
        <option key={season.id} value={season.id}>
          {season.name}
        </option>
      ))}
    </select>
  );
}
