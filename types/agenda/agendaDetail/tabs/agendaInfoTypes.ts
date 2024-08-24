import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';

export interface AgendaInfoProps {
  agendaData: AgendaDataProps;
  isHost?: boolean;
  status?: number;
}

export interface AgendaTabProps {
  agendaData: AgendaDataProps;
  isHost: boolean;
  myTeam?: TeamDataProps | null;
}
