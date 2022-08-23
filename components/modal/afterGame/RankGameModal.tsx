import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { CurrentGameInfo, GameResult } from 'types/scoreTypes';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/modal/AfterGameModal.module.scss';
import { MatchTeamsInfo } from './MatchTeamsInfo';
import Score from './Score';
import Guide from './Guide';

const defaultResult: GameResult = { myTeamScore: '', enemyTeamScore: '' };

interface RankGameModalProps {
  currentGameInfo: CurrentGameInfo;
  guide: { trueStr: string; falseStr: string };
}

export default function RankGameModal({
  currentGameInfo,
  guide,
}: RankGameModalProps) {
  const [result, setResult] = useState<GameResult>(defaultResult);
  const [onCheck, setOnCheck] = useState<boolean>(false);
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);

  const inputScoreHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = value.replace(/[^0-9]/g, '');
    setResult((prev) => ({
      ...prev,
      [name]: filteredValue === '' ? filteredValue : parseInt(filteredValue),
    }));
  };

  const enterHandler = () => {
    const { myTeamScore, enemyTeamScore } = result;
    if (isCorrectScore(myTeamScore, enemyTeamScore)) setOnCheck(true);
  };

  const resetHandler = () => {
    setResult((prev) => ({ ...prev, myScore: '', enemyScore: '' }));
    setOnCheck(false);
  };

  const submitResultHandler = async () => {
    try {
      const res = await instance.post(`/pingpong/games/result`, result);
      if (res?.status === 201) {
        alert('결과 입력이 완료되었습니다.');
        setModalInfo({ modalName: null });
      } else if (res?.status === 202) {
        alert('상대가 이미 점수를 입력했습니다.');
        setModalInfo({ modalName: null });
      }
    } catch (e) {
      setErrorMessage('JH04');
      return;
    }
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <Guide condition={onCheck} {...guide} />
      <div className={styles.rules}>
        <div>💡 3판 2선승제!</div>
        <div>💡 동점은 1점 내기로 승부를 결정!</div>
      </div>
      <div className={styles.resultContainer}>
        <MatchTeamsInfo matchTeamsInfo={currentGameInfo.matchTeamsInfo} />
        <Score onCheck={onCheck} result={result} onChange={inputScoreHandler} />
      </div>
      <Buttons
        onCheck={onCheck}
        onEnter={enterHandler}
        onReset={resetHandler}
        onSubmit={submitResultHandler}
      />
    </div>
  );
}

interface ButtonsProps {
  onCheck: boolean;
  onEnter: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

function Buttons({ onCheck, onEnter, onReset, onSubmit }: ButtonsProps) {
  return onCheck ? (
    <div className={styles.buttons}>
      <div className={styles.negative}>
        <input onClick={onReset} type='button' value='다시 입력하기' />
      </div>
      <div className={styles.positive}>
        <input onClick={onSubmit} type='button' value='제출하기' />
      </div>
    </div>
  ) : (
    <div className={styles.buttons}>
      <div className={styles.positive}>
        <input onClick={onEnter} type='button' value='확 인' />
      </div>
    </div>
  );
}

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
