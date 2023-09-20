import { useState } from 'react';
import { AfterGame } from 'types/scoreTypes';
import Guide from 'components/modal/afterGame/Guide';
import { MatchTeams } from 'components/modal/afterGame/MatchTeams';
import {
  ModalButton,
  ModalButtonContainer,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface NormalGameProps {
  currentGame: AfterGame;
  onSubmit: () => Promise<void>;
  openStatChange: () => void;
}

export default function NormalGame({
  currentGame,
  onSubmit,
  openStatChange,
}: NormalGameProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { matchTeamsInfo } = currentGame;

  const submitHandler = () => {
    setIsLoading(true);
    onSubmit().finally(() => {
      setIsLoading(false);
      openStatChange();
    });
  };

  return (
    <div className={styles.container}>
      <Guide condition={true} modalMode='NORMAL' />
      <div className={`${styles.resultContainer} ${styles.normal}`}>
        <MatchTeams matchTeams={matchTeamsInfo} />
      </div>
      <ModalButtonContainer>
        <ModalButton
          style='positive'
          value='게임 종료'
          onClick={submitHandler}
          isLoading={isLoading}
        />
      </ModalButtonContainer>
    </div>
  );
}
