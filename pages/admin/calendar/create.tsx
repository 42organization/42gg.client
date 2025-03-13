import CalendarForm from 'components/calendar/CalendarForm';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarCreate() {
  const onSubmit = () => {
    console.log('hi');
  };
  return (
    <div className={styles.createContainer}>
      <div className={styles.formContainer}>
        <CalendarForm mode='add' onSubmit={onSubmit} />
      </div>
    </div>
  );
}
