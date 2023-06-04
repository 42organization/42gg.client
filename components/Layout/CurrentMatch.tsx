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

export default function CurrentMatch() {
  const currentMatchList =
    useRecoilValue<CurrentMatchList>(currentMatchState).match;
  const [showCurrentMatch, setShowCurrentMatch] = useState<boolean>(false);

  useGetCurrentMatch();

  return (
    <div className={styles.banner}>
      <div className={styles.openCurrentMatch}>
        {currentMatchList.length > 1 && (
          <button
            className={styles.openCurrentMatchBtn}
            onClick={() => setShowCurrentMatch(!showCurrentMatch)}
          >
            {showCurrentMatch ? '닫기' : '더보기'}
          </button>
        )}
      </div>
      <CurrentMatchMain showDropDown={showCurrentMatch} />
    </div>
  );
}

interface CurrentMatchMainProp {
  showDropDown: boolean;
}

function CurrentMatchMain(prop: CurrentMatchMainProp) {
  const { showDropDown } = prop;
  const currentMatchList =
    useRecoilValue<CurrentMatchList>(currentMatchState).match;

  return showDropDown ? (
    <div className={styles.currentMatchMainDropDown}>
      {currentMatchList.map((currentMatch, index) => (
        <CurrentMatchContent key={index} currentMatch={currentMatch} />
      ))}
    </div>
  ) : (
    <div className={styles.currentMatchMainOne}>
      <CurrentMatchContent currentMatch={currentMatchList[0]} />
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
  const blockCancelButton: number | false = isImminent && enemyTeam.length;

  const onCancel = (startTime: string) => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { startTime: startTime },
    });
  };

  return (
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
        {blockCancelButton ? '경기 취소 불가' : '경기 예약 취소'}
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
