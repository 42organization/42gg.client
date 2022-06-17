import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Game } from '../../types/gameTypes';
import infScroll from '../../utils/infinityScroll';
import { clickedGameItem } from '../../utils/recoil/game';
import GameResultItem from './GameResultItem';

type gameResultTypes = {
  user: string;
};

export default function GameResultList(user: gameResultTypes) {
  const [clickedItemId, setClickedItemId] =
    useRecoilState<number>(clickedGameItem);
  const result = infScroll(`/pingpong/games?page=`);
  const { data, fetchNextPage, status } = result;

  useEffect(() => {
    if (data?.pages.length === 1)
      setClickedItemId(data?.pages[0].games[0].gameId);
  }, [data]);

  return (
    <div>
      {status === 'success' && (
        <>
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page.games.map((game: Game, index: number) => (
                <GameResultItem
                  key={game.gameId}
                  game={game}
                  big={clickedItemId === game.gameId}
                />
              ))}
            </div>
          ))}
        </>
      )}
      <button onClick={() => fetchNextPage()}>전적 더보기!!</button>
    </div>
  );
}
