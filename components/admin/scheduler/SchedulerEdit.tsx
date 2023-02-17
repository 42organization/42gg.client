import { useEffect, useState } from 'react';
import instance from 'utils/axios';
import styles from 'styles/admin/scheduler/SchedulerEdit.module.scss';

interface EditedSchedule {
  viewTimePast: number;
  viewTimeFuture: number;
  gameTime: 15 | 30 | 60;
  blindShowTime: number;
  extraSlotTime: number;
  slotCreateCycle: number;
}

export default function SchedulerEdit() {
  const [scheduleInfo, setScheduleInfo] = useState<EditedSchedule>({
    viewTimePast: 6,
    viewTimeFuture: 6,
    gameTime: 15,
    blindShowTime: 5,
    extraSlotTime: 1,
    slotCreateCycle: 1,
  });

  const initInfo = async () => {
    try {
      const res = await instance.get(`/pingpong/admin/scheduler`); //api 명세 아직 없음
      setScheduleInfo(res?.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    initInfo();
  }, []);

  const inputHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setScheduleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.content}>
      <div className={styles.imgContainer}>image</div>
      <div className={styles.inputContainer}>
        <div>
          보여주는 시간: ({scheduleInfo.viewTimePast}시간) 현재 (
          {scheduleInfo.viewTimeFuture}시간)
        </div>
        <div>
          과거
          <input type='number' name='viewTimePast' onChange={inputHandler} />
          미래
          <input type='number' name='viewTimeFuture' onChange={inputHandler} />
        </div>
        <div>
          게임 시간
          <select name='gameTime' onChange={() => inputHandler}>
            <option value='15'>15분</option>
            <option value='30'>30분</option>
            <option value='60'>60분</option>
          </select>
        </div>
        <div>
          블라인드 해제 시간
          <input type='number' name='blindShowTime' onChange={inputHandler} />
        </div>
        <div>
          여유 슬롯 시간
          <input type='number' name='extraSlotTime' onChange={inputHandler} />
        </div>
        <div>
          슬롯 생성 주기
          <input type='number' name='slotCreateCycle' onChange={inputHandler} />
        </div>
      </div>
    </div>
  );
}
