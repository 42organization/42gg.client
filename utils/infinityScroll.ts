import { useInfiniteQuery } from 'react-query';
import instance from './axios';
import axios from 'axios';

const LOCAL = 'http://localhost:3000/api/pingpong/users/user/games/';
const SERVER = 'http://211.253.28.235:9090';

export default function infScroll(path: string, isServer: boolean = false) {
  const END_POINT = isServer ? SERVER : LOCAL;
  const getList = ({ pageParam = 1 }) =>
    instance
      .get(`${LOCAL}${pageParam}`, {})

      .then((res) => res?.data);

  const result = useInfiniteQuery('infiniteList', getList, {
    getNextPageParam: (pages) => {
      return pages.lastGameId;
    },
  });

  return result;
}
