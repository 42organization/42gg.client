import React from 'react';
import { Schedule } from 'types/calendar/scheduleTypes';
import styles from 'styles/calendar/CalendarEvent.module.scss';
import CalendarEventContent from './CalendarEventContent';
import { useCalendarModal } from './modal/useCalendarModal';

const CalendarEvent = ({ event }: { event: Schedule }) => {
  const { openModal } = useCalendarModal();

  return (
    <div
      className={styles.eventBox}
      style={
        {
          '--box-color': `${
            event.groupId
              ? event.groupColor
              : event.classification === 'EVENT'
              ? '#785AD2'
              : event.classification === 'JOB_NOTICE'
              ? '#A98CFF'
              : event.groupColor
          }`,
        } as React.CSSProperties
      }
      onClick={() => openModal({ type: 'detail', schedule: event })}
    >
      <CalendarEventContent schedule={event} />
    </div>
  );
};

export default CalendarEvent;
