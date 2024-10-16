import { AgendaStatus } from 'constants/agenda/agenda';
import styles from 'styles/agenda/Home/AgendaDeadLine.module.scss';

interface deadLineProps {
  deadLine: string | Date;
  status: AgendaStatus;
  start?: string | Date;
  end?: string | Date;
}

const AgendaDeadLine = ({ deadLine, status, start, end }: deadLineProps) => {
  const currentDate = new Date();
  const deadLineDate = new Date(deadLine);
  const startDate = new Date(start || '');
  const endDate = new Date(end || '');

  const timeDiff = deadLineDate.getTime() - currentDate.getTime();
  let daysLeft: number | string = 'DAY';

  if (timeDiff > 0) daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // 컨펌인 상태 구분
  let curr;
  if (!start || !end) curr = 'error';
  else if (currentDate >= startDate && currentDate <= endDate) curr = '진행중';
  else if (currentDate < startDate) curr = '진행예정';
  else curr = '진행완료';

  switch (status) {
    case 'FINISH':
      return (
        <div className={`${styles.agendaItemDeadLineBox} ${styles.finished}`}>
          <div className={styles.agendaDeadLineText}>종료</div>
        </div>
      );
    case 'CONFIRM':
      return (
        <div className={`${styles.agendaItemDeadLineBox} ${styles.confirm}`}>
          <div className={styles.agendaDeadLineText}>{curr}</div>
        </div>
      );
    case 'CANCEL':
      return (
        <div className={`${styles.agendaItemDeadLineBox} ${styles.cancel}`}>
          <div className={styles.agendaDeadLineText}>취소</div>
        </div>
      );
    default:
      if (timeDiff >= 0) {
        return (
          <div className={styles.agendaItemDeadLineBox}>
            <div className={styles.agendaDeadLineText}>모집마감</div>
            <div className={styles.agendaDeadLine}>D-{daysLeft}</div>
          </div>
        );
      } else return null;
  }
};

export default AgendaDeadLine;
