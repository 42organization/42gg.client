import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Schedule } from 'types/calendar/scheduleTypes';
import CalendarEvent from 'components/calendar/CalendarEvent';
import CalendarHeader from 'components/calendar/CalendarHeader';
import CustomCalendar from 'components/calendar/CustomCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarModalProvider from 'components/calendar/modal/CalendarModalProvider';
import { useCalendarModal } from 'components/calendar/modal/useCalendarModal';
import CalendarSidebar from 'components/calendar/Sidebar/CalendarSidebar';
import MenuSVG from 'public/image/calendar/menuIcon.svg';
import styles from 'styles/calendar/Calendar.module.scss';

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

const CalendarPage: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false); //모바일 버전인지 체크
  const [sidebarOpen, setSidebarOpen] = useState(false); //모바일 버전에서 사이드바 열고닫기
  const [overlayVisible, setOverlayVisible] = useState(false); //모바일 버전에서 사이드바 오버레이
  const [selectedSlot, setSelectedSlot] = useState(''); //선택된 날짜
  const { openModal, isOpen } = useCalendarModal();

  const handleSelectSlot = () => {
    if (isOpen) {
      return;
    }
    openModal({ type: 'AddSelect' });
  };

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
    <div className={styles.calendarBody}>
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
              onSelectSlot={handleSelectSlot}
              views={['month']}
              defaultView='month'
              popup
              components={{
                toolbar: CalendarHeader,
                eventWrapper: CalendarEvent,
              }}
              formats={formats}
            />
          </CustomCalendar>
          <CalendarModalProvider />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
