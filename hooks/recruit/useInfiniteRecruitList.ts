import { useEffect, useRef } from 'react';
import { recruitmentListData } from 'types/recruit/recruitments';
import { InfiniteScroll } from 'utils/infinityScroll';
import { mockInstance } from 'utils/mockAxios';

const fetchRecruitList = (page: number) => {
  return mockInstance
    .get(`/recruitments?page=${page}&size=${8}`)
    .then((res) => {
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

  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    })
  );

  // 감지할 대상
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 랜더링시 observe 시작
    if (targetRef.current) {
      observer.current.observe(targetRef.current);
    }
  }, []);

  useEffect(() => {
    // 다음 페이지가 없을 때 observe 중지
    if (targetRef.current && !hasNextPage) {
      observer.current.unobserve(targetRef.current);
    }
  }, [hasNextPage]);

  return { data, isLoading, isError, targetRef };
};

export default useInfiniteRecruitList;
