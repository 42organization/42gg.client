import { Coalition } from 'constants/agenda/coalition';
import Participant from 'components/agenda/agendaDetail/taps/Participant';
import styles from 'styles/agenda/agendaDetail/taps/Participant.module.scss';

export default function ParticipantsList() {
  const intraId = 'intraId';
  const coalition = Coalition.GUN;
  return (
    <div className={styles.ListContainer}>
      <Participant name={intraId} iconType={coalition} />
    </div>
  );
}
