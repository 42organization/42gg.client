import { useInfiniteQuery } from 'react-query';
import instance from './axios';

export default function infScroll(path: string) {
  const getList = ({ pageParam = 0 }) =>
    instance
      .get(`${path}${pageParam}`, {})

      .then((res) => res?.data);

  const result = useInfiniteQuery('infiniteList', getList, {
    getNextPageParam: (pages) => {
      return pages.lastGameId;
    },
  });

  return result;
}
