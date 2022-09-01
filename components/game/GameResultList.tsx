import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InfiniteData } from 'react-query';
import { useRecoilState } from 'recoil';
import { GameData } from 'types/gameTypes';
import infScroll from 'utils/infinityScroll';
import { clickedGameItem } from 'utils/recoil/game';
import GameResultItem from './GameResultItem';
import GameResultEmptyItem from './GameResultEmptyItem';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultListProps {
  path: string;
}

export default function GameResultList({ path }: GameResultListProps) {
  const infResult = infScroll(path);
  const { data, fetchNextPage, status } = infResult;
  const [clickedItemId, setClickedItemId] = useRecoilState(clickedGameItem);
  const [totalPage, setTotalPage] = useState();
  const router = useRouter();
  const getTotalPage = (data: InfiniteData<any> | undefined) => {
    return data?.pages[data.pages.length - 1].totalPage;
  };

  useEffect(() => {
    infResult.remove();
    infResult.refetch();
  }, [path]);

  useEffect(() => {
    if (data?.pages.length === 1 && getTotalPage(data) !== 0)
      setClickedItemId(data?.pages[0].games[0].gameId);
    setTotalPage(getTotalPage(data));
  }, [data]);

  if (data?.pages[0].games.length === 0) {
    return <GameResultEmptyItem />;
  }

  return (
    <div>
      {status === 'success' && (
        <>
          {data?.pages.map((gameList, index) => (
            <div key={index}>
              {gameList.games.map((game: GameData) => (
                <GameResultItem
                  key={game.gameId}
                  game={game}
                  isBig={clickedItemId === game.gameId}
                />
              ))}
            </div>
          ))}
        </>
      )}
      {router.asPath !== '/' && totalPage !== 1 && (
        <div className={styles.getButton}>
          <input
            type='button'
            value='더 보기'
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </div>
  );
}
