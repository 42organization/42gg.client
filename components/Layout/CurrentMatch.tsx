import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { currentMatchState } from 'utils/recoil/match';
import { gameTimeToString } from 'utils/handleTime';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

import useGetCurrentMatch from 'hooks/Layout/useGetCurrentMatch';
import { CurrentMatchList, CurrentMatchListElement } from 'types/matchTypes';
import { Modal } from 'types/modalTypes';
import { useMemo } from 'react';

export default function CurrentMatch(myCurrentMatch: CurrentMatchListElement) {
  // const currentMatchList = useRecoilValue<CurrentMatchList>(currentMatchState);
  const setModal = useSetRecoilState<Modal>(modalState);

  const blockCancelButton = (myCurrentMatch: CurrentMatchListElement) => {
    return (
      myCurrentMatch &&
      myCurrentMatch.isImminent &&
      myCurrentMatch.enemyTeam.length
    );
  };

  useGetCurrentMatch();

  const onCancel = (startTime: string) => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { startTime: startTime },
    });
  };

  return (
    <>
      <div className={styles.container}>
        {currentMatchList.match.map((currentMatch, index) => (
          <>
            <div
              className={`${styles.stringWrapper} ${
                currentMatchStyle[currentMatchList.match.length]
              }`}
              key={index}
            >
              <div className={styles.icon}>⏰</div>
              <div className={styles.messageWrapper}>
                {currentMatch &&
                  makeMessage(currentMatch.startTime, currentMatch.isMatched)}
                <EnemyTeam
                  enemyTeam={currentMatch.enemyTeam}
                  isImminent={currentMatch.isImminent}
                />
              </div>
            </div>
            <div
              className={
                blockCancelButton(currentMatch)
                  ? `${styles.blockCancelButton} ${
                      currentMatchStyle[currentMatchList.match.length]
                    }`
                  : `${styles.cancelButton} ${
                      currentMatchStyle[currentMatchList.match.length]
                    }`
              }
            >
              <input
                type='button'
                onClick={() => onCancel(currentMatch.startTime)}
                value={
                  blockCancelButton(currentMatch) ? '취소불가' : '취소하기'
                }
              />
            </div>
          </>
        ))}
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
  isImminent: boolean;
}

function EnemyTeam({ enemyTeam, isImminent }: EnemyTeam) {
  if (!isImminent || enemyTeam.length === 0) return <></>;
  const enemyUsers = enemyTeam.map((intraId, index) => (
    <span key={intraId} id={styles.enemyUsers}>
      <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
      {index < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div className={styles.enemyTeam}> 상대팀 : {enemyUsers}</div>;
}
