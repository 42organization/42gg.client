import { AgendaStatus } from 'constants/agenda/agenda';

// 참가자 정보 요약
export interface ParticipantSummaryProps {
  agendaStatus: AgendaStatus;
  isHost: boolean;
  isParticipant: boolean;
  isTeam: boolean;
}
