import { useEffect, useState } from 'react';
import styles from 'styles/admin/scheduler/SchedulerCurrent.module.scss';

type EditedSchedule = {
  viewTimePast: number;
  viewTimeFuture: number;
  gameTime: number;
  blindShowTime: number;
  futurePreview: number;
};

type Slots = {
  status: string;
  time: number;
  slotId: string;
};

type Match = {
  intervalMinute: number;
  matchBoards: Slots[][];
};

export default function SchedulerPreview(props: {
  scheduleInfo: EditedSchedule;
  showTime: number;
  lastHour: number;
  currentHour: number;
}) {
  const { showTime, lastHour, scheduleInfo, currentHour } = props;
  const [slotInfo, setSlotInfo] = useState<Match>({
    intervalMinute: 0,
    matchBoards: [],
  });

  const initEmptySlot = () => {
    const slots: Slots[][] = Array(0).fill(null);
    return slots;
  };

  const initSlotStatus = (index: number) => {
    const remainTime =
      lastHour > currentHour
        ? lastHour - currentHour
        : lastHour - currentHour + 24;
    if (scheduleInfo.futurePreview > 0) {
      if (
        currentHour +
          scheduleInfo.futurePreview -
          scheduleInfo.viewTimePast -
          24 >
        lastHour + index
      )
        return 'noSlot';
      else if (
        scheduleInfo.viewTimeFuture + scheduleInfo.futurePreview >
        index + remainTime
      )
        return 'open';
      else if (
        scheduleInfo.viewTimeFuture + scheduleInfo.futurePreview ===
        index + remainTime
      )
        return 'preview';
      else return 'noSlot';
    } else {
      if (remainTime + scheduleInfo.viewTimeFuture > index) return 'preview';
      else return 'noSlot';
    }
  };

  const initSlotInfo = (slots: Slots[][]) => {
    const scheduleTime: number =
      lastHour - currentHour < 0
        ? lastHour - currentHour + 24
        : lastHour - currentHour;
    if (
      scheduleTime <=
        scheduleInfo.viewTimeFuture + scheduleInfo.futurePreview &&
      scheduleInfo.futurePreview >= 0 &&
      scheduleInfo.viewTimeFuture -
        scheduleTime +
        scheduleInfo.futurePreview +
        1 >
        0
    ) {
      const countNewSlot: number =
        scheduleInfo.viewTimeFuture -
        scheduleTime +
        scheduleInfo.futurePreview +
        1;
      const newSlots: Slots[][] = Array(countNewSlot)
        .fill(null)
        .map((_, index: number) =>
          Array(60 / scheduleInfo.gameTime)
            .fill(null)
            .map((_, slotIndex: number) => ({
              status: initSlotStatus(index),
              time:
                lastHour + index >= 24
                  ? (lastHour + index) % 24
                  : lastHour + index,
              slotId: `${index}-${slotIndex}`,
            }))
        );
      setSlotInfo({
        intervalMinute: scheduleInfo.gameTime,
        matchBoards: newSlots.concat(slots),
      });
    } else {
      const slots: Slots[][] = Array(0).fill(null);
      setSlotInfo({
        intervalMinute: scheduleInfo.gameTime,
        matchBoards: slots,
      });
    }
  };

  useEffect(() => {
    console.log(slotInfo);
  }, [slotInfo]);

  useEffect(() => {
    const emptySlots = initEmptySlot();
    initSlotInfo(emptySlots);
  }, [props]);

  return (
    <div>
      {slotInfo.matchBoards.map((slot: Slots[], index) => {
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
                (currentHour + scheduleInfo.futurePreview >= 24
                  ? (currentHour + scheduleInfo.futurePreview) % 24
                  : currentHour + scheduleInfo.futurePreview)
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
