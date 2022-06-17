import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const LOCAL = 'http://localhost:3000/api';
const SERVER = 'http://211.253.28.235:9090';

export default function infScroll(path: string, isServer: boolean = false) {
  const END_POINT = isServer ? LOCAL : SERVER;
  const getList = ({ pageParam = 1 }) =>
    axios
      .get(`${END_POINT}${path}${pageParam}`, {})

      .then((res) => res?.data);

  const result = useInfiniteQuery('infiniteList', getList, {
    getNextPageParam: (pages) => {
      return pages.currentPage + 1;
    },
  });

  return result;
}
