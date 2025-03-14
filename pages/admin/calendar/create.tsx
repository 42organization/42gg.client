import { CalendarFormData } from 'types/calendar/formType';
import CalendarForm from 'components/calendar/CalendarForm';
import styles from 'styles/admin/calendar/Calendar.module.scss';

export default function CalendarCreate() {
  const handleSubmit = async (data: CalendarFormData) => {
    console.log('📤 API 요청 데이터:', data);
    // 데이터 파싱
    //

    // const requestData = {
    //   ...data,
    //   startDate: data.startDate.toISOString(), // ✅ API 전송 전에 변환
    //   endDate: data.endDate.toISOString(),
    // };
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.formContainer}>
        <CalendarForm mode='add' onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
