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
      const res = await instanceInAgenda.get(url, {
        params: { ...params, page, size },
      });
      const content = res.data.content || [];
      const totalSize = res.data.totalSize || 0;

      if (useIdx) {
        content.forEach((c: T, idx: number) => {
          (c as T & { idx: number }).idx = idx + 1 + size * (page - 1);
        });
      }

      status.current = res.status;
      return { totalSize, content };
    },
    [url, params, useIdx]
  );

  const fetchData = async () => {
    const data = await getData(currentPage.current, size);
    totalPages.current = Math.ceil(data.totalSize / size);
    setContent(data.content);
  };

  const pageChangeHandler = async (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages.current) return;
    currentPage.current = pageNumber;
    await fetchData();
  };

  useEffect(() => {
    if (
      isReady === true &&
      (!status.current || Math.floor(status.current / 100) !== 2)
    ) {
      fetchData();
    }
  }, [getData, size, params, isReady]);

  useEffect(() => {
    currentPage.current = 1;

    setContent(null);

    if (isReady) {
      fetchData();
    }
  }, [url, isReady]);

  const PagaNationElementProps = {
    curPage: currentPage.current,
    totalPages: totalPages.current,
    pageChangeHandler: pageChangeHandler,
  };

  return { content, PagaNationElementProps };
};

export default usePageNation;
