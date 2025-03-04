import { Schedule } from 'types/calendar/scheduleTypes';
import styles from 'styles/calendar/CalendarEvent.module.scss';

const CalendarEventContent = ({ schedule }: { schedule: Schedule }) => {
  return (
    <div className={styles.eventContent}>
      <span>{schedule.title}</span>
    </div>
  );
};

export default CalendarEventContent;
