import { useEffect, useState } from 'react';

// type ISlotInfo = {
//   slotId: number;
//   time: string;
//   isMatched: boolean;
//   myTeam: string[];
//   enemyTeam: string[];
// };

export default function SchedulerPreview() {
  const [slotInfo, setSlotInfo] = useState<any>({
    slot: [],
  });

  const initSlotInfo = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/pingpong/admin/scheduler/preview`
      ); //api 명세 아직 없음
      const data = await res.json();
      setSlotInfo({ ...data });
      console.log(slotInfo);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    initSlotInfo();
  }, []);

  return <div></div>;
}
