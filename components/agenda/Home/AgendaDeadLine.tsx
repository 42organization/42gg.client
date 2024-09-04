import React from 'react';
import styles from 'styles/agenda/Home/AgendaDeadLine.module.scss';

interface deadLineProps {
  deadLine: string | Date;
}

const AgendaDeadLine = ({ deadLine }: deadLineProps) => {
  const currentDate = new Date();
  const deadLineDate = new Date(deadLine);

  const timeDiff = deadLineDate.getTime() - currentDate.getTime();
  let daysLeft;

  if (timeDiff == 0) daysLeft = 'Day';
  else if (timeDiff > 0) daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (timeDiff >= 0) {
    return (
      <div className={styles.agendaItemDeadLineBox}>
        <div className={styles.agendaDeadLineText}>모집마감</div>
        <div className={styles.agendaDeadLine}>D-{daysLeft}</div>
      </div>
    );
  }

  return null;
};

export default AgendaDeadLine;
