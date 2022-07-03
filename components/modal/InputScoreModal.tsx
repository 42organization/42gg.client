import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PlayerInfo, GameResult } from 'types/scoreTypes';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import styles from 'styles/modal/InputScoreModal.module.scss';

const defaultPlayersInfo: PlayerInfo[] = [{ intraId: '', userImageUri: '' }];
const defaultResult: GameResult = { myTeamScore: '', enemyTeamScore: '' };

export default function InputScoreModal() {
  const [myTeamInfo, setMyTeamInfo] =
    useState<PlayerInfo[]>(defaultPlayersInfo);
  const [enemyTeamInfo, setEnemyTeamInfo] =
    useState<PlayerInfo[]>(defaultPlayersInfo);
  const [result, setResult] = useState<GameResult>(defaultResult);
  const [onCheck, setOnCheck] = useState<boolean>(false);
  const setErrorMessage = useSetRecoilState(errorState);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/games/result`);
        setMyTeamInfo(res?.data.myTeam);
        setEnemyTeamInfo(res?.data.enemyTeam);
      } catch (e) {
        setErrorMessage('JH03');
      }
    })();
  }, []);

  const inputScoreHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    value = value.replace(/[^0-2]/g, '');
    setResult((prev) => ({
      ...prev,
      [name]: value === '' ? value : parseInt(value),
    }));
  };

  const isCorrectScore = (score1: number | '', score2: number | '') => {
    if (score1 === '' || score2 === '') return false;
    if (score1 + score2 > 3) return false;
    if (score1 === score2) return false;
    return true;
  };

  const enterHandler = () => {
    const { myTeamScore, enemyTeamScore } = result;
    if (!isCorrectScore(myTeamScore, enemyTeamScore)) {
      alert('정확한 점수를 입력해주세요.');
      return;
    }
    setOnCheck(true);
  };

  const reEnterHandler = () => {
    setResult((prev) => ({ ...prev, myScore: '', enemyScore: '' }));
    setOnCheck(false);
  };

  const submitResultHandler = async () => {
    try {
      const res = await instance.post(`/pingpong/games/result`, result);
      if (res?.status === 201) {
        alert('결과 입력이 완료되었습니다.');
      } else if (res?.status === 202) {
        alert('상대가 이미 점수를 입력했습니다.');
      }
    } catch (e) {
      setErrorMessage('JH04');
      return;
    }
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>✅</div>
        <div>
          {onCheck ? '경기 결과' : '경기가 끝났다면 점수를 입력해주세요.'}
        </div>
      </div>
      <div className={styles.resultContainer}>
        <div className={styles.players}>
          <div className={styles.userInfo}>
            {myTeamInfo.map((userInfo) => (
              <div key={userInfo.intraId} className={styles.userImage}></div>
            ))}
            {myTeamInfo.map((userInfo) => (
              <div key={userInfo.intraId} className={styles.intraId}>
                {userInfo.intraId}
              </div>
            ))}
          </div>
          <div>vs</div>
          <div className={styles.userInfo}>
            {enemyTeamInfo.map((userInfo) => (
              <div key={userInfo.intraId} className={styles.userImage}></div>
            ))}
            {enemyTeamInfo.map((userInfo) => (
              <div key={userInfo.intraId} className={styles.intraId}>
                {userInfo.intraId}
              </div>
            ))}
          </div>
        </div>
        {onCheck ? (
          <div className={styles.finalScore}>
            <div>{result.myTeamScore}</div>
            <div>:</div>
            <div>{result.enemyTeamScore}</div>
          </div>
        ) : (
          <div className={styles.finalScore}>
            <div>
              <input
                id='myTeamScore'
                name='myTeamScore'
                value={result.myTeamScore}
                onChange={inputScoreHandler}
                maxLength={1}
              />
            </div>
            <div>:</div>
            <div>
              <input
                id='enemyTeamScore'
                name='enemyTeamScore'
                value={result.enemyTeamScore}
                onChange={inputScoreHandler}
                maxLength={1}
              />
            </div>
          </div>
        )}
      </div>
      {onCheck ? (
        <div className={styles.buttons}>
          <div className={styles.negative}>
            <input
              onClick={reEnterHandler}
              type='button'
              value='다시 입력하기'
            />
          </div>
          <div className={styles.positive}>
            <input
              onClick={submitResultHandler}
              type='button'
              value='제출하기'
            />
          </div>
        </div>
      ) : (
        <div className={styles.buttons}>
          <div className={styles.positive}>
            <input onClick={enterHandler} type='button' value='확 인' />
          </div>
        </div>
      )}
    </div>
  );
}
