import { useEffect, useRef, useState, useCallback } from 'react';
import { instanceInAgenda } from 'utils/axios';

interface PageNationProps {
  url: string;
  params?: Record<string, any>;
  size?: number; // 페이지 사이즈
  isReady?: boolean; // API 호출 가능 상태 확인
  useIdx?: boolean; // 인덱싱 추가 여부
}

const usePageNation = <T>({
  url,
  params,
  size = 20,
  isReady,
  useIdx,
}: PageNationProps) => {
  const currentPage = useRef<number>(1);
  const [content, setContent] = useState<T[] | null>(null);
  const status = useRef<number>(0);
  const totalPages = useRef(1);

  params = params || {};
  params.page = currentPage.current;
  params.size = size;

  const getData = useCallback(
    async (page: number, size: number) => {
      const res = await instanceInAgenda.get(url, { params });
      const content = res.data.content ? res.data.content : [];
      const totalSize = res.data.totalSize ? res.data.totalSize : 0;

      if (useIdx) {
        res.data.content = res.data.content.map((c: T, idx: number) => {
          const temp = c as T & { idx: number };
          temp.idx = idx + 1 + size * (page - 1);
          return temp;
        });
      }

      status.current = res.status; // 상태 업데이트
      return { totalSize, content };
    },
    [url, params, useIdx]
  );

  const pageChangeHandler = async (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages.current) return;
    const res = await getData(pageNumber, size);
    currentPage.current = pageNumber;
    setContent(res.content);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(currentPage.current, size);
      totalPages.current = Math.ceil(data.totalSize / size);
      setContent(data.content);
    };

    if (
      isReady == true &&
      (!status.current || Math.floor(status.current / 100) !== 2)
    ) {
      fetchData();
    }
  }, [getData, size, params]); // getData와 size에 의존

  const PagaNationElementProps = {
    curPage: currentPage.current,
    totalPages: totalPages.current,
    pageChangeHandler: pageChangeHandler,
  };

  return { content, PagaNationElementProps };
};

export default usePageNation;
