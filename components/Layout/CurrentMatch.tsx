import Link from 'next/link';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { stringToHourMin } from 'utils/handleTime';
import useGetCurrentMatch from 'hooks/Layout/useGetCurrentMatch';
import { currentMatchState } from 'utils/recoil/match';
import { CurrentMatchList, CurrentMatchListElement } from 'types/matchTypes';
import { Modal } from 'types/modalTypes';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';
import { TbMenu } from 'react-icons/tb';

export default function CurrentMatch() {
  const currentMatchList =
    useRecoilValue<CurrentMatchList>(currentMatchState).match;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useGetCurrentMatch();

  const dropdownStyle = showDropdown
    ? styles.visibleDropdown
    : styles.hiddenDropdown;

  const [dropdownAnimation, setDropdownAnimation] = useState(false);

  useEffect(() => {
    if (showDropdown) {
      setDropdownAnimation(true);
    } else {
      setTimeout(() => {
        setDropdownAnimation(false);
      }, 400);
    }
  }, [showDropdown]);

  return (
    <div className={styles.currentMatchBanner}>
      <div className={styles.currentMatchMain}>
        <CurrentMatchContent
          currentMatch={currentMatchList[0]}
          index={0}
          setShowDropdown={setShowDropdown}
        />
      </div>
      <div className={`${styles.dropdownWrapper} ${dropdownStyle}`}>
        {dropdownAnimation && (
          <div className={styles.dropdown}>
            {currentMatchList.slice(1).map((currentMatch, index) => (
              <CurrentMatchContent
                key={index}
                currentMatch={currentMatch}
                index={index + 2}
                setShowDropdown={setShowDropdown}
              />
            ))}
          </div>
        )}
        {!dropdownAnimation && currentMatchList.length > 1 ? (
          <button
            className={styles.dropdownButton}
            disabled={currentMatchList.length === 1 ? true : false}
            onMouseDown={() => setShowDropdown(true)}
          >
            <TbMenu />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

interface CurrentMatchContentProp {
  currentMatch: CurrentMatchListElement;
  index: number;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
}

function CurrentMatchContent(prop: CurrentMatchContentProp) {
  const { currentMatch, index, setShowDropdown } = prop;
  const { startTime, isMatched, enemyTeam, isImminent } = currentMatch;

  const currentMatchList =
    useRecoilValue<CurrentMatchList>(currentMatchState).match;

  const setModal = useSetRecoilState<Modal>(modalState);
  const cancelButtonStyle =
    isImminent && enemyTeam.length ? styles.block : styles.nonBlock;

  const onCancel = (startTime: string) => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { startTime: startTime },
    });
  };

  const currentMatchContentStyle = index
    ? styles.middle
    : currentMatchList.length > 1
    ? styles.mainMore
    : styles.mainOne;

  return (
    <>
      <div
        className={`${styles.currentMatchContent} ${currentMatchContentStyle}`}
      >
        <div className={styles.icon}>
          <div>
            <Image
              src='/image/loudspeaker.png'
              alt='loudspeaker'
              width={15}
              height={15}
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
      {currentMatchList.length > 1 && index === currentMatchList.length && (
        <button
          className={styles.dropdownButton}
          disabled={currentMatchList.length === 1 ? true : false}
          onClick={() => setShowDropdown(false)}
        >
          <TbMenu />
        </button>
      )}
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
