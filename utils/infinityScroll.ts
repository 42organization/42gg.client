import { useSetRecoilState } from 'recoil';
import { useInfiniteQuery } from 'react-query';
import { errorState } from 'utils/recoil/error';
import instance from './axios';

export default function infScroll(path: string) {
  const setError = useSetRecoilState(errorState);

  const getList = ({ pageParam = 0 }) =>
    instance.get(`${path}${pageParam}`, {}).then((res) => {
      return res?.data;
    });

  const result = useInfiniteQuery('infiniteList', getList, {
    getNextPageParam: (pages) => {
      return pages.lastGameId;
    },
    onError: (error: any) => {
      console.log(error);
      setError('KP01');
    },
    keepPreviousData: true,
  });

  return result;
}
