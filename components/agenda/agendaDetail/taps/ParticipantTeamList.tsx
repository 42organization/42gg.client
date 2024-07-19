import ParticipantTeam from 'components/agenda/agendaDetail/taps/ParticipantTeam';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantTeamList.module.scss';

export default function ParticipantTeamList() {
  const curTeam = 2;
  const confirmTeam = 3;
  const maxTeam = 4;
  return (
    <>
      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>모집중인 팀 {curTeam}</div>
        <ParticipantTeam />
      </div>

      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          확정완료 팀 {confirmTeam} / {maxTeam}
        </div>
        <ParticipantTeam />
        <ParticipantTeam />
      </div>
    </>
  );
}
