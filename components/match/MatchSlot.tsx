import { useRecoilValue, useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { Slot } from 'types/matchTypes';
import { fillZero } from 'utils/handleTime';
import instance from 'utils/axios';
import styles from 'styles/match/MatchSlot.module.scss';

interface MatchSlotProps {
  type: string;
  slot: Slot;
  intervalMinute: number;
}

export default function MatchItem({
  type,
  slot,
  intervalMinute,
}: MatchSlotProps) {
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);
  const userLive = useRecoilValue(liveState);

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
          setModalInfo({
            modalName: 'MATCH-CANCEL',
            cancelInfo: { slotId, time, enemyTeam },
          });
        }
      } catch (e) {
        setErrorMessage('JH08');
      }
    } else if (userLive.event === 'match') {
      setModalInfo({ modalName: 'MATCH-REJECT' });
    } else {
      setModalInfo({
        modalName: 'MATCH-ENROLL',
        enrollInfo: { slotId, type, startTime, endTime },
      });
    }
  };

  if (status === 'mytable') {
    buttonStyle = styles.myButton;
  } else if (status === 'open') {
    buttonStyle = styles.enabledButton;
  } else if (status === 'close') {
    buttonStyle = styles.disabledButton;
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
