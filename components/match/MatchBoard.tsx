import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrentMatch, CurrentMatchList, Match, Slot } from 'types/matchTypes';
import { Live } from 'types/mainType';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/match/MatchBoard.module.scss';

import useGetReloadMatchHandler from 'hooks/match/useGetReloadMatchHandler';
import { fillZero } from 'utils/handleTime';
import { currentMatchState } from 'utils/recoil/match';
import { liveState } from 'utils/recoil/layout';
import { Modal } from 'types/modalTypes';
import { NewMatchMode } from 'types/mainType';

import { NewCurrentMatch } from 'types/matchTypes';

interface MatchBoardProps {
  type: string;
  toggleMode: NewMatchMode;
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
        return new Date(matchSlot.startTime).getHours();
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
              ref={getScrollCurrentRef(parseInt(slot.startTime.slice(-8, -6)))}
            >
              {slot.startTime.slice(-5, -3) === '00' && (
                <NewMatchTime key={index} startTime={slot.startTime} />
              )}
              <NewMatchSlot
                key={index - 1}
                toggleMode={toggleMode}
                slot={slot}
              />
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

interface NewMatchTimeProps {
  startTime: string;
}

export const NewMatchTime = ({ startTime }: NewMatchTimeProps) => {
  const slotTime = new Date(startTime);
  const slotHour = slotTime.getHours();
  const slotHourIn12 = ChangeHourFrom24To12(slotHour);

  return (
    <div className={styles.slotHour}>
      {slotHourIn12}
      {slotHourIn12 === '오전  12시' && (
        <div>{`${slotTime.getMonth() + 1}월 ${slotTime.getDate()}일`}</div>
      )}
    </div>
  );
};

interface NewMatchSlotProps {
  toggleMode: NewMatchMode;
  slot: Slot;
}

export const NewMatchSlot = ({ toggleMode, slot }: NewMatchSlotProps) => {
  const setModal = useSetRecoilState<Modal>(modalState);
  const currentMatchList = useRecoilValue<CurrentMatchList>(currentMatchState);
  const { event } = useRecoilValue<Live>(liveState);
  const { startTime, endTime, status } = slot;
  const slotData = `${slot.startTime.slice(-2)} - ${slot.endTime.slice(-2)}`;

  const [myMatch, setMyMatch] = useState<NewCurrentMatch>({
    startTime: '0000-00-00T00:00',
    endTime: '0000-00-00T00:00',
    isMatched: false,
    myTeam: [],
    enemyTeam: [],
    isImminent: false,
  });

  const { match } = currentMatchList;

  const getMyMatch = (match: CurrentMatch[]) => {
    for (const currentMatch of match) {
      if (currentMatch.isMatched) {
        setMyMatch(currentMatch);
      }
    }
  };

  useEffect(() => {
    getMyMatch(match);
  }, [match]);

  const mode = window.location.search.slice(1);

  const enrollhandler = async () => {
    if (status === 'mytable') {
      setModal({
        modalName: 'MATCH-CANCEL',
        cancel: {
          startTime: myMatch.startTime,
          isMatched: myMatch.isMatched,
        },
      });
    } else if (event === 'match') {
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
      mytable: toggleMode === mode ? styles.my : styles.disabled,
      close: styles.disabled,
      open: toggleMode === 'RANK' ? styles.rank : styles.normal,
    }),
    [slot]
  );

  const isAfterSlot: boolean =
    new Date(startTime).getTime() - new Date().getTime() >= 0;

  return (
    <div className={styles.slotGrid}>
      <button
        className={`${styles.slotButton} ${buttonStyle[status]}`}
        disabled={status === 'close'}
        onClick={enrollhandler}
      >
        <span className={styles.time}>
          {slotData === '00 - 00'
            ? `${fillZero(
                parseInt(startTime.slice(-5, -3)).toString(),
                2
              )} - ${fillZero(parseInt(endTime.slice(-5, -3)).toString(), 2)}`
            : slotData}
          {status === 'mytable' && ' 🙋'}
        </span>
        {/* <span>{isAfterSlot && ''}</span> */}
      </button>
    </div>
  );
};
