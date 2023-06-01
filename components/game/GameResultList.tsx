import { Game } from 'types/gameTypes';
import GameResultEmptyItem from './GameResultEmptyItem';
import GameResultBigItem from './big/GameResultBigItem';
import GameResultSmallItem from './small/GameResultSmallItem';
import styles from 'styles/game/GameResultItem.module.scss';
import useGameResultList from 'hooks/game/useGameResultList';
import { useMemo } from 'react';

interface GameResultListProps {
  path: string;
}

export default function GameResultList({ path }: GameResultListProps) {
  const { data, status, fetchNextPage, isLast, clickedGameItem, pathName } =
    useGameResultList(path);

  const totalGameCount = useMemo(() => {
    if (!data?.pages) return 0;
    return data.pages.reduce((acc, page) => acc + page.games.length, 0);
  }, [data?.pages]);

  if (status === 'loading') return <GameResultEmptyItem status={status} />;

  if (status === 'success' && !data?.pages[0].games.length)
    return <GameResultEmptyItem status={status} />;

  return (
    <div className={styles['item-list']}>
      {status === 'success' && (
        <>
          {data?.pages.map((gameList, pageIndex) => (
            <>
              {gameList.games.map((game: Game, index) => {
                const type = Number.isInteger(index / 2) ? 'LIGHT' : 'DARK';
                const zIndex =
                  totalGameCount - pageIndex * gameList.games.length - index;
                return clickedGameItem === game.gameId ? (
                  <GameResultBigItem
                    key={game.gameId}
                    type={type}
                    game={game}
                    zIndex={totalGameCount + 1}
                  />
                ) : (
                  <GameResultSmallItem
                    key={game.gameId}
                    type={type}
                    game={game}
                    isFirst={pageIndex === 0 && index === 0}
                    zIndex={zIndex}
                  />
                );
              })}
            </>
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
