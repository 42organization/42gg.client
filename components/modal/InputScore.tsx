import React, { useEffect, useState } from 'react';
import instance from '../../utils/axios';
import { PlayerInfo, GameResult } from '../../types/scoreTypes';
import styles from '../../styles/InputScore.module.scss';

const defaultPlayersInfo: PlayerInfo[] = [{ userId: '', userImageUri: '' }];
const defaultResult: GameResult = { myTeamScore: '', enemyTeamScore: '' };

export default function InputScoreModal() {
  const [myTeamInfo, setMyTeamInfo] =
    useState<PlayerInfo[]>(defaultPlayersInfo);
  const [enemyTeamInfo, setEnemyTeamInfo] =
    useState<PlayerInfo[]>(defaultPlayersInfo);
  const [result, setResult] = useState<GameResult>(defaultResult);
  const [onCheck, setOnCheck] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/games/result`);
        setMyTeamInfo(res?.data.myTeam);
        setEnemyTeamInfo(res?.data.enemyTeam);
      } catch (e) {
        //console.log(e);
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
    const res = await instance.post(`/pingpong/games/result`, result);
    if (res?.status === 201) {
      alert('결과 입력이 완료되었습니다.');
    } else if (res?.status === 202) {
      alert('결과가 입력된 게임입니다.');
    } else {
      alert('error occurred');
    }
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div>✅</div>
        <div>
          {onCheck ? '경기 결과' : '경기가 끝났다면 점수를 입력해주세요.'}
        </div>
      </div>
      <div className={styles.resultContainer}>
        <div className={styles.players}>
          <div className={styles.userInfo}>
            {myTeamInfo.map((userInfo) => (
              <div key={userInfo.userId} className={styles.userImage}></div>
            ))}
            {myTeamInfo.map((userInfo) => (
              <div key={userInfo.userId} className={styles.userId}>
                {userInfo.userId}
              </div>
            ))}
          </div>
          <div>vs</div>
          <div className={styles.userInfo}>
            {enemyTeamInfo.map((userInfo) => (
              <div key={userInfo.userId} className={styles.userImage}></div>
            ))}
            {enemyTeamInfo.map((userInfo) => (
              <div key={userInfo.userId} className={styles.userId}>
                {userInfo.userId}
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
        <div className={styles.submitButton}>
          <input
            type='button'
            value='다시 입력하기'
            onClick={reEnterHandler}
            style={{ background: 'white', color: 'black' }}
          />
          <input type='button' value='제출하기' onClick={submitResultHandler} />
        </div>
      ) : (
        <div className={styles.submitButton}>
          <input type='button' value='확 인' onClick={enterHandler} />
        </div>
      )}
    </div>
  );
}
