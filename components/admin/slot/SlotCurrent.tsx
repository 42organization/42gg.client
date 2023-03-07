import { useEffect, useState } from 'react';
import styles from 'styles/admin/slot/SlotCurrent.module.scss';

type Match = {
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
  pastSlotTime: number;
  futureSlotTime: number;
  interval: number;
  openMinute: number;
};

export default function SlotCurrent(props: {
  slotInfo: Match;
  scheduleInfo: EditedSchedule;
  firstHour: number;
  lastHour: number;
  currentHour: number;
  futurePreview: number;
}) {
  const [slotInfo, setSlotInfo] = useState<Match>({
    matchBoards: [],
  });

  const { currentHour, scheduleInfo, firstHour, futurePreview } = props;
  const { pastSlotTime } = scheduleInfo;
  const initSlotInfo = () => {
    const noSlotIndex: number = currentHour + futurePreview - pastSlotTime;
    const updatedMatchBoards = props.slotInfo.matchBoards.map(
      (slots, index) => {
        if (parseInt(`${firstHour}`) + index < noSlotIndex) {
          const updatedSlots: Slots[] = slots.map((slot) => {
            return { ...slot, status: 'noSlot' };
          });
          return updatedSlots;
        } else if (index < currentHour - firstHour + futurePreview) {
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
                parseInt(slot[0].time[11]) * 10 + parseInt(slot[0].time[12]) ===
                (currentHour + futurePreview > 23
                  ? (currentHour + futurePreview) % 24
                  : currentHour + futurePreview)
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
