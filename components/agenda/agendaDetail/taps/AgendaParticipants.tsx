import { Coalition } from 'constants/agenda/coalition';
import styles from 'styles/agenda/agendaDetail/taps/AgendaParticipants.module.scss';
import ParticipantsList from './ParticipantsList';

export default function AgendaParticipants() {
  const curPeople = 6;
  const maxPeople = 10;

  const participantsData = [
    { name: 'intraId1', iconType: Coalition.GUN },
    { name: 'intraId2', iconType: Coalition.GAM },
    { name: 'intraId3', iconType: Coalition.GON },
    { name: 'intraId4', iconType: Coalition.LEE },
  ];

  return (
    <>
      <div className={styles.participantsContainer}>
        <div className={styles.participantsTitle}>
          참가자 {curPeople} / {maxPeople}
        </div>
        <ParticipantsList participants={participantsData} />
      </div>
    </>
  );
}
