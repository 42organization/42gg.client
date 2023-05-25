import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrentMatchList, Match, Slot } from 'types/matchTypes';
import { Live, MatchMode } from 'types/mainType';
import { modalState } from 'utils/recoil/modal';
import MatchSlotList from './MatchSlotList';
import styles from 'styles/match/MatchBoard.module.scss';

import useGetReloadMatchHandler from 'hooks/match/useGetReloadMatchHandler';
import { fillZero, gameTimeToString } from 'utils/handleTime';
import { currentMatchState } from 'utils/recoil/match';
import { liveState } from 'utils/recoil/layout';
import { Modal } from 'types/modalTypes';
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

  if (match.length === 0)
    return <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>;

  const openManual = () => {
    setModal({ modalName: 'MATCH-MANUAL', manual: { toggleMode: toggleMode } });
  };

  const getFirstOpenSlot = () => {
    for (let i = 0; i < match.length; i++) {
      const matchSlot = match[i];
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
          {match.map((slot, index) => (
            <div key={index}>
              {slot.startTime.slice(-2) === '00' && (
                <NewMatchTime key={index} startTime={slot.startTime} />
              )}
              <NewMatchSlot key={index} toggleMode={toggleMode} slot={slot} />
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
  toggleMode: MatchMode;
  slot: Slot;
}

export const NewMatchSlot = ({ toggleMode, slot }: NewMatchSlotProps) => {
  const setModal = useSetRecoilState<Modal>(modalState);
  const myMatchList = useRecoilValue<CurrentMatchList>(currentMatchState);
  const { event } = useRecoilValue<Live>(liveState);
  const { startTime, endTime, status } = slot;
  const slotData = `${slot.startTime.slice(-2)} - ${slot.endTime.slice(-2)}`;

  const getMyMatch = (myMatchList: CurrentMatchList) => {
    for (const myMatch of myMatchList) {
      if (myMatch.isMatched === true) {
        return myMatch;
      }
    }
    return myMatchList[0];
  };

  const mode = window.location.search.slice(1);

  const myMatch = getMyMatch(myMatchList);

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
      open: toggleMode === 'rank' ? styles.rank : styles.normal,
    }),
    [slot]
  );

  const isAfterSlot: boolean =
    new Date(startTime).getTime() - new Date().getTime() >= 0;

  return (
    <button
      className={`${styles.slotButton} ${buttonStyle[status]}`}
      disabled={status === 'close'}
      onClick={enrollhandler}
    >
      <span>
        {slotData === '00 - 00'
          ? `${fillZero(
              (parseInt(startTime.slice(-5, -3)) % 12).toString(),
              2
            )}:00 - ${fillZero(
              (parseInt(endTime.slice(-5, -3)) % 12).toString(),
              2
            )}:00`
          : slotData}
        {status === 'mytable' && ' 🙋'}
      </span>
      <span>{isAfterSlot && 'undefined'}</span>
    </button>
  );
};

// export default function MatchBoard({ type, toggleMode }: MatchBoardProps) {
//   const [match, setMatch] = useState<Match | null>(null);
//   const [spinReloadButton, setSpinReloadButton] = useState<boolean>(false);
//   const setModal = useSetRecoilState(modalState);
//   const currentRef = useRef<HTMLDivElement>(null);

//   const reloadMatchHandler = useGetReloadMatchHandler({
//     setMatch,
//     setSpinReloadButton,
//     type,
//     toggleMode,
//   });

//   useEffect(() => {
//     currentRef.current?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'center',
//     });
//   }, [match]);

//   if (!match) return null;

//   const { matchBoards } = match;

//   if (matchBoards.length === 0)
//     return <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>;

//   const openManual = () => {
//     setModal({ modalName: 'MATCH-MANUAL', manual: { toggleMode: toggleMode } });
//   };

//   const getFirstOpenSlot = () => {
//     for (let i = 0; i < matchBoards.length; i++) {
//       for (let j = 0; j < matchBoards[i].length; j++) {
//         const match = matchBoards[i][j];
//         if (match.status === 'open') {
//           return new Date(match.time).getHours();
//         }
//       }
//     }
//     return null;
//   };

//   const getScrollCurrentRef = (slotsHour: number) => {
//     if (getFirstOpenSlot() === slotsHour) {
//       return currentRef;
//     }
//     return null;
//   };

//   return (
//     <>
//       <div>
//         <div className={styles.buttonWrap}>
//           {getFirstOpenSlot() === null && (
//             <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>
//           )}
//           <button className={styles.manual} onClick={openManual}>
//             매뉴얼
//           </button>
//           <button
//             className={`${styles.reload} ${spinReloadButton && styles.spin}`}
//             onClick={reloadMatchHandler}
//           >
//             &#8635;
//           </button>
//         </div>
//         <div className={styles.matchBoard}>
//           {matchBoards.map((matchSlots, index) => {
//             const slotTime = new Date(matchSlots[0].time);
//             return (
//               <div
//                 className={styles.matchSlotList}
//                 key={index}
//                 ref={getScrollCurrentRef(slotTime.getHours())}
//               >
//                 <MatchSlotList
//                   type={type}
//                   toggleMode={toggleMode}
//                   matchSlots={matchSlots}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }
