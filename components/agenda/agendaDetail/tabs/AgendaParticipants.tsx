import { ParticipantTabProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import ParticipantsList from 'components/agenda/agendaDetail/tabs/ParticipantsList';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaParticipants.module.scss';
import ParticipantTeamList from './ParticipantTeamList';

export default function AgendaParticipants({
  myTeam,
  agendaData,
}: ParticipantTabProps) {
  const { agendaMinPeople, agendaMaxPeople, agendaMaxTeam } = agendaData;

  const isTeam = (min: number, max: number) => {
    return min !== max;
  };

  return (
    <>
      <div className={styles.mainWarp}>
        <div className={styles.participantsContainer}>
          {isTeam(agendaMinPeople, agendaMaxPeople) ? (
            <ParticipantTeamList max={agendaMaxTeam} myTeam={myTeam} />
          ) : (
            <ParticipantsList max={agendaMaxTeam} />
          )}
        </div>
      </div>
    </>
  );
}
