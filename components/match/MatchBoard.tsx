import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Match } from 'types/matchTypes';
import { MatchMode } from 'types/mainType';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState } from 'utils/recoil/match';
import MatchSlotList from './MatchSlotList';
import styles from 'styles/match/MatchBoard.module.scss';

interface MatchBoardProps {
  type: string;
  toggleMode: MatchMode;
}

export default function MatchBoard({ type, toggleMode }: MatchBoardProps) {
  const [match, setMatch] = useState<Match | null>(null);
  const [spinReloadButton, setSpinReloadButton] = useState<boolean>(false);
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReloadMatch(true);
  }, [toggleMode]);

  useEffect(() => {
    currentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [match]);

  useEffect(() => {
    if (reloadMatch) getMatchHandler();
  }, [reloadMatch]);

  const getMatchHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/match/tables/${1}/${toggleMode}/${type}`,
      );
      setMatch(res?.data);
    } catch (e) {
      setError('SJ01');
    }
  };

  if (!match) return null;

  const { matchBoards, intervalMinute } = match;

  if (matchBoards.length === 0)
    return <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>;

  const lastSlotTime = matchBoards[matchBoards.length - 1][0].time;
  const lastSlotHour = new Date(lastSlotTime).getHours();
  const currentHour = new Date().getHours();

  const openManual = () => {
    setModal({ modalName: 'MATCH-MANUAL', manual: { toggleMode: toggleMode } });
  };

  const reloadMatchHandler = () => {
    setSpinReloadButton(true);
    setTimeout(() => {
      setSpinReloadButton(false);
    }, 1000);
    setReloadMatch(true);
  };

  const getScrollCurrentRef = (slotsHour: number) => {
    if (currentHour === lastSlotHour && currentHour === slotsHour)
      return currentRef;
    if (slotsHour === currentHour + 1) return currentRef;
    return null;
  };

  return (
    <div>
      <div className={styles.buttonWrap}>
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
      {currentHour > lastSlotHour && (
        <div className={styles.notice}>
          ❌ 오늘의 매치가 모두 끝났습니다! ❌
        </div>
      )}
      <div className={styles.matchBoard}>
        {matchBoards.map((matchSlots, i) => {
          const slotTime = new Date(matchSlots[0].time);
          return (
            <div
              className={styles.matchSlotList}
              key={i}
              ref={getScrollCurrentRef(slotTime.getHours())}
            >
              <MatchSlotList
                type={type}
                intervalMinute={intervalMinute}
                toggleMode={toggleMode}
                matchSlots={matchSlots}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
