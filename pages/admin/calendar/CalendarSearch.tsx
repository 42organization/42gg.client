import { CalendarHeader } from 'components/admin/calendar/CalendarHeader';
import { CalendarSearchResults } from 'components/admin/calendar/calendarSearch/CalendarSearchResults';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarSearch() {
  return (
    <div className={styles.container}>
      <CalendarHeader title='캘린더 검색' />

      <CalendarSearchResults />
    </div>
  );
}
