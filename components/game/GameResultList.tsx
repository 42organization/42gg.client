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
  const [totalPage, setTotalPage] = useState();
  const [clickedGameItem, setClickedGameItem] =
    useRecoilState(clickedGameItemState);
  const router = useRouter();

  useEffect(() => {
    remove();
    refetch();
  }, [path]);

  useEffect(() => {
    const getTotalPage = data?.pages[data.pages.length - 1].totalPage;
    if (data?.pages.length === 1 && getTotalPage !== 0)
      setClickedGameItem(data?.pages[0].games[0].gameId);
    setTotalPage(getTotalPage);
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
      {status === 'success' && router.asPath === '/game' && totalPage !== 1 && (
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
