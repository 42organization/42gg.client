export interface ParticipantTeamProps {
  teamKey: string;
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  maxMateCount: number;
}

export interface PeopleCount {
  [key: string]: number;
}
