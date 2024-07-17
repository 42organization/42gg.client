import ColorList from 'components/agenda/agendaDetail/taps/ColorList';
import TeamLeaderIcon from 'public/image/agenda/rock-and-roll-hand.svg';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantTeam.module.scss';
export default function participantTeam() {
  // 팀장이름
  const leader = '팀장 이름';
  const curPeople = 1;
  const maxPeople = 4;
  return (
    <>
      <div className={styles.participantTeamContainer}>
        <div className={styles.titleWarp}>
          <div className={styles.infoWarp}>
            <div className={styles.teamTitle}>참가팀</div>

            <div className={styles.teamLeader}>
              <TeamLeaderIcon className={styles.LeaderIcon} />
              <p>{leader}</p>
            </div>
          </div>

          <div className={styles.headCount}>
            {curPeople} / {maxPeople}
          </div>
        </div>

        <ColorList />
      </div>
    </>
  );
}
