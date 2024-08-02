import classNames from 'classnames';
import { AgendaHistoryDataProps } from 'types/agenda/profile/agendaHistoryTypes';
import AgendaTag from 'components/agenda/utils/AgendaTag';
import CustomImage from 'components/agenda/utils/CustomImage';
import coalition from 'styles/agenda/coalition.module.scss';
import styles from 'styles/agenda/Profile/HistoryItem.module.scss';

const HistoryItem = ({ historyData }: AgendaHistoryDataProps) => {
  const startTime = historyData.agendaStartTime.toISOString().slice(0, 10);
  const endTime = historyData.agendaEndTime.toISOString().slice(0, 10);
  let timeString = '';
  if (startTime === endTime) timeString += startTime;
  else timeString = startTime + ' ~ ' + endTime;

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
          <CustomImage src='/image/agenda/Time.svg' alt='Time' />
        </div>

        <div className={styles.timeContent}>{timeString}</div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.teamName}>{historyData.teamName}</div>

      <div className={styles.teamIntraIdWrapper}>
        <div className={styles.imageWrapper}>
          <CustomImage src='/image/agenda/rock-and-roll-hand.svg' alt='team' />
        </div>

        <div className={styles.intraIdWrapper}>
          {/* intra id mapping */}
          {historyData.teamMates.map((mate) => (
            <div key={`${historyData.agendaId}-${mate.intraId}`}>
              {mate.intraId}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.coalitionWrapper}>
        {/* colition mapping */}
        {historyData.teamMates.map((mate) => (
          <div
            key={`${historyData.teamKey}-${mate.intraId}`}
            className={classNames(styles.coalitionBar, {
              [coalition.bg_autumn]: mate.coalition === 'AUTUMN',
              [coalition.bg_gun]: mate.coalition === 'GUN',
              [coalition.bg_gon]: mate.coalition === 'GON',
              [coalition.bg_gam]: mate.coalition === 'GAM',
              [coalition.bg_lee]: mate.coalition === 'LEE',
              [coalition.bg_spring]: mate.coalition === 'SPRING',
              [coalition.bg_summer]: mate.coalition === 'SUMMER',
              [coalition.bg_winter]: mate.coalition === 'WINTER',
              [coalition.bg_default]: mate.coalition === 'DEFAULT',
            })}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HistoryItem;
