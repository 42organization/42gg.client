import { useEffect, useState } from 'react';
import styles from 'styles/admin/slot/SlotCurrent.module.scss';
import {
  CurrentMatch,
  SlotCurrentProps,
  Slots,
} from 'types/admin/adminSlotTypes';

export default function SlotCurrent(props: SlotCurrentProps) {
  const [slotInfo, setSlotInfo] = useState<CurrentMatch>({
    matchBoards: [],
  });

  const { currentHour, scheduleInfo, firstHour, futurePreview } = props;
  const { pastSlotTime } = scheduleInfo;

  const slotHour = (date: string) => {
    const time = new Date(date).getHours();
    return time;
  };

  const initSlotInfo = () => {
    const noSlotIndex: number = currentHour + futurePreview - pastSlotTime;
    const updatedMatchBoards = props.slotInfo.matchBoards.map(
      (slots: Slots[], index: number) => {
        if (firstHour + index < noSlotIndex) {
          const updatedSlots: Slots[] = slots.map((slot: Slots) => {
            return { ...slot, status: 'noSlot' };
          });
          return updatedSlots;
        } else if (index < currentHour - firstHour + futurePreview) {
          const updatedSlots: Slots[] = slots.map((slot: Slots) => {
            return { ...slot, status: 'close' };
          });
          return updatedSlots;
        } else {
          return slots;
        }
      }
    );
    setSlotInfo({
      matchBoards: updatedMatchBoards,
    });
  };

  useEffect(() => {
    initSlotInfo();
  }, [props]);

  return (
    <div>
      {slotInfo.matchBoards.map((slot: Slots[], index) => {
        const slotTime = slotHour(slot[0].time);
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
