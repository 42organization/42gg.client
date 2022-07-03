import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Slot, EnrollInfo } from 'types/matchTypes';
import {
  cancelModalState,
  enrollInfoState,
  rejectModalState,
} from 'utils/recoil/match';
import { fillZero } from 'utils/handleTime';
import styles from 'styles/match/MatchItem.module.scss';
import { liveState } from 'utils/recoil/main';

interface MatchItemProps {
  slot: Slot;
  type: string;
  intervalMinute: number;
}

export default function MatchItem({
  type,
  slot,
  intervalMinute,
}: MatchItemProps) {
  const setEnrollInfo = useSetRecoilState<EnrollInfo | null>(enrollInfoState);
  const setOpenRejectModal = useSetRecoilState(rejectModalState);
  const setOpenCancelModal = useSetRecoilState<boolean>(cancelModalState);
  const liveData = useRecoilValue(liveState);
  const { headCount, slotId, status, time } = slot;
  const headMax = type === 'single' ? 2 : 4;
  const startTime = new Date(time);
  const endTime = new Date(time);
  endTime.setMinutes(endTime.getMinutes() + intervalMinute);
  const isAfterSlot: boolean = startTime.getTime() - new Date().getTime() >= 0;
  let buttonStyle;

  const enrollHandler = () => {
    if (status === 'mytable') {
      setOpenCancelModal(true);
    } else if (liveData.event === 'match') {
      setOpenRejectModal(true);
    } else {
      setEnrollInfo({
        slotId,
        type,
        startTime,
        endTime,
      });
    }
  };

  if (status === 'mytable') {
    buttonStyle = styles.myButton;
  } else if (status === 'open') {
    buttonStyle = styles.enableButton;
  } else {
    buttonStyle = styles.disableButton;
  }

  return (
    <button
      className={buttonStyle}
      disabled={status === 'close'}
      onClick={enrollHandler}
    >
      <span className={styles.timeString}>
        {minuiteToStr(startTime.getMinutes())} -{' '}
        {minuiteToStr(endTime.getMinutes())}
      </span>
      <span
        className={`${styles.headCountString} ${
          headCount === 0 && styles.plusString
        }`}
      >
        {' '}
        {isAfterSlot &&
          (headCount === 0 ? '+' : `${headCount}/${headMax}`)}{' '}
      </span>
    </button>
  );
}

function minuiteToStr(min: number) {
  return fillZero(min.toString(), 2);
}
