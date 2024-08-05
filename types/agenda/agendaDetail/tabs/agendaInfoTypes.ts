import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { AgendaDataProps } from '../agendaTypes';

export interface AgendaInfoProps {
  agendaData: AgendaDataProps;
  isHost: boolean;
  isParticipant: boolean;
}

export interface AgendaTabProps {
  agendaData: AgendaDataProps;
  isHost: boolean;
  myTeam?: TeamDataProps | null;
}
