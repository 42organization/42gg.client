import { CurrentTeamItemComponentProps } from 'types/agenda/profile/currentTeamTypes';
import styles from 'styles/agenda/Profile/CurrentTeamItem.module.scss';

const CurrentTeamItem = ({
  currentTeamItemData,
}: CurrentTeamItemComponentProps) => {
  return (
    <div className={styles.currentTeamItem}>
      <div className={styles.teamName}>{currentTeamItemData.agendaTitle}</div>
      <div className={styles.title}>{currentTeamItemData.teamName}</div>
    </div>
  );
};

export default CurrentTeamItem;
