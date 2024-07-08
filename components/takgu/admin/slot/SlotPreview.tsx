import { useEffect, useState } from 'react';
import {
  PreviewMatch,
  SlotPreviewProps,
  Slot,
} from 'types/takgu/admin/adminSlotTypes';
import styles from 'styles/takgu/admin/slot/SlotCurrent.module.scss';

export default function SlotPreview(props: SlotPreviewProps) {
  const { lastHour, scheduleInfo, currentHour, futurePreview } = props;
  const { pastSlotTime, futureSlotTime, interval } = scheduleInfo;

  const [slotInfo, setSlotInfo] = useState<PreviewMatch>({
    matchBoards: [],
  });

  const initEmptySlot = () => Array(0).fill(null);

  const initSlotStatus = (index: number, remainTime: number) => {
    if (futurePreview > 0) {
      if (currentHour + futurePreview - pastSlotTime - 24 > lastHour + index) {
        return 'noSlot';
      } else if (currentHour + futurePreview - 24 > lastHour + index) {
        return 'close';
      } else if (futureSlotTime + futurePreview > index + remainTime) {
        return 'open';
      } else if (futureSlotTime + futurePreview === index + remainTime) {
        return 'preview';
      }
      return 'noSlot';
    } else {
      if (remainTime + futureSlotTime > index) {
        return 'preview';
      }
      return 'noSlot';
    }
  };

  const initSlotInfo = (slots: Slot[][]) => {
    const scheduleTime =
      lastHour - currentHour < 0
        ? lastHour - currentHour + 24
        : lastHour - currentHour;
    if (
      scheduleTime <= futureSlotTime + futurePreview &&
      futurePreview >= 0 &&
      futureSlotTime - scheduleTime + futurePreview + 1 > 0
    ) {
      const countNewSlot = futureSlotTime - scheduleTime + futurePreview + 1;
      const newSlots: Slot[][] = Array(countNewSlot)
        .fill(null)
        .map((_, index: number) => {
          const slotTime =
            lastHour + index >= 24 ? (lastHour + index) % 24 : lastHour + index;
          return Array(60 / interval)
            .fill(null)
            .map((_, slotIndex: number) => ({
              status: initSlotStatus(index, scheduleTime),
              time: slotTime,
              slotId: `${index}-${slotIndex}`,
            }));
        });
      setSlotInfo({
        matchBoards: newSlots.concat(slots),
      });
    } else {
      setSlotInfo({
        matchBoards: [],
      });
    }
  };

  useEffect(() => {
    const emptySlots = initEmptySlot();
    initSlotInfo(emptySlots);
  }, [props]);

  return (
    <div>
      {slotInfo.matchBoards.map((slot: Slot[], index: number) => {
        return (
          <div
            key={index}
            className={
              styles[slot[0].status === 'noSlot' ? 'none' : 'hourContainer']
            }
          >
            <div
              className={
                slot[0].time ===
                (currentHour + futurePreview > 23
                  ? (currentHour + futurePreview) % 24
                  : currentHour + futurePreview)
                  ? styles.currentTime
                  : styles.time
              }
            >
              {slot[0].time}시
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
