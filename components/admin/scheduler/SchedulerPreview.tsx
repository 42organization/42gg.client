import { useEffect, useState } from 'react';

export default function SchedulerCurrent() {
  const [slotPrevInfo, setSlotPrevInfo] = useState<any>({
    slot: [],
  });

  useEffect(() => {
    initSlotInfo();
  }, []);

  const initSlotInfo = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/pingpong/admin/scheduler/preview`
      ); //api 명세 아직 없음
      const data = await res.json();
      setSlotPrevInfo({ ...data });
    } catch (e) {
      console.error(e);
    }
  };
  return <div></div>;
}
