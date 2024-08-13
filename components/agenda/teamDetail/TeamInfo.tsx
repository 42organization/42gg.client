import { TeamDetailProps } from 'types/aganda/TeamDetailTypes';
import { colorMapping } from 'types/agenda/utils/colorList';
import { ShareBtn } from 'components/agenda/button/Buttons';
import styles from 'styles/agenda/TeamDetail/TeamInfo.module.scss';

const TeamInfo = ({
  teamDetail,
  shareTeamInfo,
  maxPeople,
}: {
  teamDetail: TeamDetailProps;
  shareTeamInfo: () => void;
  maxPeople: number;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{teamDetail.teamName}</h1>
        <ShareBtn onClick={shareTeamInfo} />
      </div>

      <div className={styles.description}>
        <p>{teamDetail.teamContent}</p>
      </div>

      <div className={styles.teamMateInfo}>
        {teamDetail.teamMates?.map((mate, idx) => {
          const isConnectedUp =
            (idx > 0 &&
              teamDetail.teamMates[idx - 1].coalition === mate.coalition) ||
            false;
          const isConnectedDown =
            (idx < teamDetail.teamMates.length - 1 &&
              teamDetail.teamMates[idx + 1].coalition === mate.coalition) ||
            false;
          return (
            <div className={styles.mateContainer} key={idx}>
              <div
                className={`${styles.coalitionColor} ${
                  isConnectedUp ? styles.connectedUp : ''
                } ${isConnectedDown ? styles.connectedDown : ''} ${
                  colorMapping[mate.coalition]
                }`}
              ></div>

              <div className={styles.mateName}>
                <p>
                  {mate.intraId}{' '}
                  {mate.intraId === teamDetail.teamLeaderIntraId && '👑'}
                </p>
              </div>

              <div className={styles.mateCount}>
                <div className={styles.countBox}>참여인원</div>
                <div>{`${teamDetail.teamMates.length} / ${maxPeople}`}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamInfo;
