import { KeyboardEvent } from 'react';
import { TeamScore } from 'types/scoreTypes';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface InputScoreProps {
  result: TeamScore;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
}

export default function InputScore({
  result,
  onChange,
  onEnter,
}: InputScoreProps) {
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
          inputMode='numeric'
          pattern='[0-9]*'
          value={result.myTeamScore}
          min={0}
          max={2}
          onChange={onChange}
          onKeyDown={keyPressHandler}
        />
      </div>
      <div className={styles.middle}>:</div>
      <div>
        <input
          id='enemyTeamScore'
          name='enemyTeamScore'
          type='number'
          value={result.enemyTeamScore}
          min={0}
          max={2}
          onChange={onChange}
          onKeyDown={keyPressHandler}
        />
      </div>
    </div>
  );
}
