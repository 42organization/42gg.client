import { Authority, TeamStatus } from 'constants/agenda/agenda';

export interface TeamButtonsProps {
  authority: Authority;
  teamStatus: TeamStatus;
  manageTeamDetail?: (method: 'POST' | 'PATCH', url: string) => void;
}

export interface BtnInfoProps {
  label: string;
  description: string;
  onProceed: () => void;
}
