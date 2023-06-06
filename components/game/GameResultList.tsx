import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Game } from 'types/gameTypes';
import GameResultEmptyItem from './GameResultEmptyItem';
import GameResultBigItem from './big/GameResultBigItem';
import GameResultSmallItem from './small/GameResultSmallItem';
import styles from 'styles/game/GameResultItem.module.scss';
import useGameResultList from 'hooks/game/useGameResultList';

interface GameResultListProps {
  path: string;
}

export default function GameResultList({ path }: GameResultListProps) {
  const { data, status, fetchNextPage, isLast, clickedGameItem, pathName } =
    useGameResultList(path);

  if (status === 'loading') return <GameResultEmptyItem status={status} />;

  if (status === 'success' && !data?.pages[0].games.length)
    return <GameResultEmptyItem status={status} />;

  return (
    <div className={styles['gameResultWrapper']}>
      {status === 'success' && (
        <>
          {data?.pages.map((gameList, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {gameList.games.map((game: Game, index) => {
                const type = Number.isInteger(index / 2) ? 'LIGHT' : 'DARK';
                return clickedGameItem === game.gameId ? (
                  <GameResultBigItem
                    key={game.gameId}
                    type={type}
                    game={game}
                  />
                ) : (
                  <GameResultSmallItem
                    key={game.gameId}
                    type={type}
                    game={game}
                  />
                );
              })}
            </React.Fragment>
          ))}
          {pathName === '/game' && !isLast && (
            <button
              className={styles['getButton']}
              onClick={() => fetchNextPage()}
            >
              <FaChevronDown />
            </button>
          )}
        </>
      )}
    </div>
  );
}
