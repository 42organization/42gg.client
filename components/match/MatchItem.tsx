import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Slot } from 'types/matchTypes';
import { errorState } from 'utils/recoil/error';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
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
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);
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
        if (res?.data) {
          const { slotId, time, enemyTeam } = res.data;
          setModalInfo({
            modalName: 'MATCH-CANCEL',
            cancelInfo: { slotId, time, enemyTeam },
          });
        }
      } catch (e: any) {
        if (e.response.status === 0) setErrorMessage('DK303');
        else setErrorMessage('JB03');
      }
    } else if (liveData.event === 'match') {
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
