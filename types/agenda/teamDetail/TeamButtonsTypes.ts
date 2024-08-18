import { Authority, TeamStatus } from 'constants/agenda/agenda';
import { editDataProps } from './TeamDetailTypes';

export interface TeamButtonsProps {
  authority: Authority;
  teamStatus: TeamStatus;
  handleConvert?: () => void;
  manageTeamDetail?: (method: 'POST' | 'PATCH', url: string) => void;
  editTeamDetail?: (editData: editDataProps) => void;
}

export interface BtnInfoProps {
  handleClick: () => void;
  label: string;
}
