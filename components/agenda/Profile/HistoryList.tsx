import Link from 'next/link';
import {
  HistoryListProps,
  HistoryItemProps,
} from 'types/agenda/profile/historyListTypes';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import { countHistoryCoalitions } from 'components/agenda/utils/coalition/countCoalitions';
import ColorList from 'components/agenda/utils/ColorList';
import TeamIcon from 'public/image/agenda/rock-and-roll-hand.svg';
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

const HistoryList = ({ historyListData, isHost }: HistoryListProps) => {
  const historyTitle = isHost ? '아젠다 개최 기록' : '아젠다 참여 기록';

  return (
    <div className={styles.agendaHistory}>
      <div className={styles.historyTitleText}>{historyTitle}</div>
      <div className={styles.historyItems}>
        {historyListData.length > 0 ? (
          historyListData.map((historyData: HistoryItemProps) => {
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
                href={`/agenda/${historyData.agendaKey}`}
                className={styles.historyItem}
                key={historyData.agendaId}
              >
                <div className={styles.agendaTitle}>
                  {historyData.agendaTitle}
                </div>

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

                {/* Team 정보 UI / host 경우 ❌ */}
                {historyTeamMates && historyTeamMates.length > 0 ? (
                  <>
                    <hr className={styles.divider} />

                    <div className={styles.teamName}>
                      {historyData.teamName}
                    </div>

                    <div className={styles.teamIntraIdWrapper}>
                      <div className={styles.imageWrapper}>
                        <TeamIcon />
                      </div>

                      {/* intra id mapping */}
                      <div className={styles.intraIdWrapper}>
                        {historyTeamMates.map((mate) => (
                          <div key={`${historyData.agendaId}-${mate.intraId}`}>
                            {mate.intraId}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* coalition color mapping */}
                    <div className={styles.coalitionWrapper}>
                      <ColorList
                        peopleCount={peopleCount}
                        totalPeople={totalPeople}
                      />
                    </div>
                  </>
                ) : null}
              </Link>
            );
          })
        ) : (
          <div className={styles.historyEmpty}>아젠다 기록이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default HistoryList;
