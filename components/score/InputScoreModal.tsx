import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../utils/axios';
import { PlayerData, GameResult } from '../../types/scoreTypes';
import styles from '../../styles/InputScoreModal.module.scss';

type GameProps = {
  gameId: string;
};

export default function InputScoreModal({ gameId }: GameProps) {
  const [myInfo, setMyInfo] = useState<PlayerData>({ userId: '', userImageUri: '' });
  const [enemyInfo, setEnemyInfo] = useState<PlayerData>({ userId: '', userImageUri: '' });
  const [myScore, setMyScore] = useState<string>('');
  const [enemyScore, setEnemyScore] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/games/[gameId]/result`);
        setMyInfo(data.myTeam[0]);
        setEnemyInfo(data.enemyTeam[0]);
      } catch (e) {
        // console.log(e);
      }
    })();
  }, []);

  const inputScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^-0-9]/g, '');
    if (e.target.id === 'myScore') setMyScore(e.target.value);
    else setEnemyScore(e.target.value);
  };

  const submitScoreHandler = async () => {
    const body = { myScore, enemyScore };
    const data = await postData(`/pingpong/games/${1}/result`, body);
    alert(data.message);
  };

  return (
    <div className={styles.background}>
      <div className={styles.moduleContainer}>
        <div className={styles.phrase}>경기가 끝났다면 점수를 입력해주세요.</div>
        <div className={styles.resultContainer}>
          <div className={styles.players}>
            <div className={styles.userInfo}>
              <div className={styles.userImage}></div>
              <div className={styles.userId}>{myInfo.userId}</div>
            </div>
            <div>vs.</div>
            <div className={styles.userInfo}>
              <div className={styles.userImage}></div>
              <div className={styles.userId}>{enemyInfo.userId}</div>
            </div>
          </div>
          <div className={styles.scoreInput}>
            <form name='inputScore'>
              <div>
                <input id='myScore' onChange={inputScoreHandler} maxLength={2} />
              </div>
              <div>:</div>
              <div>
                <input id='enemyScore' onChange={inputScoreHandler} maxLength={2} />
              </div>
            </form>
          </div>
        </div>
        <div className={styles.submitButton}>
          <input type='button' value='제출하기' onClick={submitScoreHandler} />
        </div>
      </div>
    </div>
  );
}
