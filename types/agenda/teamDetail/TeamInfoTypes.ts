import { Authority } from 'constants/agenda/agenda';
import { TeamDetailProps } from './TeamDetailTypes';

export interface TeamInfoProps {
  teamDetail: TeamDetailProps;
  shareTeamInfo: () => void;
  maxPeople: number;
  authority: Authority;
  manageTeamDetail: (method: 'POST' | 'PATCH', url: string) => void;
  submitTeamForm: (target: React.FormEvent<HTMLFormElement>) => void;
}
