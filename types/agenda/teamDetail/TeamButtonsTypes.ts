import { Authority, TeamStatus } from 'constants/agenda/agenda';
import { TeamDetailProps } from './TeamDetailTypes';

export interface TeamButtonsProps {
  authority: Authority;
  teamStatus: TeamStatus;
  manageTeamDetail?: (method: 'POST' | 'PATCH', url: string) => void;
}

export interface BtnInfoProps {
  handleClick: () => void;
  label: string;
}
