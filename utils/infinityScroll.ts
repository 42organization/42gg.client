import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

// const END_POINT = 'http://localhost:3000/api';
const END_POINT = 'http://211.253.28.235:9090';

export default function infScroll(path: string) {
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
