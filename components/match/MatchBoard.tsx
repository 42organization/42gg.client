import { useRecoilValue } from 'recoil';
import { Slot } from 'types/matchTypes';
import MatchItem from './MatchItem';
import { rejectModalState } from 'utils/recoil/match';
import styles from 'styles/match/MatchBoard.module.scss';
import Modal from 'components/modal/Modal';
import MatchRejectModal from 'components/modal/MatchRejectModal';
interface MatchBoardProps {
  matchSlots: Slot[];
  type: string;
  intervalMinute: number;
}

export default function MatchBoard({
  matchSlots,
  intervalMinute,
  type,
}: MatchBoardProps) {
  const openRejectModal = useRecoilValue(rejectModalState);
  const slotsHour = new Date(matchSlots[0].time).getHours();
  const slotHourString = changeTo12HourClock(slotsHour);

  return (
    <>
      {openRejectModal && (
        <Modal>
          <MatchRejectModal />
        </Modal>
      )}
      <div className={styles.matchBoard}>
        <div className={styles.slotHourString}>{slotHourString}</div>
        <div className={styles.gridContainer}>
          {matchSlots.map((slot) => (
            <MatchItem
              key={slot.slotId}
              type={type}
              slot={slot}
              intervalMinute={intervalMinute}
            ></MatchItem>
          ))}
        </div>
      </div>
    </>
  );
}

function changeTo12HourClock(hour: number) {
  return `${hour < 12 ? '오전 ' : '오후 '} ${hour % 12}시`;
}
