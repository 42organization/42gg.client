import { MyTeamDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import styles from 'styles/agenda/Profile/CurrentList.module.scss';
import MyTeamInfo from '../Home/MyTeamInfo';

const CurrentList = ({
  currentListData,
}: {
  currentListData: MyTeamDataProps[];
}) => {
  return (
    <div className={styles.currentListItems}>
      {currentListData.length !== 0 ? (
        currentListData.map((data: MyTeamDataProps, idx: number) => (
          <div className={styles.currentItemWrapper} key={idx}>
            <MyTeamInfo myTeamInfo={data} key={idx} idx={idx} />
          </div>
        ))
      ) : (
        <div className={styles.currentTeamEmpty}>참여중 아젠다가 없습니다.</div>
      )}
    </div>
  );
};

export default CurrentList;
