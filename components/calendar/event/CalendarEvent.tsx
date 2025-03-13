import React from 'react';
import { Schedule } from 'types/calendar/scheduleTypes';
import styles from 'styles/calendar/CalendarEvent.module.scss';
import CalendarEventContent from './CalendarEventContent';
import { useCalendarModal } from '../../../utils/calendar/useCalendarModal';

const CalendarEvent = ({ event }: { event: Schedule }) => {
  const { openModal } = useCalendarModal();

  const openDetailModal = () => {
    openModal({ type: 'detail', schedule: event });
  };

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
          opacity: event.status === 'DEACTIVATE' ? 0.7 : 1,
        } as React.CSSProperties
      }
      onClick={openDetailModal}
    >
      <CalendarEventContent schedule={event} />
    </div>
  );
};

export default CalendarEvent;
