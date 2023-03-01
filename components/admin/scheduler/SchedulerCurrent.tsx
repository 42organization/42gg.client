import { useEffect, useState } from 'react';
import styles from 'styles/admin/scheduler/SchedulerCurrent.module.scss';

type Match = {
  intervalMinute: number;
  matchBoards: Slots[][];
};

type Slots = {
  slotId: number;
  status: string;
  headCount: number;
  time: string;
  mode: string;
};

type EditedSchedule = {
  viewTimePast: number;
  viewTimeFuture: number;
  gameTime: number;
  blindShowTime: number;
  futurePreview: number;
};

export default function SchedulerCurrent(props: {
  slotInfo: Match;
  scheduleInfo: EditedSchedule;
  firstHour: number;
  lastHour: number;
  currentHour: number;
}) {
  const [slotInfo, setSlotInfo] = useState<Match>({
    intervalMinute: 0,
    matchBoards: [],
  });

  const initSlotInfo = () => {
    const noSlotIndex: number =
      props.currentHour +
      props.scheduleInfo.futurePreview -
      props.scheduleInfo.viewTimePast;
    const updatedMatchBoards = props.slotInfo.matchBoards.map(
      (slots, index) => {
        if (
          parseInt(`${props.firstHour}`) + index <
          /* noSlotIndex < 0 ? noSlotIndex + 24 :  */ noSlotIndex //todo: 오후 12시 전/후 확인필요
        ) {
          const updatedSlots: Slots[] = slots.map((slot) => {
            return { ...slot, status: 'noSlot' };
          });
          return updatedSlots;
        } else if (
          index <
          props.currentHour - props.firstHour + props.scheduleInfo.futurePreview
        ) {
          const updatedSlots: Slots[] = slots.map((slot) => {
            return { ...slot, status: 'close' };
          });
          return updatedSlots;
        } else {
          return slots;
        }
      }
    );
    setSlotInfo({
      ...props.slotInfo,
      matchBoards: updatedMatchBoards,
    });
  };

  useEffect(() => {
    initSlotInfo();
  }, [props]);

  return (
    <div>
      {slotInfo.matchBoards.map((slot: Slots[], index) => {
        const slotTime =
          parseInt(slot[0].time[11]) * 10 + parseInt(slot[0].time[12]);
        return (
          <div
            key={index}
            className={
              styles[slot[0].status === 'noSlot' ? 'none' : 'hourContainer']
            }
          >
            <div
              className={
                slotTime ===
                props.currentHour + props.scheduleInfo.futurePreview
                  ? styles.currentTime
                  : styles.time
              }
            >
              {slotTime}시
            </div>
            <div className={styles.hourSlot}>
              {slot.map((item) => (
                <div
                  key={item.slotId}
                  className={`${styles.minuteSlot}
					${styles[`${item.status}`]}`}
                >
                  <div>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
