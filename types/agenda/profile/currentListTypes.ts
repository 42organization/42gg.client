export interface CurrentItemProps {
  agendaKey: string;
  agendaId: string;
  agendaTitle: string;
  agendaLocation: string;
  teamKey: string;
  isOfficial: boolean;
  teamName: string;
}

export interface CurrentListProps {
  currentListData: CurrentItemProps[];
  isHost: boolean;
}
