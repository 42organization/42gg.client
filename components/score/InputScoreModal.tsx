import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../utils/axios';
import { PlayerData } from '../../types/scoreTypes';
import styles from '../../styles/InputScoreModal.module.scss';

type GameProps = {
  gameId: string;
};

export default function InputScoreModal({ gameId }: GameProps) {
  const [myInfo, setMyInfo] = useState<PlayerData>({ userId: '', userImageUri: '' });
  const [enemyInfo, setEnemyInfo] = useState<PlayerData>({ userId: '', userImageUri: '' });
  const [myScore, setMyScore] = useState<string>('');
  const [enemyScore, setEnemyScore] = useState<string>('');
  const [onCheck, setOnCheck] = useState<boolean>(false);

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

  const onCheckHandler = () => {
    if (myScore && enemyScore) {
      if (onCheck) {
        setMyScore('');
        setEnemyScore('');
      }
      setOnCheck(!onCheck);
    }
  };

  const submitResultHandler = async () => {
    const body = { myScore, enemyScore };
    const res = await postData(`/pingpong/games/[gameId]/result`, body);
    if (res == 201) {
      // window.location.href = '/';
      console.log('결과 입력이 완료되었습니다.');
    } else if (res == 202) {
      //모달 띄우기
      console.log('결과가 입력된 게임입니다.');
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.phrase}>{onCheck ? '경기 결과' : '경기가 끝났다면 점수를 입력해주세요.'}</div>
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
          {onCheck ? (
            <div className={styles.finalScore}>
              <div>{myScore}</div>
              <div>:</div>
              <div>{enemyScore}</div>
            </div>
          ) : (
            <div className={styles.finalScore}>
              <div>
                <input id='myScore' onChange={inputScoreHandler} maxLength={2} />
              </div>
              <div>:</div>
              <div>
                <input id='enemyScore' onChange={inputScoreHandler} maxLength={2} />
              </div>
            </div>
          )}
        </div>
        {onCheck ? (
          <div className={styles.submitButton}>
            <input type='button' value='다시 입력하기' onClick={onCheckHandler} style={{ background: 'white', color: 'black' }} />
            <input type='button' value='제출하기' onClick={submitResultHandler} />
          </div>
        ) : (
          <div className={styles.submitButton}>
            <input type='button' value='확인' onClick={onCheckHandler} />
          </div>
        )}
      </div>
    </div>
  );
}
