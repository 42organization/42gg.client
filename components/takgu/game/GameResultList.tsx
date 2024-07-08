import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Game } from 'types/takgu/gameTypes';
import { SeasonMode } from 'types/takgu/mainType';
import GameResultBigItem from 'components/takgu/game/big/GameResultBigItem';
import GameResultEmptyItem from 'components/takgu/game/GameResultEmptyItem';
import GameResultSmallItem from 'components/takgu/game/small/GameResultSmallItem';
import useGameResultList from 'hooks/takgu/game/useGameResultList';
import styles from 'styles/takgu/game/GameResultItem.module.scss';

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

  const page =
    pathName === '/' ? 'main' : pathName === '/game' ? 'game' : 'profile';

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
                    zIndexList={page !== 'game'}
                    radioMode={radioMode}
                    page={page}
                  />
                ) : (
                  <GameResultSmallItem
                    key={game.gameId}
                    type={type}
                    game={game}
                    zIndexList={page !== 'game'}
                    radioMode={radioMode}
                    page={page}
                  />
                );
              })}
            </React.Fragment>
          ))}
          {page === 'game' && !isLast && (
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
