import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomGroup } from 'types/calendar/customGroupType';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { Schedule } from 'types/calendar/scheduleTypes';
import DownSVG from 'public/image/calendar/downToggle.svg';
import LinkSVG from 'public/image/calendar/linkIcon.svg';
import styles from 'styles/calendar/modal/PrivateScheduleAddModal.module.scss';
import GroupSelect from './GroupSelect';
import { useCalendarModal } from './useCalendarModal';

//nowGroup 부분 -> 일정 추가일시 groupid:1인 그룹이 기본으로 설정되어 있도록 하는 로직 필요(그룹 불러오기)
//모달 바깥 클릭했을때(모달 꺼졌을 때) 수정/추가한 것 취소 로직 필요
//등록버튼 클릭 시 일정 저장하는 로직 필요
const PrivateScheduleAddModal = (props: calendarModalProps) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const { closeModal } = useCalendarModal();

  //기존 스케줄
  const [initialScheduleData, setInitialScheduleData] = useState<Schedule>(
    props.schedule
      ? { ...props.schedule }
      : {
          title: '',
          content: '',
          link: '',
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
        }
  );

  //스케줄 수정 시 데이터 변하는 것 감지
  const [scheduleData, setScheduleData] = useState<Schedule>(
    props.schedule
      ? { ...props.schedule }
      : {
          title: '',
          content: '',
          link: '',
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
        }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: 'startTime' | 'endTime', date: Date) => {
    setScheduleData((prev) => ({ ...prev, [name]: date }));
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className={styles.bubbleModal}>
      <div className={styles.titleContainer}>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력하세요'
          className={styles.bigField}
          value={scheduleData.title}
          onChange={handleChange}
          style={{ color: scheduleData.groupColor }}
        />
        <div className={styles.groupSelect} onClick={handleDropdown}>
          <div
            className={styles.nowGroup}
            style={{ backgroundColor: scheduleData.groupColor }}
          />
          <div className={styles.changeGroup}>
            <DownSVG
              width={14}
              height={9}
              fill={'#785AD2'}
              transform='rotate(180)'
            />
            <DownSVG width={14} height={9} fill='#785AD2' />
          </div>
          {isDropdown && (
            <GroupSelect
              isDropdown={isDropdown}
              setIsDropdown={setIsDropdown}
              schedule={scheduleData}
              setSchedule={setScheduleData}
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <textarea
          name='content'
          value={scheduleData.content}
          onChange={handleChange}
          placeholder='내용을 입력하세요'
          className={styles.field}
          rows={1}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.date}>
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={new Date(scheduleData.startTime)}
            name='startTime'
            showTimeSelect
            timeFormat='HH:mm'
            dateFormat='yyyy.MM.dd HH시 mm분'
            timeIntervals={30}
            onChange={(date) => {
              handleDateChange('startTime', date as Date);
            }}
            className={styles.datePicker}
          />
        </div>
        <span>-</span>
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={new Date(scheduleData.endTime)}
            name='endTime'
            showTimeSelect
            timeFormat='HH:mm'
            dateFormat='yyyy.MM.dd HH시 mm분'
            timeIntervals={30}
            onChange={(date) => {
              handleDateChange('endTime', date as Date);
            }}
            className={styles.datePickerEnd}
          />
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.link}>
        <LinkSVG
          stroke={scheduleData.link ? '#000000' : '#C1C8F0'}
          width={13}
          height={14}
        />
        <input
          type='text'
          name='link'
          placeholder='링크를 입력하세요'
          className={styles.field}
          value={scheduleData.link}
          onChange={handleChange}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.buttonContainer}>
        <div
          className={
            scheduleData.title && scheduleData.content
              ? styles.buttonActive
              : styles.buttonInactive
          }
          onClick={closeModal}
        >
          등록
        </div>
      </div>
    </div>
  );
};

export default PrivateScheduleAddModal;
