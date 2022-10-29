import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Slot } from 'types/matchTypes';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { fillZero } from 'utils/handleTime';
import instance from 'utils/axios';
import styles from 'styles/match/MatchSlot.module.scss';

interface MatchSlotProps {
  type: string;
  mode?: string;
  slot: Slot;
  intervalMinute: number;
}

export default function MatchItem({
  type,
  mode,
  slot,
  intervalMinute,
}: MatchSlotProps) {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const live = useRecoilValue(liveState);

  const { headCount, slotId, status, time } = slot;
  const headMax = type === 'single' ? 2 : 4;
  const startTime = new Date(time);
  const endTime = new Date(time);
  endTime.setMinutes(endTime.getMinutes() + intervalMinute);
  const isAfterSlot: boolean = startTime.getTime() - new Date().getTime() >= 0;
  let buttonStyle;

  const enrollHandler = async () => {
    if (status === 'mytable') {
      try {
        const res = await instance.get(`/pingpong/match/current`);
        if (res?.data) {
          const { slotId, time, enemyTeam } = res.data;
          setModal({
            modalName: 'MATCH-CANCEL',
            cancelInfo: { slotId, time, enemyTeam },
          });
        }
      } catch (e) {
        setError('JH08');
      }
    } else if (live.event === 'match') {
      setModal({ modalName: 'MATCH-REJECT' });
    } else {
      setModal({
        modalName: 'MATCH-ENROLL',
        enrollInfo: { slotId, type, mode, startTime, endTime },
      });
    }
  };

  if (status === 'mytable') {
    buttonStyle = styles.mySlot;
  } else if (status === 'open') {
    if (mode === 'rank') buttonStyle = styles.rankSlot;
    if (mode === 'normal') buttonStyle = styles.normalSlot;
  } else if (status === 'close') {
    buttonStyle = styles.disabledSlot;
  }

  return (
    <button
      className={buttonStyle}
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
