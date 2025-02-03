import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { Schedule } from 'types/calendar/scheduleTypes';
import styles from 'styles/calendar/Calendar.module.scss';
import CalendarEvent from './CalendarEvent';
import CalendarHeader from './CalendarHeader';
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

const CalendarLayout = () => {
  const formats = {
    dateFormat: 'd',
    weekdayFormat: (date: Date) => format(date, 'EEEE'),
  };

  return (
    <div className={styles.customCalendar}>
      <CalendarSidebar />
      <div className={styles.calendarBox}>
        <Calendar<Schedule>
          localizer={localizer}
          events={parsedScheduleData}
          startAccessor='startTime'
          endAccessor='endTime'
          selectable
          // onSelectSlot={handleSelectSlot}
          // onSelectEvent={onSelectEvent}
          views={['month']}
          defaultView='month'
          popup
          components={{
            toolbar: CalendarHeader,
            eventWrapper: CalendarEvent,
          }}
          formats={formats}
          className={styles.cutsomCalendar}
        />
      </div>
    </div>
  );
};

export default CalendarLayout;
