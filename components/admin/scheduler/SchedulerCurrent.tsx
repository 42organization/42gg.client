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

export default function SchedulerCurrent() {
  const [slotInfo, setSlotInfo] = useState<Match>({
    intervalMinute: 0,
    matchBoards: [],
  });

  const initSlotInfo = async () => {
    try {
      const res = await instance.get(`/pingpong/match/tables/${1}/rank/single`);
      setSlotInfo({ ...res?.data });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    initSlotInfo();
  }, []);

  return (
    <div className={styles.current}>
      {slotInfo.matchBoards.map((slot: Slots[], index) => {
        console.log(slot.length);
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
