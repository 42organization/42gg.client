import { useEffect, useState } from 'react';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import useSubmitModal from './useSubmitModal';

interface UseRankGameProps {
  currentGame: AfterGame;
  onSubmit: (gameResult: TeamScore) => void;
}

const useRankGame = ({ currentGame, onSubmit }: UseRankGameProps) => {
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
      [name]: intValue > 2 || intValue < 0 ? '' : intValue,
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

  const isCorrectScore = (score1: number | '', score2: number | '') => {
    if (score1 === '' || score2 === '') {
      alert('점수를 입력해주세요.');
      return false;
    } else if (score1 > 2 || score2 > 2) {
      alert('점수로 3점이상 입력이 불가합니다! (3판 2선승제)');
      return false;
    } else if (score1 === score2) {
      alert('동점 입력은 불가합니다. 1점 내기로 승부를 결정해주세요!');
      return false;
    }
    return true;
  };
  //이 부분의 용도
  const handleSubmit = () => {
    onSubmit(result);
  };

  return {
    onCheck,
    matchTeamsInfo,
    result,
    isScoreExist,
    inputScoreHandler,
    enterHandler,
    resetHandler,
    handleSubmit,
  };
};

export default useRankGame;
