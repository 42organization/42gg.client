export interface HistoryItemProps {
  agendaId: string;
  agendaTitle: string;
  agendaStartTime: string;
  agendaEndTime: string;
  agendaCurrentTeam: number;
  agendaLocation: string;
  teamKey: string;
  isOfficial: boolean;
  agendaMaxPeople: number;
  teamName: string;
  teamMates: TeamMate[];
  agendaKey: string;
}

export interface TeamMate {
  intraId: string;
  coalition: string;
}

export interface HistoryListProps {
  historyListData: HistoryItemProps[];
}
