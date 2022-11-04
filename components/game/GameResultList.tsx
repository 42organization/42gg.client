import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import infScroll from 'utils/infinityScroll';
import { clickedGameItemState } from 'utils/recoil/game';
import GameResultItem from './GameResultItem';
import GameResultEmptyItem from './GameResultEmptyItem';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultListProps {
  path: string;
}

export default function GameResultList({ path }: GameResultListProps) {
  const { data, fetchNextPage, status, remove, refetch } = infScroll(path);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [clickedGameItem, setClickedGameItem] =
    useRecoilState(clickedGameItemState);
  const router = useRouter();

  useEffect(() => {
    remove();
    refetch();
  }, [path]);

  useEffect(() => {
    if (status === 'success') {
      const gameList = data?.pages;
      if (gameList[0].games.length)
        setClickedGameItem(gameList[0].games[0].gameId);
      setIsLast(gameList[gameList.length - 1].isLast);
    }
  }, [data]);

  if (status === 'success' && !data?.pages[0].games.length) {
    return <GameResultEmptyItem />;
  }

  return (
    <div>
      {status === 'success' && (
        <>
          {data?.pages.map((gameList, index) => (
            <div key={index}>
              {gameList.games.map((game: Game) => (
                <GameResultItem
                  key={game.gameId}
                  game={game}
                  isBig={clickedGameItem === game.gameId}
                />
              ))}
            </div>
          ))}
        </>
      )}
      {status === 'success' && router.asPath === '/game' && !isLast && (
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
