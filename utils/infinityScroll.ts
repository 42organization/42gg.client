import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const END_POINT = 'http://localhost:3000/api';

export default function infScroll(path: string) {
  const getList = ({ pageParam = 1 }) =>
    axios
      .get(`${END_POINT}${path}${pageParam}`, {})

      .then((res) => res?.data);

  const result = useInfiniteQuery('rankList', getList, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.info.next === 'null') return false;
      return pages.length + 1;
    },
  });

  return result;
}
