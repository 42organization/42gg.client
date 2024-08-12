import {
  CurrentTeamProps,
  CurrentTeamItemProps,
} from 'types/agenda/profile/currentTeamTypes';
import CurrentTeamItem from 'components/agenda/Profile/CurrentTeamItem';
import styles from 'styles/agenda/Profile/CurrentTeam.module.scss';

const CurrentTeam = ({ currentTeamData }: CurrentTeamProps) => {
  return (
    <div className={styles.currentTeam}>
      <div className={styles.currentTeamTitle}>참여중인 팀</div>
      <div className={styles.currentTeamItems}>
        {currentTeamData.length !== 0 ? (
          currentTeamData.map((data: CurrentTeamItemProps) => (
            <CurrentTeamItem key={data.agendaId} currentTeamItemData={data} />
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

export default CurrentTeam;
