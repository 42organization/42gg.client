import { useEffect, useState } from 'react';
import instance from 'utils/axios';
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

export default function SchedulerCurrent(props: {
  slotInfo: Match;
  scheduleInfo: any;
  firstHour: number;
  currentHour: number;
}) {
  const [slotInfo, setSlotInfo] = useState<Match>({
    intervalMinute: 0,
    matchBoards: [],
  });

  const initSlotInfo = () => {
    const noSlotIndex: number =
      parseInt(`${props.currentHour}`) +
      parseInt(`${props.scheduleInfo.futurePreview}`) -
      parseInt(`${props.scheduleInfo.viewTimePast}`);
    const updatedMatchBoards = props.slotInfo.matchBoards.map(
      (slots, index) => {
        if (
          parseInt(`${props.firstHour}`) + index <
          (noSlotIndex < 0 ? noSlotIndex + 24 : noSlotIndex)
        ) {
          const updatedSlots = slots.map((slot) => {
            return { ...slot, status: 'noSlot' };
          });
          return updatedSlots;
        } else if (
          index <
          parseInt(`${props.currentHour}`) -
            parseInt(`${props.firstHour}`) +
            parseInt(`${props.scheduleInfo.futurePreview}`)
        ) {
          const updatedSlots = slots.map((slot) => {
            return { ...slot, status: 'close' };
          });
          return updatedSlots;
        }
        return slots;
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
    <div className={styles.current}>
      {slotInfo.matchBoards.map((slot: Slots[], index) => {
        return (
          <div key={index} className={styles.hourContainer}>
            <div className={styles.time}>
              {slot[0].time[11] === '0' ? '' : slot[0].time[11]}
              {slot[0].time[12]}시
            </div>
            <div className={styles[`hourSlot${slot.length}`]}>
              {slot.map((item) => (
                <div
                  key={item.slotId}
                  className={`${styles[`minuteSlot${slot.length}`]}
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
