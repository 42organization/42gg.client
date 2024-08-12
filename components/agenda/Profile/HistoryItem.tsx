import { AgendaHistoryDataProps } from 'types/agenda/profile/agendaHistoryTypes';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import { countHistoryCoalitions } from 'components/agenda/utils/coalition/countCoalitions';
import ColorList from 'components/agenda/utils/ColorList';
import TeamIcon from 'public/image/agenda/rock-and-roll-hand.svg';
import TimeIcon from 'public/image/agenda/Time.svg';
import styles from 'styles/agenda/Profile/HistoryItem.module.scss';

const HistoryItem = ({ historyData }: AgendaHistoryDataProps) => {
  const startTime = historyData.agendaStartTime.toISOString().slice(0, 10);
  const endTime = historyData.agendaEndTime.toISOString().slice(0, 10);
  let timeString = '';
  if (startTime === endTime) timeString += startTime;
  else timeString = startTime + ' ~ ' + endTime;

  const totalPeople = historyData.teamMates.length;
  const peopleCount = countHistoryCoalitions(historyData.teamMates);

  return (
    <div className={styles.historyItem}>
      <div className={styles.agendaTitle}>{historyData.agendaTitle}</div>

      <div className={styles.tagWrapper}>
        {/* PROGRESS : tag mapping */}
        {historyData.isOfficial ? (
          <AgendaTag tagName='공식' />
        ) : (
          <AgendaTag tagName='비공식' />
        )}
        <AgendaTag tagName='팀' />
      </div>

      <div className={styles.timeWrapper}>
        <div className={styles.imageWrapper}>
          <TimeIcon />
        </div>

        <div className={styles.timeContent}>{timeString}</div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.teamName}>{historyData.teamName}</div>

      <div className={styles.teamIntraIdWrapper}>
        <div className={styles.imageWrapper}>
          <TeamIcon />
        </div>

        {/* intra id mapping */}
        <div className={styles.intraIdWrapper}>
          {historyData.teamMates.map((mate) => (
            <div key={`${historyData.agendaId}-${mate.intraId}`}>
              {mate.intraId}
            </div>
          ))}
        </div>
      </div>

      {/* coalition color mapping */}
      <div className={styles.coalitionWrapper}>
        <ColorList peopleCount={peopleCount} totalPeople={totalPeople} />
      </div>
    </div>
  );
};

export default HistoryItem;
