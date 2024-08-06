import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { AgendaDataProps } from '../agendaTypes';

export interface AgendaInfoProps {
  agendaData: AgendaDataProps;
  isHost: boolean;
  status: number;
}

export interface AgendaTabProps {
  agendaData: AgendaDataProps;
  isHost: boolean;
  myTeam?: TeamDataProps | null;
}
