import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import InfScroll from 'utils/infinityScroll';
import { clickedGameItemState } from 'utils/recoil/game';
import GameResultEmptyItem from './GameResultEmptyItem';
import GameResultBigItem from './big/GameResultBigItem';
import GameResultSmallItem from './small/GameResultSmallItem';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultListProps {
  path: string;
}

export default function GameResultList({ path }: GameResultListProps) {
  const { data, fetchNextPage, status, remove, refetch } = InfScroll(path);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [clickedGameItem, setClickedGameItem] =
    useRecoilState(clickedGameItemState);
  const pathName = useRouter().pathname;

  useEffect(() => {
    remove();
    refetch();
  }, [path]);

  useEffect(() => {
    if (status === 'success') {
      const gameList = data?.pages;
      if (gameList.length === 1 && gameList[0].games.length)
        setClickedGameItem(gameList[0].games[0].gameId);
      setIsLast(gameList[gameList.length - 1].isLast);
    }
  }, [data]);

  if (status === 'loading') return <GameResultEmptyItem status={status} />;

  if (status === 'success' && !data?.pages[0].games.length)
    return <GameResultEmptyItem status={status} />;

  return (
    <div>
      {status === 'success' && (
        <>
          {data?.pages.map((gameList, index) => (
            <div key={index}>
              {gameList.games.map((game: Game) => {
                return clickedGameItem === game.gameId ? (
                  <GameResultBigItem key={game.gameId} game={game} />
                ) : (
                  <GameResultSmallItem key={game.gameId} game={game} />
                );
              })}
            </div>
          ))}
          {pathName === '/game' && !isLast && (
            <div className={styles.getButton}>
              <input
                type='button'
                value='더 보기'
                onClick={() => fetchNextPage()}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
