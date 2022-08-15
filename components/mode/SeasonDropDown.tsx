interface SeasonDropDownProps {
  seasons: string[];
  value: string;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SeasonDropDown({
  seasons,
  value,
  onSelect,
}: SeasonDropDownProps) {
  if (seasons.length === 0) return null;
  return (
    <select onChange={onSelect} value={value}>
      {seasons.map((season) => (
        <option key={season} value={season}>
          {season}
        </option>
      ))}
    </select>
  );
}
