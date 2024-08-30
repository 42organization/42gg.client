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
        <div className={styles.participantsContainer}>
          {isSoloTeam(agendaMinPeople, agendaMaxPeople) ? (
            <ParticipantsList max={agendaMaxTeam} />
          ) : (
            <ParticipantTeamList max={agendaMaxTeam} myTeam={myTeam} />
          )}
        </div>
      </div>
    </>
  );
}
