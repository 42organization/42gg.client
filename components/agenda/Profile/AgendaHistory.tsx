import { AgendaHistoryProps } from 'types/agenda/profile/agendaHistoryTypes';
import HistoryItem from 'components/agenda/Profile/HistoryItem';
import styles from 'styles/agenda/Profile/AgendaHistory.module.scss';

const AgendaHistory = ({ agendaHistory }: AgendaHistoryProps) => {
  return (
    <div className={styles.agendaHistory}>
      <div className={styles.historyTitleText}>아젠다 기록</div>
      <div className={styles.historyItems}>
        {/* agenda history mapping */}
        {agendaHistory.length !== 0 ? (
          agendaHistory.map((history) => (
            <HistoryItem key={history.agendaId} historyData={history} />
          ))
        ) : (
          <div>아젠다 기록이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default AgendaHistory;
