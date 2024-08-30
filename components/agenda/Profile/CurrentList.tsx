import {
  CurrentListProps,
  CurrentItemProps,
} from 'types/agenda/profile/currentListTypes';
import styles from 'styles/agenda/Profile/CurrentList.module.scss';

const CurrentList = ({ currentListData, isHost }: CurrentListProps) => {
  const listTitle = isHost ? '개최중 아젠다' : '참여중 아젠다';
  return (
    <div className={styles.currentListContainer}>
      <div className={styles.currentListTitle}>{listTitle}</div>

      <div className={styles.currentListItems}>
        {currentListData.length !== 0 ? (
          currentListData.map((data: CurrentItemProps) => (
            <div key={data.agendaId} className={styles.currentItemWrapper}>
              <div className={styles.teamName}>{data.agendaTitle}</div>
              <div className={styles.title}>{data.teamName}</div>
            </div>
          ))
        ) : (
          <div className={styles.currentTeamEmpty}>
            참여중 아젠다가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentList;
