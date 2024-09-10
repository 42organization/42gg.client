import { fillZero } from 'utils/handleTime';
import styles from 'styles/agenda/utils/StartDate.module.scss';

const StartDate = (date: string) => {
  const startDate = new Date(date);
  return (
    <div className={styles.agendaDateBox}>
      <div className={styles.agendaStartDateMonth}>
        {fillZero(`${startDate.getMonth()}`, 2)}
      </div>
      <div className={styles.agendaStartDateDay}>
        {fillZero(`${startDate.getDate()}`, 2)}
      </div>
    </div>
  );
};

export default StartDate;
