import { AfterGame } from 'types/scoreTypes';
import { isAfterMin } from 'utils/handleTime';
import { Button } from './Buttons';
import { MatchTeamsInfo } from './MatchTeamsInfo';
import Guide, { GuideLine } from './Guide';
import styles from 'styles/modal/AfterGameModal.module.scss';

interface NormalGameModalProps {
  currentGameInfo: AfterGame;
  guideLine: GuideLine;
  onSubmit: () => void;
}

export default function NormalGameModal({
  currentGameInfo,
  guideLine,
  onSubmit,
}: NormalGameModalProps) {
  const { startTime, matchTeamsInfo } = currentGameInfo;
  const canBeCompleted = isAfterMin(startTime, 10);

  return (
    <div className={styles.container}>
      <Guide condition={canBeCompleted} guideLine={guideLine} />
      <div className={styles.resultContainer}>
        <MatchTeamsInfo matchTeamsInfo={matchTeamsInfo} />
      </div>
      {canBeCompleted && (
        <div className={styles.buttons}>
          <Button style={styles.positive} value='게임종료' onClick={onSubmit} />
        </div>
      )}
    </div>
  );
}
