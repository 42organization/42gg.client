import { TeamScore } from 'types/takgu/scoreTypes';
import CheckedScore from 'components/takgu/modal/afterGame/CheckedScore';
import InputScore from 'components/takgu/modal/afterGame/InputScore';

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
