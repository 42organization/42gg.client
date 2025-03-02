import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import React, { Children, cloneElement, useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';
import { Schedule } from 'types/calendar/scheduleTypes';
import useMonthScheduleGet from 'hooks/calendar/useMonthScheduleGet';
import useScheduleGet from 'hooks/calendar/useScheduleGet';
import useScheduleGroupGet from 'hooks/calendar/useScheduleGroupGet';
import styles from 'styles/calendar/Calendar.module.scss';
import CalendarEvent from './CalendarEvent';
import CalendarHeader from './CalendarHeader';
import CustomCalendar from './CustomCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarModalProvider from './modal/CalendarModalProvider';

interface calendarProps {
  filterSchedules: (
    scheduleData: Schedule[],
    filterList: ScheduleFilter
  ) => Schedule[];
  handleSelectSlot?: (slotInfo: { action: string; slots: Date[] }) => void;
  filterList: ScheduleFilter;
}

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

const formats = {
  dateFormat: 'd',
  weekdayFormat: (date: Date) => format(date, 'EEEE'),
};

const TouchCellWrapper = ({
  children,
  value,
  onSelectSlot,
}: {
  children: React.ReactElement;
  value: any;
  onSelectSlot: (slotInfo: { action: string; slots: Date[] }) => void;
}) =>
  cloneElement(Children.only(children), {
    onTouchEnd: () => onSelectSlot({ action: 'click', slots: [value] }),
    style: {
      className: `${children}`,
    },
  });

const CalendarLayout = ({
  filterSchedules,
  handleSelectSlot,
  filterList,
}: calendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { schedule: PublicSchedule } = useMonthScheduleGet(
    'public',
    currentDate
  );
  const { schedule: PrivateSchedule } = useMonthScheduleGet(
    'private',
    currentDate
  );
  const scheduleData = [...PublicSchedule, ...PrivateSchedule];
  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className={styles.calendarBox}>
      <CustomCalendar>
        <Calendar<Schedule>
          localizer={localizer}
          events={filterSchedules(scheduleData, filterList)}
          startAccessor={(event) => {
            return new Date(event.startTime);
          }}
          endAccessor={(event) => {
            return new Date(event.endTime);
          }}
          selectable
          onSelectSlot={handleSelectSlot}
          popup={true}
          onNavigate={handleNavigate}
          views={['month']}
          defaultView='month'
          components={{
            toolbar: CalendarHeader,
            eventWrapper: CalendarEvent,
            dateCellWrapper: (props) => (
              <TouchCellWrapper {...props} onSelectSlot={handleSelectSlot} />
            ),
          }}
          formats={formats}
        />
      </CustomCalendar>
      <CalendarModalProvider />
    </div>
  );
};

export default CalendarLayout;
