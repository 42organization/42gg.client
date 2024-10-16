import { ParticipantTabProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import ParticipantsList from 'components/agenda/agendaDetail/tabs/ParticipantsList';
import { isSoloTeam } from 'components/agenda/utils/team';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaParticipants.module.scss';
import ParticipantTeamList from './ParticipantTeamList';

export default function AgendaParticipants({
  myTeam,
  agendaData,
}: ParticipantTabProps) {
  const { agendaMinPeople, agendaMaxPeople, agendaMaxTeam } = agendaData;

  return (
    <>
      <div className={styles.mainWarp}>
        {isSoloTeam(agendaMinPeople, agendaMaxPeople) ? (
          <div className={`${styles.participantsContainer} ${styles.solo}`}>
            <ParticipantsList max={agendaMaxTeam} />
          </div>
        ) : (
          <div className={`${styles.participantsContainer} ${styles.team}`}>
            <ParticipantTeamList
              maxTeam={agendaMaxTeam}
              maxPeople={agendaMaxPeople}
              myTeam={myTeam}
            />
          </div>
        )}
      </div>
    </>
  );
}
