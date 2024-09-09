import Link from 'next/link';
import { MyTeamDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import styles from 'styles/agenda/Profile/CurrentList.module.scss';
import MyTeamInfo from '../Home/MyTeamInfo';

const CurrentList = ({
  currentListData,
  isHost,
}: {
  currentListData: MyTeamDataProps[];
  isHost: boolean;
}) => {
  const listTitle = isHost ? '개최중 아젠다' : '참여중 아젠다';
  const bottomMargin = isHost ? '' : styles.bottomMargin;
  return (
    <div className={`${styles.currentListContainer} ${bottomMargin}`}>
      <div className={styles.currentListTitle}>{listTitle}</div>

      <div className={styles.currentListItems}>
        {currentListData.length !== 0 ? (
          currentListData.map((data: MyTeamDataProps, idx: number) => (
            <div className={styles.myagendaItemContainer} key={idx}>
              <MyTeamInfo myTeamInfo={data} key={idx} idx={idx} />
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
