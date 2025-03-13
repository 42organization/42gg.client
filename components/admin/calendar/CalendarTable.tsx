import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Tooltip,
} from '@mui/material';
import { AdminSchedule } from 'types/calendar/scheduleTypes';
import { CalendarStatus } from 'constants/calendar/calendarConstants';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/calendar/CalendarTable.module.scss';
import { NoContent } from '../agenda/utils';

interface CalendarTableProps {
  data: AdminSchedule[];
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
      '상태',
      '분류',
      '작성자',
      '제목',
      '시작 시간',
      '종료 시간',
      '기타',
    ],
  };

  const classificationMap: Record<string, string> = {
    JOB_NOTICE: 'JOB',
    PRIVATE_SCHEDULE: 'PRIVATE',
    EVENT: 'EVENT',
  };

  return (
    <div className={styles.container}>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='calendar table'>
          {/* Table Header */}
          <TableHead className={styles.tableHead}>
            <TableRow>
              {calendarTableFormat.columns.map((name) => (
                <TableCell
                  key={name}
                  align={name === 'ID' || name === '상태' ? 'center' : 'left'}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          {data && data.length > 0 ? (
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} className={styles.tableRow}>
                  <TableCell className={styles.tableCell} align='center'>
                    {row.id}
                  </TableCell>

                  <TableCell className={styles.tableCell} align='center'>
                    <Tooltip
                      title={
                        row.status === CalendarStatus.DEACTIVATE
                          ? '비활성화'
                          : row.status === CalendarStatus.ACTIVATE
                          ? '활성화'
                          : '삭제'
                      }
                      placement='top'
                      arrow
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor:
                            row.status === CalendarStatus.DEACTIVATE
                              ? 'orange'
                              : row.status === CalendarStatus.ACTIVATE
                              ? 'green'
                              : 'red',
                          display: 'inline-block',
                          transition: 'opacity 0.3s ease',
                          '&:hover': {
                            opacity: 0.6,
                          },
                        }}
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell className={styles.tableCell}>
                    {classificationMap[row.classification] ||
                      row.classification}
                  </TableCell>

                  <TableCell className={styles.tableCell}>
                    {row.author}
                  </TableCell>

                  <TableCell
                    className={styles.tableCell}
                    sx={{
                      maxWidth: '300px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {row.title}
                  </TableCell>

                  <TableCell className={styles.tableCell}>
                    {new Date(row.startTime).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </TableCell>

                  <TableCell className={styles.tableCell}>
                    {new Date(row.endTime).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
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
