type TournamentData = {
  tournamentId: number;
  users: number[];
}[];

export const DummyData: TournamentData = [
  {
    tournamentId: 56,
    users: [1],
  },
  {
    tournamentId: 55,
    users: [1],
  },
];

const dummy = () => {
  return null;
};
export default dummy;
