import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Slot, EnrollInfo } from 'types/matchTypes';
import {
  cancelModalState,
  enrollInfoState,
  matchModalState,
} from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';
import { currentMatchInfo } from 'utils/recoil/match';
import { fillZero } from 'utils/handleTime';
import instance from 'utils/axios';
import styles from 'styles/match/MatchItem.module.scss';

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
  const setMatchModal = useSetRecoilState(matchModalState);
  const setOpenCancelModal = useSetRecoilState<boolean>(cancelModalState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setCurrentMatch = useSetRecoilState(currentMatchInfo);
  const liveData = useRecoilValue(liveState);
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
        setCurrentMatch(res?.data);
      } catch (e) {
        setErrorMessage('JB03');
      }
      setOpenCancelModal(true);
    } else if (liveData.event === 'match') {
      setMatchModal('reject');
    } else {
      setMatchModal('enroll');
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
