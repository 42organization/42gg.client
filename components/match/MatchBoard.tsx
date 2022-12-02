import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Match } from 'types/matchTypes';
import { MatchMode } from 'types/mainType';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState, showModeWrapState } from 'utils/recoil/match';
import MatchSlotList from './MatchSlotList';
import styles from 'styles/match/MatchBoard.module.scss';

interface MatchBoardProps {
  type: string;
  checkBoxMode: MatchMode;
}

export default function MatchBoard({ type, checkBoxMode }: MatchBoardProps) {
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const setShowModeWrap = useSetRecoilState(showModeWrapState);
  const [match, setMatch] = useState<Match | null>(null);
  const [spinReloadButton, setSpinReloadButton] = useState<boolean>(false);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    setReloadMatch(true);
  }, [checkBoxMode]);

  useEffect(() => {
    if (reloadMatch) getMatchHandler();
  }, [reloadMatch]);

  const getMatchHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/match/tables/${1}/${checkBoxMode}/${type}`
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
  else setShowModeWrap(true);

  const openManual = () => {
    setModal({
      modalName: 'MATCH-MANUAL',
    });
  };

  const reloadMatchHandler = () => {
    setSpinReloadButton(true);
    setTimeout(() => {
      setSpinReloadButton(false);
    }, 1000);
    setReloadMatch(true);
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
      <div className={styles.matchBoard}>
        {matchBoards.map((matchSlots, index) => {
          return (
            <div className={styles.matchSlotList} key={index}>
              <MatchSlotList
                type={type}
                checkBoxMode={checkBoxMode}
                matchSlots={matchSlots}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
