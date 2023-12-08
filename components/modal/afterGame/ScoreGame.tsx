import { useState } from 'react';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import { Buttons } from 'components/modal/afterGame/Buttons';
import Guide from 'components/modal/afterGame/Guide';
import { MatchTeams } from 'components/modal/afterGame/MatchTeams';
import Score from 'components/modal/afterGame/Score';
import {
  ModalButton,
  ModalButtonContainer,
} from 'components/modal/ModalButton';
import useScoreGame from 'hooks/modal/aftergame/useScoreGame';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface ScoreGameProps {
  currentGame: AfterGame;
  onSubmit: (gameResult: TeamScore) => Promise<void>;
  openStatChange: () => void;
}

export default function ScoreGame({
  currentGame,
  onSubmit,
  openStatChange,
}: ScoreGameProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    onCheck,
    matchTeamsInfo,
    result,
    isScoreExist,
    inputScoreHandler,
    enterHandler,
    resetHandler,
  } = useScoreGame({ currentGame, onSubmit });

  const submitHandler = () => {
    setIsLoading(true);
    onSubmit(result).finally(() => {
      setIsLoading(false);
      openStatChange();
    });
  };

  return (
    <div className={styles.container}>
      {isScoreExist ? (
        <Guide condition={onCheck} modalMode='CONFIRM' />
      ) : (
        <Guide condition={onCheck} modalMode='SCORE' />
      )}
      <div className={styles.resultContainer}>
        <MatchTeams matchTeams={matchTeamsInfo} />
        <Score
          onCheck={onCheck}
          result={result}
          onChange={inputScoreHandler}
          onEnter={enterHandler}
        />
      </div>
      {isScoreExist ? (
        <ModalButtonContainer>
          <ModalButton
            style='positive'
            value='게임 종료'
            onClick={openStatChange}
          />
        </ModalButtonContainer>
      ) : (
        <Buttons
          onCheck={onCheck}
          onEnter={enterHandler}
          onReset={resetHandler}
          onSubmit={submitHandler}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
