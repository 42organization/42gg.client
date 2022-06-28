import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InfiniteData } from 'react-query';
import { useRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import infScroll from 'utils/infinityScroll';
import { clickedGameItem } from 'utils/recoil/game';
import GameResultItem from 'components/game/GameResultItem';

type gameResultTypes = {
  path: string;
};

export default function GameResultList({ path }: gameResultTypes) {
  const [clickedItemId, setClickedItemId] =
    useRecoilState<number>(clickedGameItem);
  const [lastGameId, setLastGameId] = useState<number>();
  const infResult = infScroll(path);
  const { data, fetchNextPage, status } = infResult;
  const router = useRouter();

  const getLastGameId = (data: InfiniteData<any> | undefined) => {
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
        {router.asPath !== '/' && lastGameId !== 0 && (
          <button style={{ width: '100%' }} onClick={() => fetchNextPage()}>
            더보기
          </button>
        )}
      </>
    </div>
  );
}
