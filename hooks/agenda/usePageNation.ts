import { useEffect, useRef, useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const usePageNation = <T>({
  url,
  size,
  useIdx,
  params,
}: {
  url: string;
  params?: Record<string, any>;
  size?: number; // 페이지 사이즈
  useIdx?: boolean; // 인덱싱 추가 여부 : 해당 데이터 타입에 idx?: number; 추가 필요
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [content, setContent] = useState<T[] | null>(null);
  const totalPages = useRef(1);

  if (!size) size = 20;
  params = params ? params : {};
  params.page = currentPage;
  params.size = size;
  const getData = async (page: number) => {
    const res = await instanceInAgenda.get(url, { params });
    res.data.totalSize ? res.data.totalSize : 0;
    res.data.content ? res.data.content : [];
    if (useIdx) {
      res.data.content = res.data.content.map((c: T, idx: number) => {
        const temp = c as T & { idx: number };
        temp.idx = idx + 1 + size * (page - 1);
        return temp;
      });
    }
    return res.data as { totalSize: number; content: T[] };
  };
  // const data = getData(0);

  const pageChangeHandler = async (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages.current) return;
    await getData(pageNumber).then((res) => {
      setCurrentPage(pageNumber);
      setContent(res.content);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(currentPage);
      totalPages.current = Math.ceil(data.totalSize / size);
      setContent(data.content);
    };
    fetchData();
  });

  const PagaNationElementProps = {
    curPage: currentPage,
    totalPages: totalPages.current,
    pageChangeHandler: pageChangeHandler,
  };

  return { content, PagaNationElementProps };
};

export default usePageNation;
