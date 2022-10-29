import { AfterGame } from 'types/scoreTypes';
import { isAfterMin } from 'utils/handleTime';
import { Button } from './Buttons';
import { MatchTeams } from './MatchTeams';
import Guide, { GuideLine } from './Guide';
import styles from 'styles/modal/AfterGameModal.module.scss';

interface NormalGameProps {
  currentGame: AfterGame;
  guideLine: GuideLine;
  onSubmit: () => void;
}

export default function NormalGame({
  currentGame,
  guideLine,
  onSubmit,
}: NormalGameProps) {
  const { startTime, matchTeamsInfo } = currentGame;
  const canBeCompleted = isAfterMin(startTime, 10);

  return (
    <div className={styles.container}>
      <Guide condition={canBeCompleted} guideLine={guideLine} />
      <div className={styles.resultContainer}>
        <MatchTeams matchTeams={matchTeamsInfo} />
      </div>
      {canBeCompleted && (
        <div className={styles.buttons}>
          <Button style={styles.positive} value='게임종료' onClick={onSubmit} />
        </div>
      )}
    </div>
  );
}
