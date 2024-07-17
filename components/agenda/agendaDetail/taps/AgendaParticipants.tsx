import { Coalition } from 'constants/agenda/coalition';
import ParticipantsList from 'components/agenda/agendaDetail/taps/ParticipantsList';
import styles from 'styles/agenda/agendaDetail/taps/AgendaParticipants.module.scss';
import ParticipantTeamList from './ParticipantTeamList';

export default function AgendaParticipants() {
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
  const minPeople = 1;
  const maxPeople = 1;
  const isTeam = minPeople !== maxPeople;

  return (
    <>
      <div className={styles.mainWarp}>
        <div className={styles.participantsContainer}>
          {isTeam ? (
            <ParticipantTeamList />
          ) : (
            <ParticipantsList participants={participantsData} />
          )}
        </div>
      </div>
    </>
  );
}
