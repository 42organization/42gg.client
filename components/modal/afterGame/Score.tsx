import { GameResult } from 'types/scoreTypes';
import styles from 'styles/modal/AfterGameModal.module.scss';

interface ScoreProps {
  result: GameResult;
  onCheck: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Score({ result, onCheck, onChange }: ScoreProps) {
  return onCheck ? (
    <CheckedScore result={result} />
  ) : (
    <InputScore result={result} onChange={onChange} />
  );
}

interface InputScoreProps {
  result: GameResult;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputScore({ result, onChange }: InputScoreProps) {
  return (
    <div className={styles.finalScore}>
      <div>
        <input
          id='myTeamScore'
          name='myTeamScore'
          value={result.myTeamScore}
          onChange={onChange}
          maxLength={1}
        />
      </div>
      <div>:</div>
      <div>
        <input
          id='enemyTeamScore'
          name='enemyTeamScore'
          value={result.enemyTeamScore}
          onChange={onChange}
          maxLength={1}
        />
      </div>
    </div>
  );
}

function CheckedScore({ result }: { result: GameResult }) {
  return (
    <div className={styles.finalScore}>
      <div>{result.myTeamScore}</div>
      <div>:</div>
      <div>{result.enemyTeamScore}</div>
    </div>
  );
}
