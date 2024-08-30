import { useEffect, useRef } from 'react';
import { recruitmentListData } from 'types/takgu/recruit/recruitments';
import { instance } from 'utils/axios';
import { InfiniteScroll } from 'utils/infinityScroll';

const fetchRecruitList = (page: number) => {
  return instance.get(`/recruitments?page=${page}&size=${8}`).then((res) => {
    return res.data;
  });
};

const useInfiniteRecruitList = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    InfiniteScroll<recruitmentListData>(
      ['recruitList'],
      fetchRecruitList,
      'JY09'
    );

  // 감지할 대상
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    const currentTarget = targetRef.current;
    if (currentTarget && hasNextPage) {
      observer.observe(currentTarget);
      return;
    }
    if (currentTarget && !hasNextPage) {
      observer.unobserve(currentTarget);
    }
  }, [fetchNextPage, hasNextPage]);

  return { data, isLoading, isError, targetRef };
};

export default useInfiniteRecruitList;
