import { Coalition } from 'constants/agenda/coalition';
import ParticipantsList from 'components/agenda/agendaDetail/taps/ParticipantsList';
import ParticipantTeam from 'components/agenda/agendaDetail/taps/ParticipantTeam';
import styles from 'styles/agenda/agendaDetail/taps/AgendaParticipants.module.scss';

export default function AgendaParticipants() {
  const curPeople = 6;
  const maxPeople = 10;

  const participantsData = [
    { name: 'intraId1', iconType: Coalition.GUN },
    { name: 'intraId2', iconType: Coalition.GAM },
    { name: 'intraId3', iconType: Coalition.GON },
    { name: 'intraId4', iconType: Coalition.LEE },
    { name: 'intraId5', iconType: Coalition.SPRING },
    { name: 'intraId6', iconType: Coalition.SUMMER },
    { name: 'intraId7', iconType: Coalition.AUTUMN },
    { name: 'intraId8', iconType: Coalition.WINTER },
  ];

  return (
    <>
      <div className={styles.mainWarp}>
        <div className={styles.participantsContainer}>
          <div className={styles.participantsTitle}>
            참가자 {curPeople} / {maxPeople}
          </div>
          <ParticipantsList participants={participantsData} />
        </div>

        <div className={styles.participantsContainer}>
          <ParticipantTeam />
        </div>
      </div>
    </>
  );
}
