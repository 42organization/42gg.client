import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Schedule } from 'types/calendar/scheduleTypes';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/calendar/CalendarTable.module.scss';
import { NoContent } from '../agenda/utils';

interface CalendarTableProps {
  data: Schedule[];
}

export const CalendarTable = ({ data }: CalendarTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPage = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const calendarTableFormat = {
    columns: [
      'ID',
      '분류',
      '작성자',
      '제목',
      '시작 시간',
      '종료 시간',
      '상태',
      '기타',
    ],
  };

  return (
    <div className={styles.container}>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='calendar table'>
          {/* Table Header */}
          <TableHead className={styles.tableHead}>
            <TableRow>
              {calendarTableFormat.columns.map((name) => (
                <TableCell key={name}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Conditional Rendering for Table Body */}
          {data && data.length > 0 ? (
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{row.id}</TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.classification}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.author}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.title}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {new Date(row.startTime).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {new Date(row.endTime).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.status}
                  </TableCell>
                  <TableCell className={styles.etcTableCell}>
                    <button className={`${styles.btn} ${styles.detail}`}>
                      자세히
                    </button>
                    <button className={`${styles.btn} ${styles.modify}`}>
                      수정
                    </button>
                    <button className={`${styles.btn} ${styles.delete}`}>
                      삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <NoContent
                col={9}
                content={
                  '조회 결과가 없습니다. 조건을 변경하거나 새로운 일정을 추가해보세요.'
                }
              />
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={currentPage}
          totalPages={totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
};
