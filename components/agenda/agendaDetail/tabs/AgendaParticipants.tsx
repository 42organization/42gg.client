import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import ParticipantsList from 'components/agenda/agendaDetail/tabs/ParticipantsList';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaParticipants.module.scss';
import ParticipantTeamList from './ParticipantTeamList';

interface ParticipantListProps {
  agendaData: AgendaDataProps;
  myTeam?: TeamDataProps | null;
}

export default function AgendaParticipants({
  agendaData,
  myTeam,
}: ParticipantListProps) {
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
