import { useEffect, useState } from 'react';
import instance from 'utils/axios';
import styles from 'styles/admin/scheduler/SchedulerCurrent.module.scss';

type Match = {
  intervalMinute: number;
  matchBoards: Slots[];
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

  useEffect(() => {
    console.log(slotInfo);
  }, [slotInfo]);

  return (
    <div>
      {slotInfo.matchBoards.map((slot: Slots[], index) => {
        console.log(slot.length);
        return (
          <>
            <div>
              {slot[0].time[11] === '0' ? '' : slot[0].time[11]}
              {slot[0].time[12]}시
            </div>
            <div key={index} className={styles.hourContainer}>
              {slot.map((item, i) => (
                <div key={i}>
                  <div>{item.status}</div>
                </div>
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
}

// {racketTypes.map((racket, index) => {
// 	return (
// 	  <label key={index} htmlFor={racket.id}>
// 		<input
// 		  type='radio'
// 		  name='racketType'
// 		  id={racket.id}
// 		  value={racket.id}
// 		  onChange={inputHandler}
// 		  checked={userInfo?.racketType === racket.id}
// 		/>
// 		<div className={styles.radioButton}>{racket.label}</div>
// 	  </label>
// 	);
//   })}
