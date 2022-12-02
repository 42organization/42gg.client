import React, { useMemo, useRef, useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { Slot } from 'types/matchTypes';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import { currentMatchState, reloadMatchState } from 'utils/recoil/match';
import instance from 'utils/axios';
import styles from 'styles/match/MatchSlot.module.scss';

interface MatchSlotProps {
  type: string;
  slot: Slot;
  checkBoxMode?: MatchMode;
  scrollTargetId: number;
}

function MatchSlot({
  type,
  slot,
  checkBoxMode,
  scrollTargetId,
}: MatchSlotProps) {
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const currentRef = useRef<HTMLButtonElement>(null);
  const [currentMatch] = useRecoilState(currentMatchState);
  const setError = useSetRecoilState(errorState);
  const { event } = useRecoilValue(liveState);
  const { headCount, slotId, status, mode } = slot;
  const headMax = type === 'single' ? 2 : 4;
  const buttonStyle: { [key: string]: string } = useMemo(
    () => ({
      mytable: checkBoxMode === mode ? styles.my : styles.disabled,
      close: styles.disabled,
      open: checkBoxMode === 'rank' ? styles.rank : styles.normal,
    }),
    [slot]
  );

  useEffect(() => {
    currentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const challengeSlotEnroll = async () => {
    const challengeSlotEnrollResponse: { [key: string]: string } = {
      E0001: '경기 등록에 실패하였습니다.',
    };
    try {
      const body = { slotId: slotId, mode: 'challenge', opponent: null };
      await instance.post(`/pingpong/match/tables/${1}/${type}`, body);
      setModal({
        modalName: 'MATCH-CHALLENGE',
        challenge: {
          slotId,
          type,
        },
      });
    } catch (e: any) {
      if (e.response.data.code in challengeSlotEnrollResponse) {
        alert(challengeSlotEnrollResponse[e.response.data.code]);
      } else {
        setModal({ modalName: null });
        setError('RJ03');
        return;
      }
      setReloadMatch(true);
    }
  };

  const enrollHandler = async () => {
    if (status === 'mytable') {
      setModal({
        modalName: 'MATCH-CANCEL',
        cancel: {
          slotId: currentMatch.slotId,
        },
      });
    } else if (event === 'match') {
      setModal({ modalName: 'MATCH-REJECT' });
    } else if (checkBoxMode === 'challenge') {
      await challengeSlotEnroll();
    } else {
      setModal({
        modalName: 'MATCH-ENROLL',
        enroll: {
          slotId,
          type,
          mode: checkBoxMode,
        },
      });
    }
  };

  return (
    <button
      id={slotId.toString()}
      className={`${styles.slotButton} ${buttonStyle[status]}`}
      disabled={status === 'close'}
      onClick={enrollHandler}
      ref={scrollTargetId === slot.slotId ? currentRef : null}
    >
      <span className={styles.slotId}>
        {slotId}
        {status === 'mytable' && ' 🙋'}
      </span>
      <span className={`${styles.headCount} ${headCount === 0 && styles.plus}`}>
        {headCount === 0 ? '+' : `${headCount}/${headMax}`}
      </span>
    </button>
  );
}

export default React.memo(MatchSlot);
