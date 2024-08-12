export interface CurrentTeamProps {
  currentTeamData: CurrentTeamItemProps[];
}

export interface CurrentTeamItemComponentProps {
  currentTeamItemData: CurrentTeamItemProps;
}

export interface CurrentTeamItemProps {
  agendaId: string;
  agendaTitle: string;
  agendaLocation: string;
  teamKey: string;
  isOfficial: boolean;
  teamName: string;
}
