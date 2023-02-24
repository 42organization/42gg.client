import { useEffect, useState } from 'react';

type EditedSchedule = {
  viewTimePast: number;
  viewTimeFuture: number;
  gameTime: number;
  blindShowTime: number;
};

type Slots = {
  status: string;
  time: number;
};

type Match = {
  intervalMinute: number;
  matchBoards: Slots[][];
};

export default function SchedulerPreview(props: {
  scheduleInfo: EditedSchedule;
  showTime: number;
  lastHour: number;
}) {
  const { showTime, lastHour, scheduleInfo } = props;
  const [slotInfo, setSlotInfo] = useState<Match>({
    intervalMinute: 0,
    matchBoards: [],
  });

  useEffect(() => {
    console.log(slotInfo);
  }, [slotInfo]);

  useEffect(() => {
    initSlotInfo();
  }, [props]);

  const initSlotInfo = () => {
    const scheduleTime: number =
      parseInt(`${scheduleInfo.viewTimePast}`) +
      parseInt(`${scheduleInfo.viewTimeFuture}`);
    if (scheduleTime >= showTime) {
      const slots: Slots[][] = Array(scheduleTime - showTime + 1)
        .fill(null)
        .map((i: number) =>
          Array(60 / scheduleInfo.gameTime).fill({
            status: 'open',
            time: lastHour + i >= 24 ? (lastHour + i) % 24 : lastHour + i,
          })
        );
      setSlotInfo({
        intervalMinute: scheduleInfo.gameTime,
        matchBoards: slots,
      });
    }
  };
  return <div></div>;
}
