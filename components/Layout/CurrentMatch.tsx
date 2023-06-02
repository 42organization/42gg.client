import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { stringToHourMin } from 'utils/handleTime';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

import useGetCurrentMatch from 'hooks/Layout/useGetCurrentMatch';
import { CurrentMatchList, CurrentMatchListElement } from 'types/matchTypes';
import { Modal } from 'types/modalTypes';

import { MdCampaign } from 'react-icons/md';
import { currentMatchState } from 'utils/recoil/match';
import { useState } from 'react';

interface CurrentMatchProp {
  currentMatch: CurrentMatchListElement;
}

export default function CurrentMatch() {
  const currentMatchList =
    useRecoilValue<CurrentMatchList>(currentMatchState).match;
  const [showCurrentMatch, setShowCurrentMatch] = useState<boolean>(false);

  useGetCurrentMatch();

  const currentMatchFirstItem = currentMatchList[0];
  const currentMatchDropDown = currentMatchList.slice(1);

  return (
    <div className={styles.banner}>
      <div className={styles.openCurrentMatch}>
        {currentMatchList.length > 1 && (
          <button
            className={styles.openCurrentMatchBtn}
            onClick={() => setShowCurrentMatch(!showCurrentMatch)}
          >
            더보기
          </button>
        )}
      </div>
      <div className={styles.currentMatchContainer}>
        <CurrentMatchContent currentMatch={currentMatchFirstItem} />
        {showCurrentMatch &&
          currentMatchDropDown.map((currentMatch, index) => (
            <CurrentMatchContent key={index} currentMatch={currentMatch} />
          ))}
      </div>
    </div>
  );
}

function CurrentMatchContent(prop: CurrentMatchProp) {
  const { currentMatch } = prop;
  const { startTime, isMatched, enemyTeam, isImminent } = currentMatch;
  const setModal = useSetRecoilState<Modal>(modalState);
  const blockCancelButton: number | false = isImminent && enemyTeam.length;

  const onCancel = (startTime: string) => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { startTime: startTime },
    });
  };

  return (
    <>
      <div className={styles.stringWrapper}>
        <div className={styles.icon}>
          <MdCampaign />
        </div>
        <div className={styles.messageWrapper}>
          {makeMessage(startTime, isMatched)}
          <EnemyTeam enemyTeam={enemyTeam} isImminent={isImminent} />
        </div>
        <button
          className={
            blockCancelButton ? styles.blockCancelButton : styles.cancelButton
          }
          onClick={() => onCancel(startTime)}
        >
          {blockCancelButton ? '취소불가' : '취소하기'}
        </button>
      </div>
    </>
  );
}

function makeMessage(time: string, isMatched: boolean) {
  const formattedTime = `${stringToHourMin(time).sHour}시 ${
    stringToHourMin(time).sMin
  }분`;
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
