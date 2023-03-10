import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
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
  });

  const [slotInfo, setSlotInfo] = useState<CurrentMatch>({
    matchBoards: [],
  });

  const [futurePreview, setFuturePreview] = useState<number>(0);
  const [showTime, setShowTime] = useState<number>(0);
  const [lastHour, setLastHour] = useState<number>(0);
  const [firstHour, setFirstHour] = useState<number>(0);
  const setSnackbar = useSetRecoilState(toastState);
  const currentHour = new Date().getHours();
  const initScheduleInfo = async () => {
    try {
      const res = await instance.get(`/pingpong/admin/slot`); //ToDo: api 명세 나오면 바꾸기
      setScheduleInfo(res?.data);
    } catch (e) {
      console.error(e);
    }
  };

  const slotHour = (date: string) => {
    const time = new Date(date).getHours();
    return time;
  };

  const initSlotInfo = async () => {
    try {
      const res = await instance.get(`/pingpong/match/tables/${1}/rank/single`);
      setSlotInfo({ ...res?.data });
      setShowTime(res?.data.matchBoards.length);
      setFirstHour(slotHour(res?.data.matchBoards[0][0].time));
      setLastHour(
        slotHour(
          res?.data.matchBoards[res?.data.matchBoards.length - 1][0].time
        ) + 1
      );
    } catch (e) {
      console.error(e);
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
    setScheduleInfo((prev) => ({
      ...prev,
      [name]: intValue,
    }));
  };

  const intervalOptions = Array.from({ length: 60 }, (_, i: number) => i + 1)
    .filter((num) => 60 % num === 0)
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
      await instance.put(`/pingpong/admin/slot`, scheduleInfo);
      initSlotInfo();
    } catch (e) {
      console.error(e);
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
        <div className={styles.interval}>
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
            <div>보여주는 시간:</div>
            <div className={styles.nTime}>
              <div>N시간 뒤:</div>
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
        <div className={styles.openMinute}>
          <div>블라인드 해제 시간:</div>
          <input
            type='number'
            value={scheduleInfo.openMinute}
            name='openMinute'
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
