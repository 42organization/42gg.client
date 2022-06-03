import { Player } from "../types/game/gametypes";
import GameResultItem from "./GameResultItem";

export default function GameResultList() {
  const kipark: Player = {
    userId: "kipark",
    userImageUri: "imageUrl",
    wins: 1,
    losses: 2,
    winRate: 60,
    pppChange: 20,
  };
  const jibae: Player = {
    userId: "jibae",
    userImageUri: "imageUrl",
    wins: 4,
    losses: 2,
    winRate: 50,
    pppChange: 20,
  };
  const match1: Matches = {
    matchId: 1,
    time: "12시 30분",
    status: "end",
    team1: kipark,
    team2: jibae,
  };

  const sujpark: Player = {
    userId: "sujpark",
    userImageUri: "imageUrl",
    wins: 14,
    losses: 12,
    winRate: 630,
    pppChange: 210,
  };
  const jabae: Player = {
    userId: "jabae",
    userImageUri: "imageUrl",
    wins: 1,
    losses: 1,
    winRate: 70,
    pppChange: 220,
  };
  const match2: Matches = {
    matchId: 1,
    time: "12시 30분",
    status: "end",
    team1: sujpark,
    team2: jabae,
  };

  const games: Array<Matches> = [match1, match2];
  return (
    <div>
      {games.map((game: Matches) => (
        <GameResultItem game={game} />
      ))}
    </div>
  );
}
