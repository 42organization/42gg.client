import React from 'react';
import { Schedule } from 'types/calendar/scheduleTypes';
import styles from 'styles/calendar/CalendarEvent.module.scss';
import CalendarEventContent from './CalendarEventContent';

const CalendarEvent = ({
  event,
  children,
}: {
  event: Schedule;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={styles.eventBox}
      style={
        {
          '--box-color': `${
            event.classification === 'EVENT'
              ? '#785AD2'
              : event.classification === 'JOB_NOTICE'
              ? '#A98CFF'
              : event.groupColor
          }`,
        } as React.CSSProperties
      }
    >
      <CalendarEventContent schedule={event} />
    </div>
  );
};

export default CalendarEvent;
