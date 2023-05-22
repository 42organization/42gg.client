import { AfterGame, TeamScore } from 'types/scoreTypes';
import { MatchTeams } from './MatchTeams';
import Score from './Score';
import { Button, Buttons } from './Buttons';
import useRankGame from 'hooks/modal/aftergame/useRankGame';
import Guide from './Guide';
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
      <Guide condition={onCheck} modalMode='rank' />
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
