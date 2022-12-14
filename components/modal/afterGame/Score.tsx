import { TeamScore } from 'types/scoreTypes';
import styles from 'styles/modal/AfterGameModal.module.scss';

interface ScoreProps {
  result: TeamScore;
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
  result: TeamScore;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputScore({ result, onChange }: InputScoreProps) {
  return (
    <div className={styles.finalScore}>
      <div>
        <input
          id='myTeamScore'
          name='myTeamScore'
          type='number'
          value={result.myTeamScore}
          onChange={onChange}
        />
      </div>
      <div>:</div>
      <div>
        <input
          id='enemyTeamScore'
          name='enemyTeamScore'
          type='number'
          value={result.enemyTeamScore}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function CheckedScore({ result }: { result: TeamScore }) {
  return (
    <div className={styles.finalScore}>
      <div>{result.myTeamScore}</div>
      <div>:</div>
      <div>{result.enemyTeamScore}</div>
    </div>
  );
}
