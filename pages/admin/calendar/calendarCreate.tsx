import { CalendarHeader } from 'components/admin/calendar/CalendarHeader';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarCreate() {
  return (
    <div className={styles.container}>
      <CalendarHeader title='캘린더 일정 추가' />
    </div>
  );
}
