import { useEffect, useRef, useState, useCallback } from 'react';
import { instanceInAgenda } from 'utils/axios';

const usePageNation = <T>({
  url,
  size = 20,
  useIdx,
  params,
}: {
  url: string;
  params?: Record<string, any>;
  size?: number; // 페이지 사이즈
  useIdx?: boolean; // 인덱싱 추가 여부
}) => {
  const currentPage = useRef<number>(1);
  const [content, setContent] = useState<T[] | null>(null);
  const status = useRef<number>(0);
  const totalPages = useRef(1);

  // 기본 파라미터 설정
  if (!size) size = 20;
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
          console.log(temp.idx, idx, page, size);
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

    if (!status.current || Math.floor(status.current / 100) !== 2) {
      fetchData();
    }
  }, [getData, size]); // getData와 size에 의존

  const PagaNationElementProps = {
    curPage: currentPage.current,
    totalPages: totalPages.current,
    pageChangeHandler: pageChangeHandler,
  };

  return { content, PagaNationElementProps };
};

export default usePageNation;
