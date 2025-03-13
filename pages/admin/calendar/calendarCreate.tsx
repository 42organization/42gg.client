import CalendarForm from 'components/calendar/CalendarForm';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarCreate() {
  // 제출 시, api 날리는거 구현

  return (
    <div className={styles.createContainer}>
      <div className={styles.formContainer}>
        <CalendarForm mode='add' />
      </div>
    </div>
  );
}
