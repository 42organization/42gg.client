import styles from 'styles/agenda/Home/AgendaTitle.module.scss';

const AgendaTitle = () => {
  return (
    <div className={styles.agendaTitleContainer}>
      <div>AGENDA</div>
      <button className={styles.agendaCreateBtn}>개최신청 👉🏻</button>
    </div>
  );
};

export default AgendaTitle;
