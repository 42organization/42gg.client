import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState, currentMatchState } from 'utils/recoil/match';
import { gameTimeToString, isBeforeMin } from 'utils/handleTime';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

export default function CurrentMatch() {
  const [{ isMatched, enemyTeam, time, slotId }, setCurrentMatch] =
    useRecoilState(currentMatchState);
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  const matchingMessage = time && makeMessage(time, isMatched);
  const blockCancelButton = isBeforeMin(time, 5) && enemyTeam.length;
  const presentPath = useRouter().asPath;

  useEffect(() => {
    getCurrentMatchHandler();
    if (reloadMatch) setReloadMatch(false);
  }, [presentPath, reloadMatch]);

  const getCurrentMatchHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/match/current`);
      setCurrentMatch(res?.data);
    } catch (e) {
      setError('JB01');
    }
  };

  const onCancel = () => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { slotId, time },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.stringWrapper}>
          <div className={styles.icon}> ⏰ </div>
          <div className={styles.messageWrapper}>
            {matchingMessage}
            <EnemyTeam enemyTeam={enemyTeam} time={time} />
          </div>
        </div>
        <div
          className={
            blockCancelButton ? styles.blockCancelButton : styles.cancelButton
          }
        >
          <input
            type='button'
            onClick={onCancel}
            value={blockCancelButton ? '취소불가' : '취소하기'}
          />
        </div>
      </div>
    </>
  );
}

function makeMessage(time: string, isMatched: boolean) {
  const formattedTime = gameTimeToString(time);
  return (
    <div className={styles.message}>
      <span>{formattedTime}</span>
      <span>
        {isMatched ? (
          '에 경기가 시작됩니다!'
        ) : (
          <>
            <span> 참가자 기다리는 중</span>
            <span className={styles.waitUpDown}>
              <span className={styles.span1}>.</span>
              <span className={styles.span2}>.</span>
              <span className={styles.span3}>.</span>
            </span>
          </>
        )}
      </span>
    </div>
  );
}
interface EnemyTeam {
  enemyTeam: string[];
  time: string;
}

function EnemyTeam({ enemyTeam, time }: EnemyTeam) {
  if (!isBeforeMin(time, 5) || enemyTeam.length === 0) return <></>;
  const enemyUsers = enemyTeam.map((intraId, i) => (
    <span key={intraId} id={styles.enemyUsers}>
      <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
      {i < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div className={styles.enemyTeam}> 상대팀 : {enemyUsers}</div>;
}
