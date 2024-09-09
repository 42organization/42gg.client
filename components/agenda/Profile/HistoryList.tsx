import Link from 'next/link';
import {
  HistoryListProps,
  HistoryItemProps,
} from 'types/agenda/profile/historyListTypes';
import AgendaTags from 'components/agenda/utils/AgendaTags';
import { countHistoryCoalitions } from 'components/agenda/utils/coalition/countCoalitions';
import TimeIcon from 'public/image/agenda/Time.svg';
import styles from 'styles/agenda/Profile/HistoryList.module.scss';

const parsingHistoryData = (historyData: HistoryItemProps) => {
  const historyTeamMates = historyData.teamMates || null;
  const totalPeople = historyData.teamMates ? historyData.teamMates.length : 0;
  const peopleCount = historyData.teamMates
    ? countHistoryCoalitions(historyData.teamMates)
    : {};
  const startTime = historyData.agendaStartTime.slice(0, 10);
  const endTime = historyData.agendaEndTime.slice(0, 10);

  let timeString = '';
  if (startTime === endTime) timeString += startTime;
  else timeString = startTime + ' ~ ' + endTime;

  return {
    historyTeamMates,
    totalPeople,
    peopleCount,
    startTime,
    endTime,
    timeString,
  };
};

const HistoryList = ({ historyListData }: HistoryListProps) => {
  return (
    <>
      <div className={styles.historyItems}>
        {historyListData.length > 0 ? (
          historyListData.map(
            (historyData: HistoryItemProps, index: number) => {
              const {
                historyTeamMates,
                totalPeople,
                peopleCount,
                startTime,
                endTime,
                timeString,
              } = parsingHistoryData(historyData);

              return (
                <Link
                  href={`/agenda/detail?agenda_key=${historyData.agendaKey}`}
                  className={styles.historyItem}
                  key={`${historyData.agendaId}-${index}`}
                >
                  <div className={styles.agendaTitle}>
                    {historyData.agendaTitle}
                  </div>

                  <div className={styles.tagWrapper}>
                    {AgendaTags(historyData)}
                  </div>

                  <div className={styles.timeWrapper}>
                    <div className={styles.imageWrapper}>
                      <TimeIcon />
                    </div>

                    <div className={styles.timeContent}>{timeString}</div>
                  </div>
                </Link>
              );
            }
          )
        ) : (
          <div className={styles.historyEmpty}>아젠다 기록이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default HistoryList;
