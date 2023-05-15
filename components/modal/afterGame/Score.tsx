import { TeamScore } from 'types/scoreTypes';
import InputScore from './InputScore';
import CheckedScore from './CheckedScore';

interface ScoreProps {
  result: TeamScore;
  onCheck: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
}

export default function Score({
  result,
  onCheck,
  onChange,
  onEnter,
}: ScoreProps) {
  return onCheck ? (
    <CheckedScore result={result} />
  ) : (
    <InputScore result={result} onChange={onChange} onEnter={onEnter} />
  );
}
