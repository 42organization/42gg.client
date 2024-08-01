import ParticipatingAgendaItem from 'components/agenda/Profile/ParticipatingAgendaItem';
import styles from 'styles/agenda/Profile/ParticipatingTeam.module.scss';

const ParticipatingTeam = () => {
  return (
    <div className={styles.participatingTeam}>
      <div className={styles.participatingTitleText}>참여중인 팀</div>
      <div className={styles.participatingItems}>
        <ParticipatingAgendaItem />
        <ParticipatingAgendaItem />
      </div>
    </div>
  );
};

export default ParticipatingTeam;
