import { Coalition } from 'constants/agenda/coalition';
import Participant from 'components/agenda/agendaDetail/taps/Participant';
import styles from 'styles/agenda/agendaDetail/taps/AgendaParticipants.module.scss';

export default function AgendaParticipants() {
  const curPeople = 6;
  const maxPeople = 10;
  const intraId = 'intraId';
  const coalition = Coalition.GUN;

  return (
    <>
      <div className={styles.participantsContainer}>
        <div className={styles.participantsTitle}>
          참가자 {curPeople} / {maxPeople}
        </div>
        <Participant name={intraId} iconType={coalition} />
      </div>
    </>
  );
}
