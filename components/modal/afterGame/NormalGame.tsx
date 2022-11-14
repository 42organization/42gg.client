import { AfterGame } from 'types/scoreTypes';
import { Button } from './Buttons';
import { MatchTeams } from './MatchTeams';
import Guide from './Guide';
import styles from 'styles/modal/AfterGameModal.module.scss';

interface NormalGameProps {
  currentGame: AfterGame;
  onSubmit: () => void;
}

export default function NormalGame({ currentGame, onSubmit }: NormalGameProps) {
  const { matchTeamsInfo } = currentGame;

  return (
    <div className={styles.container}>
      <Guide condition={true} modalMode='normal' />
      <div className={styles.resultContainer}>
        <MatchTeams matchTeams={matchTeamsInfo} />
      </div>
      <div className={styles.buttons}>
        <Button style={styles.positive} value='게임 종료' onClick={onSubmit} />
      </div>
    </div>
  );
}
