import { useEffect, useState } from 'react';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import { MatchTeams } from './MatchTeams';
import Score from './Score';
import { Button, Buttons } from './Buttons';
import Guide from './Guide';
import styles from 'styles/modal/AfterGameModal.module.scss';

interface RankGameProps {
  currentGame: AfterGame;
  onSubmit: (gameResult: TeamScore) => void;
}

export default function RankGame({ currentGame, onSubmit }: RankGameProps) {
  const { isScoreExist, matchTeamsInfo } = currentGame;
  const [result, setResult] = useState<TeamScore>({
    myTeamScore: '',
    enemyTeamScore: '',
  });
  const [onCheck, setOnCheck] = useState<boolean>(false);
  const inputScoreHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(value);
    setResult((prev) => ({
      ...prev,
      [name]: intValue > 5 || intValue < 0 ? '' : intValue,
    }));
  };

  useEffect(() => {
    if (isScoreExist) {
      setOnCheck(true);
      setResult((prev) => ({
        ...prev,
        myTeamScore: matchTeamsInfo.myTeam.teamScore,
        enemyTeamScore: matchTeamsInfo.enemyTeam.teamScore,
      }));
    }
  }, [currentGame]);

  const enterHandler = () => {
    const { myTeamScore, enemyTeamScore } = result;
    if (isCorrectScore(myTeamScore, enemyTeamScore)) setOnCheck(true);
  };

  const resetHandler = () => {
    setResult((prev) => ({ ...prev, myScore: '', enemyScore: '' }));
    setOnCheck(false);
  };

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

const isCorrectScore = (score1: number | '', score2: number | '') => {
  if (score1 === '' || score2 === '') {
    alert('점수를 입력해주세요.');
    return false;
  } else if (score1 > 5 || score2 > 5) {
    alert('6점 이상 입력은 불가능합니다! (단판, 5점 내기)');
    return false;
  } else if (score1 === score2) {
    alert('동점 입력은 불가능합니다.');
    return false;
  }
  return true;
};
