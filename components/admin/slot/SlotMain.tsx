import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { instance, instanceInManage } from 'utils/axios';
import SlotCurrent from './SlotCurrent';
import SlotPreview from './SlotPreview';
import { toastState } from 'utils/recoil/toast';
import { GrLocationPin } from 'react-icons/gr';
import { CurrentMatch, EditedSchedule } from 'types/admin/adminSlotTypes';
import styles from 'styles/admin/slot/SlotMain.module.scss';

export default function SlotMain() {
  const [scheduleInfo, setScheduleInfo] = useState<EditedSchedule>({
    pastSlotTime: 0,
    futureSlotTime: 12,
    interval: 15,
    openMinute: 5,
    startTime: new Date(),
  });

  const [slotInfo, setSlotInfo] = useState<CurrentMatch>({
    matchBoards: [],
  });

  const [futurePreview, setFuturePreview] = useState<number>(0);
  const [showTime, setShowTime] = useState<number>(0);
  const [lastHour, setLastHour] = useState<number>(0);
  const [firstHour, setFirstHour] = useState<number>(0);
  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const setSnackbar = useSetRecoilState(toastState);
  const currentHour = new Date().getHours();
  const initScheduleInfo = async () => {
    try {
      const res = await instanceInManage.get(`/slot`); //ToDo: api 명세 나오면 바꾸기
      setScheduleInfo(res?.data);
    } catch (e) {
      console.error('SW00');
    }
  };

  const slotHour = (date: string) => {
    return new Date(date).getHours();
  };

  const initSlotInfo = async () => {
    try {
      const res = await instance.get(`/pingpong/match/time/scope?mode=rank`);
      setSlotInfo({ ...res?.data });
      setShowTime(res?.data.matchBoards.length);
      setFirstHour(slotHour(res?.data.matchBoards[0][0].startTime));
      setLastHour(
        slotHour(
          res?.data.matchBoards[res?.data.matchBoards.length - 1][0].startTime
        ) + 1
      );
    } catch (e) {
      console.error('SW01');
    }
  };

  useEffect(() => {
    initScheduleInfo();
    initSlotInfo();
  }, []);
  const inputHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let intValue = parseInt(value);
    if (isNaN(intValue)) intValue = 0;
    if ((name === 'futurePreview' || name === 'openMinute') && intValue < 0)
      return;
    if (name === 'futurePreview') return setFuturePreview(intValue);
    if (name === 'startDate') {
      const [year, month, day] = value.split('-');
      const newDateTime = new Date(startDateTime);
      newDateTime.setFullYear(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      newDateTime.setMinutes(
        newDateTime.getMinutes() - newDateTime.getTimezoneOffset()
      );
      setStartDateTime(newDateTime);
    } else if (name === 'startTime') {
      const newDateTime = new Date(startDateTime);
      newDateTime.setHours(intValue);
      setStartDateTime(newDateTime);
    } else {
      setScheduleInfo((prev) => ({
        ...prev,
        [name]: intValue,
      }));
    }
  };

  const intervalOptions = Array.from({ length: 60 }, (_, i: number) => i + 1)
    .filter((num) => 60 % num === 0 && num >= 5)
    .map((num) => (
      <option key={`gt-${num}`} value={num}>
        {num}분
      </option>
    ));

  const pastTimeOptions = Array.from({ length: 4 }, (_, i) => i).map((num) => (
    <option key={`pt-${num}`} value={num}>
      {num}시간
    </option>
  ));

  const futureTimeOptions = Array.from({ length: 23 }, (_, i) => i + 1).map(
    (num) => (
      <option key={`ft-${num}`} value={num}>
        {num}시간
      </option>
    )
  );

  const finishHandler = async () => {
    if (scheduleInfo.openMinute > scheduleInfo.interval) {
      setSnackbar({
        toastName: 'scheduler error',
        severity: 'error',
        message: `🔥 블라인드 해제 시간이 게임 시간보다 길 수 없습니다 🔥`,
        clicked: true,
      });
      return;
    }
    try {
      const updatedScheduleInfo = {
        ...scheduleInfo,
        startTime: startDateTime,
      };
      await instanceInManage.post(`/slot-management`, updatedScheduleInfo);
      initSlotInfo();
    } catch (e) {
      console.error('SW02');
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.previewContainer}>
        <div className={styles.previewWrap}>
          {slotInfo.matchBoards.length > 0 && (
            <SlotCurrent
              slotInfo={slotInfo}
              firstHour={firstHour}
              lastHour={lastHour}
              currentHour={currentHour}
              scheduleInfo={scheduleInfo}
              futurePreview={futurePreview}
            />
          )}
          {scheduleInfo.futureSlotTime + scheduleInfo.futureSlotTime > 0 &&
            showTime > 0 && (
              <SlotPreview
                lastHour={lastHour}
                currentHour={currentHour}
                scheduleInfo={scheduleInfo}
                futurePreview={futurePreview}
              />
            )}
        </div>
        <div className={styles.initBtn}></div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.gameTime}>
          <div>게임 시간:</div>
          <select
            value={scheduleInfo.interval}
            name='interval'
            onChange={inputHandler}
          >
            {intervalOptions}
          </select>
        </div>
        <hr />
        <div className={styles.viewTime}>
          <div className={styles.futurePreview}>
            <div>보이는 슬롯(n시간 뒤):</div>
            <div className={styles.nTime}>
              <input
                type='number'
                value={futurePreview}
                name='futurePreview'
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className={styles.currentHour}>
            {currentHour + futurePreview > 23
              ? (currentHour + futurePreview) % 24
              : currentHour + futurePreview}
            시
          </div>
          <div className={styles.pinIcon}>
            <GrLocationPin size='60' />
          </div>
          <div className={styles.timeLine}>
            <div className={styles.hourLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.hourLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.hourLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.hourLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.hourLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.minLine}></div>
            <div className={styles.hourLine}></div>
          </div>
          <div className={styles.viewTimeBottom}>
            <div>
              <div>과거</div>
              <select
                value={scheduleInfo.pastSlotTime}
                name='pastSlotTime'
                onChange={inputHandler}
              >
                {pastTimeOptions}
              </select>
            </div>
            <div>
              <div>미래</div>
              <select
                value={scheduleInfo.futureSlotTime}
                name='futureSlotTime'
                onChange={inputHandler}
              >
                {futureTimeOptions}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.timeContainer}>
          <div>블라인드 해제 시간:</div>
          <input
            type='number'
            value={scheduleInfo.openMinute}
            name='openMinute'
            onChange={inputHandler}
          />
        </div>
        <div className={styles.timeContainer}>
          <div>슬롯 반영 시작날짜:</div>
          <input
            type='date'
            value={startDateTime.toISOString().split('T')[0]}
            name='startDate'
            onChange={inputHandler}
          />
        </div>
        <div className={styles.timeContainer}>
          <div>슬롯 반영 시작시간(24hour):</div>
          <input
            type='number'
            value={startDateTime.getHours()}
            name='startTime'
            onChange={inputHandler}
          />
        </div>
        <div className={styles.btn}>
          <button onClick={finishHandler}>적용</button>
        </div>
      </div>
    </div>
  );
}
