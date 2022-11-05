import { useRecoilState, useSetRecoilState } from 'recoil';
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
  toggleMode?: string;
  intervalMinute: number;
  getMatchHandler: () => void;
}

export default function MatchSlot({
  type,
  slot,
  toggleMode,
  intervalMinute,
  getMatchHandler,
}: MatchSlotProps) {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const [live, setLive] = useRecoilState(liveState);

  const { headCount, slotId, status, time, mode } = slot;
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
            cancelInfo: {
              slotId,
              time,
              enemyTeam,
              reload: { getMatchHandler, getLiveHandler },
            },
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
        enrollInfo: {
          slotId,
          type,
          mode: toggleMode,
          startTime,
          endTime,
          reload: { getMatchHandler, getLiveHandler },
        },
      });
    }
  };

  const getLiveHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setLive({ ...res?.data });
    } catch (e) {
      setError('JB03');
    }
  };

  if (status === 'mytable') {
    if (toggleMode === mode) buttonStyle = styles.mySlot;
    else buttonStyle = styles.disabledSlot;
  } else if (status === 'open') {
    toggleMode === 'rank'
      ? (buttonStyle = styles.rankSlot)
      : (buttonStyle = styles.normalSlot);
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
