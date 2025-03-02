import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSetRecoilState } from 'recoil';
import { ScheduleGroup } from 'types/calendar/groupType';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { Schedule } from 'types/calendar/scheduleTypes';
import { toastState } from 'utils/recoil/toast';
import DownSVG from 'public/image/calendar/downToggle.svg';
import LinkSVG from 'public/image/calendar/linkIcon.svg';
import useScheduleRequest from 'hooks/calendar/useScheduleRequest';
import styles from 'styles/calendar/modal/PrivateScheduleUpsertModal.module.scss';
import CustomDatepicker from './CustomDatepicker';
import GroupSelect from './GroupSelect';
import { useCalendarModal } from './useCalendarModal';
import SumbitButton from '../button/SubmitButton';
import { useGroup } from '../GroupContext';

//nowGroup 부분 -> 일정 추가일시 groupid:1인 그룹이 기본으로 설정되어 있도록 하는 로직 필요(그룹 불러오기)
//모달 바깥 클릭했을때(모달 꺼졌을 때) 수정/추가한 것 취소 로직 필요
//등록버튼 클릭 시 일정 저장하는 로직 필요
const PrivateScheduleUpsertModal = (props: calendarModalProps) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { closeModal } = useCalendarModal();
  const { sendCalendarRequest, error } = useScheduleRequest();
  const setSnackbar = useSetRecoilState(toastState);
  const groupList = useGroup();
  // let nowGroup;

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
    scheduleData.alarm = false;
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
      }
    );
  };

  const updateSchedule = async () => {
    scheduleData.startTime = toKSTISOString(new Date(scheduleData.startTime));
    scheduleData.endTime = toKSTISOString(new Date(scheduleData.endTime));
    await sendCalendarRequest(
      'PUT',
      `private/${scheduleData.id}`,
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
          toastName: 'response error',
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
      onClick={(e) => isDropdown && setIsDropdown(false)}
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
      <div className={styles.buttonContainer}>
        <SumbitButton
          type={
            scheduleData.title && scheduleData.content
              ? 'submitActive'
              : 'submitInactive'
          }
          label='등록'
          onClick={
            scheduleData.title && scheduleData.content
              ? scheduleData.id
                ? updateSchedule
                : createSchedule
              : undefined
          }
          // onClick={()=>console.log(scheduleData)}
        />
      </div>
    </div>
  );
};

export default PrivateScheduleUpsertModal;
