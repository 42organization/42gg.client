import { useState } from 'react';
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
  const [reload, setReload] = useState<boolean>(false);
  const canBeCompleted = isAfterMin(startTime, 1);
  const buttonMode = {
    style: canBeCompleted
      ? styles.positive
      : `${styles.negative} ${styles.single}`,
    onClick: canBeCompleted
      ? onSubmit
      : () => {
          setReload(!reload);
        },
  };

  return (
    <div className={styles.container}>
      <Guide condition={canBeCompleted} guideLine={guideLine} />
      <div className={styles.resultContainer}>
        <MatchTeams matchTeams={matchTeamsInfo} />
      </div>
      <div className={styles.buttons}>
        <Button
          style={buttonMode.style}
          value='게임종료'
          onClick={buttonMode.onClick}
        />
      </div>
    </div>
  );
}
