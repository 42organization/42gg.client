import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { GameListData } from 'types/gameTypes';
import { InventoryData } from 'types/inventoryTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

// GameListDat를 받아오는 InfiniteQuery
export default function InfScroll(path: string) {
  const setError = useSetRecoilState(errorState);

  const getGameList = ({ pageParam = 1 }) =>
    instance.get(`${path}&page=${pageParam}`, {}).then((res) => {
      return res?.data;
    });

  return useInfiniteQuery<GameListData, Error>('infiniteList', getGameList, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.isLast ? undefined : allPages.length + 1;
    },
    onError: (e: any) => {
      if (e.response.data && e.response.data.code === 'UF001') setError('JB07');
      else setError('KP01');
    },
    retry: 0,
    keepPreviousData: true,
  });
}

// InventoryData를 받아오는 InfiniteQuery
export function InfinityScroll(
  queryKey: string,
  fetchFunction: (page: number) => Promise<InventoryData>,
  errorCode: string
) {
  const setError = useSetRecoilState(errorState);
  return useInfiniteQuery<InventoryData, Error>(
    queryKey,
    ({ pageParam = 1 }) => fetchFunction(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage > lastPage.totalPage ? undefined : nextPage;
      },
      onError: (e: unknown) => {
        if (axios.isAxiosError(e)) {
          setError(errorCode);
        } else setError('JY03'); // axios에서 발생한 에러가 아닌 경우
      },
      retry: 0,
      keepPreviousData: true,
    }
  );
}
