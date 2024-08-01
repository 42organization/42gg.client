import styles from 'styles/agenda/Home/AgendaDeadLine.module.scss';

// props : API
const AgendaDeadLine = () => {
  return (
    <div className={styles.agendaItemDeadLineBox}>
      <div className={styles.agendaDeadLineText}>모집마감</div>
      <div className={styles.agendaDeadLine}>D-2</div>
    </div>
  );
};

export default AgendaDeadLine;
