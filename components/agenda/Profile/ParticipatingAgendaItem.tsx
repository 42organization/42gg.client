import styles from 'styles/agenda/Profile/ParticipatingAgendaItem.module.scss';

const ParticipatingAgendaItem = () => {
  return (
    <div className={styles.participatingAgendaItem}>
      <div className={styles.teamName}>jeongrol</div>
      <div className={styles.title}>42 League Of Legend 대회</div>
    </div>
  );
};

export default ParticipatingAgendaItem;
