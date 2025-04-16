import { CalendarFormData } from 'types/calendar/formType';
import CalendarCreateForm from 'components/calendar/CalendarCreateForm';
import { useAdminCalendarCreate } from 'hooks/calendar/admin/useAdminCalendarCreate';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarCreate() {
  const { createCalendar } = useAdminCalendarCreate();

  const handleSubmit = async (data: CalendarFormData) => {
    // + 데이터 파싱 체크 후, api 보내기
    await createCalendar(data);
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.formContainer}>
        <CalendarCreateForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
