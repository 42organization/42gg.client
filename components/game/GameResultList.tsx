import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Game } from '../../types/gameTypes';
import infScroll from '../../utils/infinityScroll';
import { clickedGameItem } from '../../utils/recoil/game';
import GameResultItem from './GameResultItem';

type gameResultTypes = {
  path: string;
  isMain: boolean;
};

export default function GameResultList({ path, isMain }: gameResultTypes) {
  const [clickedItemId, setClickedItemId] =
    useRecoilState<number>(clickedGameItem);
  const [lastGameId, setLastGameId] = useState<number>();
  const infResult = infScroll(path, true);
  const { data, fetchNextPage, status } = infResult;

  const getLastGameId = (data: any) => {
    return data?.pages[data.pages.length - 1].lastGameId;
  };

  useEffect(() => {
    if (data?.pages.length === 1 && getLastGameId(data) !== 0)
      setClickedItemId(data?.pages[0].games[0].gameId);
    setLastGameId(getLastGameId(data));
  }, [data]);

  return (
    <div>
      {status === 'success' && (
        <>
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page.games.map((game: Game) => (
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
      <>
        {!isMain ? (
          <>
            {lastGameId !== 0 ? (
              <button style={{ width: '100%' }} onClick={() => fetchNextPage()}>
                더보기
              </button>
            ) : (
              '요소가 없습니다!'
            )}
          </>
        ) : (
          ''
        )}
      </>
    </div>
  );
}
