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
        console.log(e);
      }
    })();
  }, []);

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
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMyScore(e.target.value);
              }}
              maxLength={2}
            />
            <div>:</div>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEnemyScore(e.target.value);
                console.log(enemyScore);
              }}
              maxLength={2}
            />
          </div>
        </div>
        <div className={styles.submitButton}>
          <input type='button' value='제출하기' onClick={submitScoreHandler} />
        </div>
      </div>
    </div>
  );
}
