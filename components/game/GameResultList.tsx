import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Game } from '../../types/gameTypes';
import { getData } from '../../utils/axios';
import { ItemClickState } from '../../utils/recoil/game';
import GameResultBigItem from './big/GameResultBigItem';
import GameResultSmallItem from './small/GameResultSmallItem';

export default function GameResultList({ count }: { count: string }) {
  const [games, setGames] = useState<Game[]>();
  const isItemClick = useRecoilValue<number>(ItemClickState);

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/games?count=${count}`);
        setGames(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div>
      {!games
        ? '로딩중'
        : games.map((game: Game) => {
            if (isItemClick === game.matchId) {
              return <GameResultBigItem key={game.matchId} game={game} />;
            } else {
              return <GameResultSmallItem key={game.matchId} game={game} />;
            }
          })}
      )
    </div>
  );
}
