import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import InfScroll from 'utils/infinityScroll';
import { clickedGameItemState } from 'utils/recoil/takgu/game';

const useGameResultList = (path: string) => {
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

  return { data, status, fetchNextPage, isLast, clickedGameItem, pathName };
};

export default useGameResultList;
