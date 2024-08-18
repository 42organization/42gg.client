import { Authority } from 'constants/agenda/agenda';
import { TeamDetailProps, editDataProps } from './TeamDetailTypes';

export interface TeamInfoProps {
  teamDetail: TeamDetailProps;
  shareTeamInfo: () => void;
  maxPeople: number;
  authority: Authority;
  manageTeamDetail: (method: 'POST' | 'PATCH', url: string) => void;
  editTeamDetail: (editData: editDataProps) => void;
}
