import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useSetRecoilState } from 'recoil';
import 'react-datepicker/dist/react-datepicker.css';
import { ScheduleGroup } from 'types/calendar/groupType';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { Schedule } from 'types/calendar/scheduleTypes';
import { useCalendarModal } from 'utils/calendar/useCalendarModal';
import { toastState } from 'utils/recoil/toast';
import SumbitButton from 'components/calendar/button/SubmitButton';
import { useGroup } from 'components/calendar/GroupContext';
import CustomDatepicker from 'components/calendar/modal/CustomDatepicker';
import GroupSelect from 'components/calendar/modal/GroupSelect';
import DownSVG from 'public/image/calendar/downToggle.svg';
import LinkSVG from 'public/image/calendar/linkIcon.svg';
import useScheduleRequest from 'hooks/calendar/useScheduleRequest';
import styles from 'styles/calendar/modal/PrivateScheduleUpsertModal.module.scss';
import ToggleSwitch from '../button/ToggleSwitch';

const PrivateScheduleUpsertModal = (props: calendarModalProps) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { closeModal } = useCalendarModal();
  const { sendCalendarRequest, error } = useScheduleRequest();
  const setSnackbar = useSetRecoilState(toastState);
  const groupList = useGroup();

  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdown(false);
        return;
      }
      if (
        !isDropdown &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdown, closeModal]);

  const findNowGroup = () => {
    const nowGroup = groupList.groupList.find(
      (group: ScheduleGroup) => group.id === scheduleData.groupId
    );
    return nowGroup;
  };

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
          alarm: false,
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
          alarm: false,
        }
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toKSTISOString = (date: Date) => {
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kstDate.toISOString();
  };

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

  const createSchedule = async () => {
    scheduleData.status = 'ACTIVATE';
    scheduleData.startTime = toKSTISOString(new Date(scheduleData.startTime));
    scheduleData.endTime = toKSTISOString(new Date(scheduleData.endTime));
    await sendCalendarRequest(
      'POST',
      'private',
      scheduleData,
      () => {
        closeModal();
      },
      (error: string) => {
        let errMsg;
        if (scheduleData.title === '' || scheduleData.content === '') {
          errMsg = '제목과 내용을 입력해주세요';
        } else if (scheduleData.title.length > 50) {
          errMsg = '제목은 50자 이하로 입력해주세요';
        } else if (scheduleData.content.length > 2000) {
          errMsg = '내용은 2000자 이하로 입력해주세요';
        } else if (
          new Date(scheduleData.startTime) > new Date(scheduleData.endTime)
        ) {
          errMsg = '시작 시간이 종료 시간보다 늦습니다';
        } else {
          errMsg = '일정 추가에 실패했습니다';
        }
        setSnackbar({
          toastName: 'post error',
          severity: 'error',
          message: `🔥 ${errMsg} 🔥`,
          clicked: true,
        });
      }
    );
  };

  //imported 일정에서 그룹, 알람 외 다른 것 수정 시 setSnackbar로 에러 메세지 띄우기
  const updateSchedule = async () => {
    scheduleData.startTime = toKSTISOString(new Date(scheduleData.startTime));
    scheduleData.endTime = toKSTISOString(new Date(scheduleData.endTime));
    const url =
      scheduleData.classification !== 'PRIVATE_SCHEDULE'
        ? `private/imported/${scheduleData.id}`
        : `private/${scheduleData.id}`;
    await sendCalendarRequest(
      'PUT',
      url,
      scheduleData,
      () => {
        closeModal();
      },
      (error: string) => {
        let errMsg;
        if (scheduleData.title === '' || scheduleData.content === '') {
          errMsg = '제목과 내용을 입력해주세요';
        } else if (scheduleData.title.length > 50) {
          errMsg = '제목은 50자 이하로 입력해주세요';
        } else if (scheduleData.content.length > 2000) {
          errMsg = '내용은 2000자 이하로 입력해주세요';
        } else if (
          new Date(scheduleData.startTime) > new Date(scheduleData.endTime)
        ) {
          errMsg = '시작 시간이 종료 시간보다 늦습니다';
        } else {
          errMsg = '일정 수정에 실패했습니다';
        }

        setSnackbar({
          toastName: 'put error',
          severity: 'error',
          message: `🔥 ${errMsg} 🔥`,
          clicked: true,
        });
      }
    );
  };

  return (
    <div
      className={styles.bubbleModal}
      ref={modalRef}
      // onClick={(e) => isDropdown && setIsDropdown(false)}
    >
      <div className={styles.titleContainer}>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력하세요'
          className={styles.bigField}
          value={scheduleData.title}
          onChange={handleChange}
          style={{ color: findNowGroup()?.backgroundColor }}
        />
        <div className={styles.groupSelect} onClick={handleDropdown}>
          <div
            className={styles.nowGroup}
            style={{ backgroundColor: findNowGroup()?.backgroundColor }}
          />
          <div className={styles.changeGroup}>
            {isDropdown && (
              <div ref={dropdownRef}>
                <GroupSelect
                  isDropdown={isDropdown}
                  setIsDropdown={setIsDropdown}
                  schedule={scheduleData}
                  setSchedule={setScheduleData}
                />
              </div>
            )}
            <DownSVG
              width={14}
              height={9}
              fill={'#785AD2'}
              transform='rotate(180)'
            />
            <DownSVG width={14} height={9} fill='#785AD2' />
          </div>
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
          <CustomDatepicker>
            <DatePicker
              selected={new Date(scheduleData.startTime)}
              name='startTime'
              showTimeSelect
              timeFormat='HH:mm'
              dateFormat={
                isMobile ? 'yyyy.MM.dd HH시 mm분부터' : 'yyyy.MM.dd HH시 mm분'
              }
              timeIntervals={30}
              onChange={(date) => {
                handleDateChange('startTime', date as Date);
              }}
              className={styles.datePicker}
            />
          </CustomDatepicker>
        </div>
        <span>-</span>
        <div className={styles.datePickerContainer}>
          <CustomDatepicker>
            <DatePicker
              selected={new Date(scheduleData.endTime)}
              name='endTime'
              showTimeSelect
              timeFormat='HH:mm'
              dateFormat={
                isMobile ? 'yyyy.MM.dd HH시 mm분까지' : 'yyyy.MM.dd HH시 mm분'
              }
              timeIntervals={30}
              onChange={(date) => {
                handleDateChange('endTime', date as Date);
              }}
              className={styles.datePickerEnd}
            />
          </CustomDatepicker>
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
      <div className={styles.alarm}>
        <span>알림</span>
        <ToggleSwitch
          checked={scheduleData.alarm ?? false}
          onChange={() =>
            setScheduleData((prev) => ({ ...prev, alarm: !prev.alarm }))
          }
        />
      </div>
      <div className={styles.buttonContainer}>
        <SumbitButton
          type={
            scheduleData.title && scheduleData.content && scheduleData.groupId
              ? 'submitActive'
              : 'submitInactive'
          }
          label='등록'
          onClick={
            scheduleData.title && scheduleData.content && scheduleData.groupId
              ? scheduleData.id
                ? updateSchedule
                : createSchedule
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default PrivateScheduleUpsertModal;
