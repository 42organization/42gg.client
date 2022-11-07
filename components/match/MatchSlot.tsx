import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { Slot } from 'types/matchTypes';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { fillZero } from 'utils/handleTime';
import instance from 'utils/axios';
import styles from 'styles/match/MatchSlot.module.scss';

interface MatchSlotProps {
  type: string;
  slot: Slot;
  toggleMode?: MatchMode;
  intervalMinute: number;
}

export default function MatchSlot({
  type,
  slot,
  toggleMode,
  intervalMinute,
}: MatchSlotProps) {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const { event } = useRecoilValue(liveState);
  const { headCount, slotId, status, time, mode } = slot;
  const headMax = type === 'single' ? 2 : 4;
  const startTime = new Date(time);
  const endTime = new Date(time);
  endTime.setMinutes(endTime.getMinutes() + intervalMinute);
  const isAfterSlot: boolean = startTime.getTime() - new Date().getTime() >= 0;
  const buttonStyle: { [key: string]: string } = {
    mytable: toggleMode === mode ? styles.mySlot : styles.disabledSlot,
    close: styles.disabledSlot,
    open: toggleMode === 'rank' ? styles.rankSlot : styles.normalSlot,
  };

  const enrollHandler = async () => {
    if (status === 'mytable') {
      try {
        const res = await instance.get(`/pingpong/match/current`);
        if (res?.data) {
          const { slotId, time, enemyTeam } = res.data;
          setModal({
            modalName: 'MATCH-CANCEL',
            cancel: {
              slotId,
              time,
              enemyTeam,
            },
          });
        }
      } catch (e) {
        setError('JH08');
      }
    } else if (event === 'match') {
      setModal({ modalName: 'MATCH-REJECT' });
    } else {
      setModal({
        modalName: 'MATCH-ENROLL',
        enroll: {
          slotId,
          type,
          mode: toggleMode,
          startTime,
          endTime,
        },
      });
    }
  };

  return (
    <button
      className={buttonStyle[status]}
      disabled={status === 'close'}
      onClick={enrollHandler}
    >
      <span className={styles.time}>
        {minuiteToStr(startTime.getMinutes())} -{' '}
        {minuiteToStr(endTime.getMinutes())}
        {status === 'mytable' && ' 🙋'}
      </span>
      <span className={`${styles.headCount} ${headCount === 0 && styles.plus}`}>
        {isAfterSlot && (headCount === 0 ? '+' : `${headCount}/${headMax}`)}
      </span>
    </button>
  );
}

function minuiteToStr(min: number) {
  return fillZero(min.toString(), 2);
}
