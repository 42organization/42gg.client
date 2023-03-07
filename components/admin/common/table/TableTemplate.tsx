import PageNation from 'components/Pagination';
import useTableData from 'hooks/useTableData';
import { useCallback, useState } from 'react';
import { TableName } from 'types/admin/tableTypes';
import AdminSearchBar from '../AdminSearchBar';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from 'styles/admin/common/TableTemplate.module.scss';

export default function TableTemplate({ format }: { format: TableName }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const { totalPage, rawDataList } = useTableData({
    format,
    currentPage,
    intraId,
  });

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  return (
    <div className={styles.tableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>유저 관리</span>
        <AdminSearchBar initSearch={initSearch} />
      </div>
      <table className={styles.table}>
        <TableHeader format={format} />
        <TableBody format={format} rawDataList={rawDataList} />
      </table>
      <PageNation
        curPage={currentPage}
        totalPages={totalPage.current}
        pageChangeHandler={(pageNumber: number) => {
          setCurrentPage(pageNumber);
        }}
      />
    </div>
  );
}
