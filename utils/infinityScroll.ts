import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { GameListData } from 'types/gameTypes';
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

interface PagenatedResponse {
  totalPage: number;
}

// 무한스크롤 제네릭 함수
// Todo: 이 함수로 프로젝트 내 무한스크롤 모두 대체
export function InfiniteScroll<T extends PagenatedResponse>(
  queryKey: string | string[],
  fetchFunction: (page: number) => Promise<T>,
  errorCode: string
) {
  const setError = useSetRecoilState(errorState);
  return useInfiniteQuery<T, Error>(
    queryKey,
    ({ pageParam = 1 }) => fetchFunction(pageParam),
    {
      getNextPageParam: (lastPage, currPages) => {
        const nextPage = currPages.length + 1;
        if (nextPage <= lastPage.totalPage) {
          return nextPage;
        }
        return undefined;
      },
      onError: (e: unknown) => {
        if (axios.isAxiosError(e)) {
          setError(errorCode);
        } else {
          // axios에서 발생한 에러가 아닌 경우
          setError('JY03');
        }
      },
      retry: 0,
      // 쿼리 키 변경 시 쿼리를 초기화하여 isLoading 업데이트
      // keepPreviousData: true,
    }
  );
}
