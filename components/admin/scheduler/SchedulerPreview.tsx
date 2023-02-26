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

  useEffect(() => {
    console.log(slotInfo);
  }, [slotInfo]);

  const initEmptySlot = () => {
    const slots: Slots[][] = Array(0).fill(null);
    return slots;
  };

  const initSlotInfo = (slots: Slots[][]) => {
    const scheduleTime: number =
      parseInt(`${lastHour}`) - parseInt(`${currentHour}`) < 0
        ? parseInt(`${lastHour}`) - parseInt(`${currentHour}`) + 24
        : parseInt(`${lastHour}`) - parseInt(`${currentHour}`);
    if (scheduleTime <= scheduleInfo.viewTimeFuture) {
      const newSlots: Slots[][] = Array(
        parseInt(`${scheduleInfo.viewTimeFuture}`) -
          parseInt(`${scheduleTime}`) +
          1
      )
        .fill(null)
        .map((_, index: number) =>
          Array(60 / scheduleInfo.gameTime)
            .fill(null)
            .map((_, slotIndex: number) => ({
              status: 'preview',
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
    }
  };

  useEffect(() => {
    const emptySlots = initEmptySlot();
    initSlotInfo(emptySlots);
  }, [props]);

  return (
    <div className={styles.current}>
      {slotInfo.matchBoards.map((slot: Slots[], index) => {
        return (
          <div key={index} className={styles.hourContainer}>
            <div className={styles.time}>{slot[0].time}시</div>
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
