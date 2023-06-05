import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrentMatchList, Match, Slot } from 'types/matchTypes';
import { Live } from 'types/mainType';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/match/MatchBoard.module.scss';

import useGetReloadMatchHandler from 'hooks/match/useGetReloadMatchHandler';
import { stringToHourMin } from 'utils/handleTime';
import { liveState } from 'utils/recoil/layout';
import { Modal } from 'types/modalTypes';
import { MatchMode } from 'types/mainType';
import { currentMatchState } from 'utils/recoil/match';

interface MatchBoardProps {
  type: string;
  toggleMode: MatchMode;
}

export default function MatchBoard({ type, toggleMode }: MatchBoardProps) {
  const [match, setMatch] = useState<Match | null>(null);
  const [spinReloadButton, setSpinReloadButton] = useState<boolean>(false);
  const setModal = useSetRecoilState(modalState);
  const currentRef = useRef<HTMLDivElement>(null);

  const reloadMatchHandler = useGetReloadMatchHandler({
    setMatch,
    setSpinReloadButton,
    type,
    toggleMode,
  });

  useEffect(() => {
    currentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [match]);

  if (!match) return null;

  const { matchBoards } = match;

  if (matchBoards.length === 0)
    return <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>;

  const openManual = () => {
    setModal({ modalName: 'MATCH-MANUAL', manual: { toggleMode: toggleMode } });
  };

  const getFirstOpenSlot = () => {
    for (let i = 0; i < matchBoards.length; i++) {
      const matchSlot = matchBoards[i];
      if (matchSlot.status === 'open') {
        return stringToHourMin(matchSlot.startTime).nHour;
      }
    }
    return null;
  };

  const getScrollCurrentRef = (slotsHour: number) => {
    if (getFirstOpenSlot() === slotsHour) {
      return currentRef;
    }
    return null;
  };

  return (
    <>
      <div>
        <div className={styles.buttonWrap}>
          {getFirstOpenSlot() === null && (
            <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>
          )}
          <button className={styles.manual} onClick={openManual}>
            매뉴얼
          </button>
          <button
            className={`${styles.reload} ${spinReloadButton && styles.spin}`}
            onClick={reloadMatchHandler}
          >
            &#8635;
          </button>
        </div>
        <div className={styles.matchBoard}>
          {matchBoards.map((slot, index) => (
            <div
              key={index}
              ref={getScrollCurrentRef(stringToHourMin(slot.startTime).nHour)}
            >
              {stringToHourMin(slot.startTime).sMin === '00' && (
                <MatchTime key={index} startTime={slot.startTime} />
              )}
              <MatchSlot key={index - 1} toggleMode={toggleMode} slot={slot} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ChangeHourFrom24To12(hour: number) {
  return `${hour < 12 ? '오전 ' : '오후 '} ${
    hour % 12 === 0 ? 12 : hour % 12
  }시`;
}

interface MatchTimeProps {
  startTime: string;
}

export const MatchTime = ({ startTime }: MatchTimeProps) => {
  const slotTime = new Date(startTime);
  const slotHourIn12 = ChangeHourFrom24To12(slotTime.getHours());

  return (
    <div className={styles.slotHour}>
      {slotHourIn12}
      {slotHourIn12 === '오전  12시' && (
        <div>{`${slotTime.getMonth() + 1}월 ${slotTime.getDate()}일`}</div>
      )}
    </div>
  );
};

interface MatchSlotProps {
  toggleMode: MatchMode;
  slot: Slot;
}

export const MatchSlot = ({ toggleMode, slot }: MatchSlotProps) => {
  const setModal = useSetRecoilState<Modal>(modalState);
  const { event } = useRecoilValue<Live>(liveState);
  const { match } = useRecoilValue<CurrentMatchList>(currentMatchState);
  const { startTime, endTime, status } = slot;
  const slotData = `${stringToHourMin(startTime).sMin} - ${
    stringToHourMin(endTime).sMin
  }`;

  const enrollhandler = async () => {
    if (status === 'mytable') {
      setModal({
        modalName: 'MATCH-CANCEL',
        cancel: {
          startTime: startTime,
        },
      });
    } else if (event === 'match' && match.length === 3) {
      setModal({ modalName: 'MATCH-REJECT' });
    } else {
      setModal({
        modalName: 'MATCH-ENROLL',
        enroll: {
          startTime: startTime,
          endTime: endTime,
          mode: toggleMode,
        },
      });
    }
  };

  const buttonStyle: { [key: string]: string } = useMemo(
    () => ({
      mytable: status === 'mytable' ? styles.mytable : styles.disabled,
      close: styles.disabled,
      // event === 'match' && match[0].startTime === startTime
      //   ? styles.mytable
      //   : styles.disabled, // 나의 매칭 경기가 close일 때 mytable 상태 표시
      open: toggleMode === 'RANK' ? styles.rank : styles.normal,
      match: toggleMode === 'RANK' ? styles.rank : styles.normal,
    }),
    [slot]
  );

  // const isDisabled =
  //   status === 'close' &&
  //   !(event === 'match' && match[0].startTime === startTime)
  //     ? true
  //     : false; // 나의 매칭 경기가 close일 때 disabled 안 되게

  const isAfterSlot: boolean =
    new Date(startTime).getTime() - new Date().getTime() >= 0;

  const headCount =
    status === 'close' ? 2 : status === 'mytable' || status === 'match' ? 1 : 0;

  return (
    <div className={styles.slotGrid}>
      <button
        className={`${styles.slotButton} ${buttonStyle[status]}`}
        // disabled={isDisabled}
        disabled={status === 'close'}
        onClick={enrollhandler}
      >
        <span className={styles.time}>
          {slotData === '00 - 00'
            ? `${stringToHourMin(startTime).sMin} - ${
                stringToHourMin(endTime).sMin
              }`
            : slotData}
          {status === 'mytable' && ' 🙋'}
        </span>
        <span
          className={`${styles.headCount} ${headCount === 0 && styles.plus}`}
        >
          {isAfterSlot && (headCount === 0 ? '+' : `${headCount}/2`)}
        </span>
      </button>
    </div>
  );
};
