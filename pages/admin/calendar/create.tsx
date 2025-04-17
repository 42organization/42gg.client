import { CalendarFormData } from 'types/calendar/formType';
import { CalendarForm } from 'components/calendar/CalendarForm';
import { useAdminCalendarCreate } from 'hooks/calendar/admin/useAdminCalendarCreate';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarCreate() {
  const { createCalendar } = useAdminCalendarCreate();

  const handleSubmit = async (data: CalendarFormData) => {
    // + 데이터 파싱 체크 후, api 보내기
    await createCalendar(data);

    window.location.reload();
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.formContainer}>
        <CalendarForm mode='add' onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
