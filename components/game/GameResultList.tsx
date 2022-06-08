import { useEffect, useState } from "react";
import { Games, Game } from "../../types/gameTypes";
import { getData } from "../../utils/axios";
import GameResultItem from "./GameResultItem";

export default function GameResultList() {
  const [games, setGames] = useState<Games>();
  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/games`);
        setGames(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div>
      {!games
        ? "로딩중"
        : games.map((game: Game) => (
            <GameResultItem key={game.matchId} game={game} />
          ))}
    </div>
  );
}
