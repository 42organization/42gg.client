import HistoryItem from 'components/agenda/Profile/HistoryItem';
import styles from 'styles/agenda/Profile/AgendaHistory.module.scss';

const AgendaHistory = () => {
  return (
    <div className={styles.agendaHistory}>
      <div className={styles.historyTitleText}>아젠다 기록</div>
      <div className={styles.historyItems}>
        <HistoryItem />
        <HistoryItem />
      </div>
    </div>
  );
};

export default AgendaHistory;
