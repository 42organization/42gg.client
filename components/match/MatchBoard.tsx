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
      block: 'center',
    });
  }, [match]);

  useEffect(() => {
    if (reloadMatch) getMatchHandler();
  }, [reloadMatch]);

  const getMatchHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/match/tables/${1}/${toggleMode}/${type}`
      );
      setMatch(res?.data);
    } catch (e) {
      setError('SJ01');
    }
  };

  if (!match) return null;

  const { matchBoards } = match;

  if (matchBoards.length === 0)
    return <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>;

  const openManual = () => {
    setModal({ modalName: 'MATCH-MANUAL', manual: { toggleMode: toggleMode } });
  };

  const getFirstOpenSlot = () => {
    for (let i = 0; i < matchBoards.length; i++) {
      for (let j = 0; j < matchBoards[i].length; j++) {
        const match = matchBoards[i][j];
        if (match.status === 'open') {
          return new Date(match.time).getHours();
        }
      }
    }
    return null;
  };

  const reloadMatchHandler = () => {
    setSpinReloadButton(true);
    setTimeout(() => {
      setSpinReloadButton(false);
    }, 1000);
    setReloadMatch(true);
  };

  const getScrollCurrentRef = (slotsHour: number) => {
    if (getFirstOpenSlot() === slotsHour) return currentRef;
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
          {matchBoards.map((matchSlots, index) => {
            const slotTime = new Date(matchSlots[0].time);
            return (
              <div
                className={styles.matchSlotList}
                key={index}
                ref={getScrollCurrentRef(slotTime.getHours())}
              >
                <MatchSlotList
                  type={type}
                  toggleMode={toggleMode}
                  matchSlots={matchSlots}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
