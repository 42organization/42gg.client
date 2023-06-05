import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { stringToHourMin } from 'utils/handleTime';
import useGetCurrentMatch from 'hooks/Layout/useGetCurrentMatch';
import { currentMatchState } from 'utils/recoil/match';
import { CurrentMatchList, CurrentMatchListElement } from 'types/matchTypes';
import { Modal } from 'types/modalTypes';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

export default function CurrentMatch() {
  const currentMatchList =
    useRecoilValue<CurrentMatchList>(currentMatchState).match;
  const [showCurrentMatch, setShowCurrentMatch] = useState<boolean>(false);

  useGetCurrentMatch();

  return (
    <button
      className={styles.currentMatchBanner}
      onClick={() => setShowCurrentMatch(!showCurrentMatch)}
      disabled={currentMatchList.length === 1 ? true : false}
    >
      <CurrentMatchMain showDropdown={showCurrentMatch} />
    </button>
  );
}

interface CurrentMatchMainProp {
  showDropdown: boolean;
}

function CurrentMatchMain(prop: CurrentMatchMainProp) {
  const { showDropdown } = prop;
  const currentMatchList =
    useRecoilValue<CurrentMatchList>(currentMatchState).match;

  return (
    <div className={styles.currentMatchMain}>
      {showDropdown ? (
        currentMatchList.map((currentMatch, index) => (
          <CurrentMatchContent key={index} currentMatch={currentMatch} />
        ))
      ) : (
        <CurrentMatchContent currentMatch={currentMatchList[0]} />
      )}
    </div>
  );
}

interface CurrentMatchContentProp {
  currentMatch: CurrentMatchListElement;
}

function CurrentMatchContent(prop: CurrentMatchContentProp) {
  const { currentMatch } = prop;
  const { startTime, isMatched, enemyTeam, isImminent } = currentMatch;
  const setModal = useSetRecoilState<Modal>(modalState);
  const cancelButtonStyle =
    isImminent && enemyTeam.length ? styles.block : styles.nonBlock;

  const onCancel = (startTime: string) => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { startTime: startTime },
    });
  };

  return (
    <div className={styles.currentMatchContent}>
      <div className={styles.icon}>
        <div>
          <Image
            src='/image/loudspeaker.webp'
            alt='loudspeaker'
            width={25}
            height={25}
          />
        </div>
      </div>
      <div className={styles.messageWrapper}>
        {makeMessage(startTime, isMatched)}
        <EnemyTeam enemyTeam={enemyTeam} isImminent={isImminent} />
      </div>
      <button
        className={`${styles.cancelButton} ${cancelButtonStyle}`}
        onClick={(event) => {
          event.stopPropagation();
          onCancel(startTime);
        }}
      >
        {cancelButtonStyle === styles.block
          ? '경기 취소 불가'
          : '경기 예약 취소'}
      </button>
    </div>
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
            <span>&nbsp;참가자 기다리는 중</span>
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
