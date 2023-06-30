import { AfterGame, TeamScore } from 'types/scoreTypes';
import { MatchTeams } from './MatchTeams';
import Score from './Score';
import { Button, Buttons } from './Buttons';
import Guide from './Guide';
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
