import { KeyboardEvent } from 'react';
import { TeamScore } from 'types/scoreTypes';
import styles from 'styles/modal/AfterGameModal.module.scss';

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

interface InputScoreProps {
  result: TeamScore;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
}

function InputScore({ result, onChange, onEnter }: InputScoreProps) {
  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <div className={styles.finalScore}>
      <div>
        <input
          id='myTeamScore'
          name='myTeamScore'
          type='number'
          value={result.myTeamScore}
          onChange={onChange}
          onKeyDown={keyPressHandler}
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
          onKeyDown={keyPressHandler}
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
