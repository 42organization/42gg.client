import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  DateCellWrapperProps,
} from 'react-big-calendar';
import { Schedule } from 'types/calendar/scheduleTypes';
import MenuSVG from 'public/image/calendar/menuIcon.svg';
import styles from 'styles/calendar/Calendar.module.scss';
import CalendarEvent from './CalendarEvent';
import CalendarHeader from './CalendarHeader';
import CustomCalendar from './CustomCalendar';
import ScheduleDetailModal from './modal/ScheduleDetailModal';
import CalendarSidebar from './Sidebar/CalendarSidebar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// `date-fns`와 로컬라이저 설정
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

const scheduleData: Schedule[] = [
  {
    id: 1,
    classification: 'JOB_NOTICE',
    jobTag: 'SHORTS_INTERN',
    techTag: 'FRONT_END',
    author: 'seykim',
    title: 'JOB test',
    content: 'test',
    link: 'string',
    startTime: '2025-01-06T06:28:46.655Z',
    endTime: '2025-01-08T06:28:46.655Z',
  },
  {
    id: 2,
    classification: 'EVENT',
    eventTag: 'ETC',
    author: 'seykim',
    title: 'EVENT test',
    content: 'string',
    link: 'string',
    startTime: '2025-01-06T06:28:46.655Z',
    endTime: '2025-01-10T06:28:46.655Z',
  },
  {
    id: 3,
    classification: 'PRIVATE_SCHEDULE',
    author: 'seykim',
    title: 'PRIVATE test',
    content: 'string',
    link: 'string',
    startTime: '2025-01-28T06:28:46.655Z',
    endTime: '2025-01-28T06:28:46.655Z',
    groupId: 1,
    groupTitle: 'group-test',
    groupColor: '#7DC163',
  },
  {
    id: 4,
    classification: 'PRIVATE_SCHEDULE',
    author: 'seykim',
    title: 'PRIVATE test2',
    content: 'string',
    link: 'string',
    startTime: '2025-01-01T06:28:46.655Z',
    endTime: '2025-01-02T06:28:46.655Z',
    groupId: 1,
    groupTitle: 'group-test',
    groupColor: '#7DC163',
  },
];

const parsedScheduleData = scheduleData.map((schedule) => ({
  ...schedule,
  startTime: new Date(schedule.startTime), // Date로 변환
  endTime: new Date(schedule.endTime), // Date로 변환
}));

//setStartDate(new Date(slotInfo.start.getTime() - slotInfo.start.getTimezoneOffset() * 60000).toISOString());
const CalendarLayout = () => {
  const [isMobile, setIsMobile] = useState(false); //모바일 버전인지 체크
  const [sidebarOpen, setSidebarOpen] = useState(false); //모바일 버전에서 사이드바 열고닫기
  const [overlayVisible, setOverlayVisible] = useState(false); //모바일 버전에서 사이드바 오버레이

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
        setSidebarOpen(true);
      } else {
        setIsMobile(true);
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setOverlayVisible(!overlayVisible);
  };

  const formats = {
    dateFormat: 'd',
    weekdayFormat: (date: Date) => format(date, 'EEEE'),
  };

  return (
    <>
      {isMobile && (
        <MenuSVG
          width={20}
          height={20}
          fill='#B4BDEE'
          className={styles.menuIcon}
          onClick={toggleSidebar}
        />
      )}
      <div className={styles.calendarView}>
        <CalendarSidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {isMobile && (
          <div
            className={`${styles.overlay} ${overlayVisible ? styles.show : ''}`}
            onClick={toggleSidebar}
          />
        )}
        <div className={styles.calendarBox}>
          <CustomCalendar>
            <Calendar<Schedule>
              localizer={localizer}
              events={parsedScheduleData}
              startAccessor='startTime'
              endAccessor='endTime'
              selectable
              // onSelectSlot={(slot) => { setSelectedDate(new Date(slot.start.getTime() - slot.start.getTimezoneOffset() * 60000).toISOString()); }}  // 선택된 날짜 상태 업데이트
              views={['month']}
              defaultView='month'
              popup
              components={{
                toolbar: CalendarHeader,
                eventWrapper: CalendarEvent,
                // dateCellWrapper: (props) => <AddModalController {...props} selectedDate={selectedDate} />,  // selectedDate를 함께 전달
              }}
              formats={formats}
            />
          </CustomCalendar>
        </div>
      </div>
    </>
  );
};

export default CalendarLayout;
