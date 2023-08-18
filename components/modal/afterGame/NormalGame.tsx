import { AfterGame } from 'types/scoreTypes';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';
import { Button } from './Buttons';
import Guide from './Guide';
import { MatchTeams } from './MatchTeams';

interface NormalGameProps {
  currentGame: AfterGame;
  onSubmit: () => void;
}

export default function NormalGame({ currentGame, onSubmit }: NormalGameProps) {
  const { matchTeamsInfo } = currentGame;

  return (
    <div className={styles.container}>
      <Guide condition={true} modalMode='NORMAL' />
      <div className={`${styles.resultContainer} ${styles.normal}`}>
        <MatchTeams matchTeams={matchTeamsInfo} />
      </div>
      <div className={styles.buttons}>
        <Button style={styles.positive} value='게임 종료' onClick={onSubmit} />
      </div>
    </div>
  );
}
