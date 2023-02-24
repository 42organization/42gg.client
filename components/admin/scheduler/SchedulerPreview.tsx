import { useEffect, useState } from 'react';

export default function SchedulerPreview(props: any) {
  const [slotPrevInfo, setSlotPrevInfo] = useState<any>({
    slot: [],
  });

  useEffect(() => {
    initSlotInfo();
  }, []);

  const initSlotInfo = () => {
    //ToDo: props.scheduleInfo 토대로 슬롯 정보 객체 생성
  };
  return <div>{/* ToDo: 새로 생성되는 슬롯 */}</div>;
}
