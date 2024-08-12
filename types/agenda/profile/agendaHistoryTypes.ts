export interface AgendaHistoryDataProps {
  historyData: AgendaHistoryItemProps;
}

export interface AgendaHistoryProps {
  agendaHistory: AgendaHistoryItemProps[];
}

export interface AgendaHistoryItemProps {
  agendaId: string;
  agendaTitle: string;
  agendaStartTime: Date;
  agendaEndTime: Date;
  agendaCurrentTeam: number;
  agendaLocation: string;
  teamKey: string;
  isOfficial: boolean;
  agendaMaxPeople: number;
  teamName: string;
  teamMates: TeamMate[];
}

export interface TeamMate {
  intraId: string;
  coalition: string;
}
