import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import MatchBoard from './MatchBoard';
import { MatchData } from 'types/matchTypes';
import { matchRefreshBtnState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/match/MatchBoardList.module.scss';

interface MatchBoardListProps {
  type: string;
}

export default function MatchBoardList({ type }: MatchBoardListProps) {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [refreshBtnAnimation, setRefreshBtnAnimation] =
    useState<boolean>(false);
  const setMatchRefreshBtn = useSetRecoilState(matchRefreshBtnState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);

  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMatchDataHandler();
  }, []);

  useEffect(() => {
    currentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [matchData]);

  const getMatchDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/match/tables/${1}/single`);
      setMatchData(res?.data);
    } catch (e) {
      setErrorMessage('SJ01');
    }
  };

  if (!matchData) return null;

  const { matchBoards, intervalMinute } = matchData;
  if (matchBoards.length === 0)
    return (
      <div className={styles.matchAllClosed}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>
    );
  const lastGameTime = matchBoards[matchBoards.length - 1][0].time;
  const lastGameHour = new Date(lastGameTime).getHours();
  const nowHour = new Date().getHours();

  const manualPageHandler = () => {
    setModalInfo({ modalName: 'MATCH-MANUAL' });
  };

  const refreshBtnHandler = () => {
    setRefreshBtnAnimation(true);
    setTimeout(() => {
      setRefreshBtnAnimation(false);
    }, 1000);
    getMatchDataHandler();
    setMatchRefreshBtn(true);
  };

  const getScrollCurrentRef = (slotsHour: number) => {
    if (nowHour === lastGameHour && slotsHour === nowHour) return currentRef;
    if (slotsHour === nowHour + 1) return currentRef;
    return null;
  };

  return (
    <>
      <div className={styles.btnWrap}>
        <button className={styles.mamualBtn} onClick={manualPageHandler}>
          매뉴얼
        </button>
        <button
          className={
            refreshBtnAnimation ? styles.refreshBtnAnimation : styles.refreshBtn
          }
          onClick={refreshBtnHandler}
        >
          &#8635;
        </button>
      </div>
      {nowHour > lastGameHour && (
        <div className={styles.matchAllClosed}>
          ❌ 오늘의 매치가 모두 끝났습니다! ❌
        </div>
      )}
      <div className={styles.matchBoardList}>
        {matchBoards.map((matchSlots, i) => {
          const slotsTime = new Date(matchSlots[0].time);
          return (
            <div
              className={styles.matchBoard}
              key={i}
              ref={getScrollCurrentRef(slotsTime.getHours())}
            >
              <MatchBoard
                key={i}
                type={type}
                intervalMinute={intervalMinute}
                matchSlots={matchSlots}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
