import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Game } from 'types/gameTypes';
import GameResultEmptyItem from './GameResultEmptyItem';
import GameResultBigItem from './big/GameResultBigItem';
import GameResultSmallItem from './small/GameResultSmallItem';
import styles from 'styles/game/GameResultItem.module.scss';
import useGameResultList from 'hooks/game/useGameResultList';
import { SeasonMode } from 'types/mainType';

interface GameResultListProps {
  path: string;
  radioMode?: SeasonMode;
}

export default function GameResultList({
  path,
  radioMode,
}: GameResultListProps) {
  const { data, status, fetchNextPage, isLast, clickedGameItem, pathName } =
    useGameResultList(path);

  const isGamePage = pathName === '/game';

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
                    game={game}
                    zIndexList={!isGamePage}
                    radioMode={radioMode}
                  />
                ) : (
                  <GameResultSmallItem
                    key={game.gameId}
                    type={type}
                    game={game}
                    zIndexList={!isGamePage}
                    radioMode={radioMode}
                  />
                );
              })}
            </React.Fragment>
          ))}
          {isGamePage && !isLast && (
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
