import { useEffect, useState } from 'react';
import {
  CurrentMatch,
  SlotCurrentProps,
  Slots,
} from 'types/admin/takgu/adminSlotTypes';
import styles from 'styles/admin/takgu/slot/SlotCurrent.module.scss';

export default function SlotCurrent(props: SlotCurrentProps) {
  const [slotInfo, setSlotInfo] = useState<CurrentMatch>({
    matchBoards: [],
  });

  const { currentHour, scheduleInfo, firstHour, futurePreview } = props;
  const { pastSlotTime } = scheduleInfo;

  const slotHour = (date: string) => {
    return new Date(date).getHours();
  };

  const initSlotInfo = () => {
    const noSlotIndex: number = currentHour + futurePreview - pastSlotTime;
    const updatedMatchBoards = props.slotInfo.matchBoards.map(
      (slots: Slots[], index: number) => {
        const updatedSlots: Slots[] = slots.map((slot: Slots) => {
          if (firstHour + index < noSlotIndex) {
            return { ...slot, status: 'noSlot' };
          } else if (index < currentHour - firstHour + futurePreview) {
            return { ...slot, status: 'close' };
          } else if (slot.status === 'mytable') {
            return { ...slot, status: 'close' };
          }
          return slot;
        });
        return updatedSlots;
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
        const slotTime = slotHour(slot[0].startTime);
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
                  key={item.startTime}
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
