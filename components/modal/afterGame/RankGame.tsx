import { AfterGame, TeamScore } from 'types/scoreTypes';
import { Button, Buttons } from 'components/modal/afterGame/Buttons';
import Guide from 'components/modal/afterGame/Guide';
import { MatchTeams } from 'components/modal/afterGame/MatchTeams';
import Score from 'components/modal/afterGame/Score';
import useRankGame from 'hooks/modal/aftergame/useRankGame';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface RankGameProps {
  currentGame: AfterGame;
  onSubmit: (gameResult: TeamScore) => void;
}

export default function RankGame({ currentGame, onSubmit }: RankGameProps) {
  const {
    onCheck,
    matchTeamsInfo,
    result,
    isScoreExist,
    inputScoreHandler,
    enterHandler,
    resetHandler,
  } = useRankGame({ currentGame, onSubmit });

  return (
    <div className={styles.container}>
      {isScoreExist ? (
        <Guide condition={onCheck} modalMode='CONFIRM' />
      ) : (
        <Guide condition={onCheck} modalMode='RANK' />
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
        <div className={styles.buttons}>
          <Button
            style={styles.positive}
            value='게임종료'
            onClick={() => onSubmit(result)}
          />
        </div>
      ) : (
        <Buttons
          onCheck={onCheck}
          onEnter={enterHandler}
          onReset={resetHandler}
          onSubmit={() => onSubmit(result)}
        />
      )}
    </div>
  );
}
