import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MatchData } from 'types/matchTypes';
import { matchRefreshBtnState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import MatchBoard from './MatchBoard';
import styles from 'styles/match/MatchBoardList.module.scss';
import { matchModalState } from 'utils/recoil/match';

interface MatchBoardListProps {
  type: string;
}

export default function MatchBoardList({ type }: MatchBoardListProps) {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const setMatchRefreshBtn = useSetRecoilState(matchRefreshBtnState);
  const setErrorMessage = useSetRecoilState(errorState);
  const currentRef = useRef<HTMLDivElement>(null);
  const setMatchModal = useSetRecoilState(matchModalState);
  const [refreshBtnAnimation, setRefreshBtnAnimation] =
    useState<boolean>(false);
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

  const manualPageHandler = () => {
    setMatchModal('manual');
  };

  const refreshBtnHandler = () => {
    setRefreshBtnAnimation(true);
    setTimeout(() => {
      setRefreshBtnAnimation(false);
    }, 1000);
    getMatchDataHandler();
    setMatchRefreshBtn(true);
  };

  if (matchBoards.length === 0)
    return (
      <div className={styles.matchAllClosed}>
        오늘의 매치가 모두 끝났습니다!
      </div>
    );

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
      <div className={styles.matchBoardList}>
        {matchBoards.map((matchSlots, i) => {
          const slotsTime = new Date(matchSlots[0].time);
          return (
            <div
              className={styles.matchBoard}
              key={i}
              ref={
                slotsTime.getHours() === new Date().getHours() + 1
                  ? currentRef
                  : null
              }
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
