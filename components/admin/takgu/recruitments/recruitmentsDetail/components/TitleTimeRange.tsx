import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Irecruit } from 'types/admin/adminRecruitmentsTypes';
import { dateToStringShort } from 'utils/handleTime';
import { AdminTableHead } from 'components/admin/takgu/common/AdminTable';
import styles from 'styles/admin/takgu/recruitments/recruitmentDetail/components/TitleTimeRange.module.scss';

const tableTitle: { [key: string]: string } = {
  title: '모집 제목',
  startDate: '지원서 모집 시작',
  endDate: '지원서 모집 마감',
  generation: '기수',
};

interface TitleTimeRange {
  recruitmentInfo: Irecruit;
}

export default function TitleTimeRange({ recruitmentInfo }: TitleTimeRange) {
  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table className={styles.table} aria-label='customized table'>
        <AdminTableHead tableName={'recruitEditTitle'} table={tableTitle} />
        <TableBody className={styles.tableBody}>
          <TableRow>
            <TableCell className={styles.tableBodyItem}>
              <div>{recruitmentInfo.title}</div>
            </TableCell>
            <TableCell className={styles.tableBodyItem}>
              <div>{dateToStringShort(recruitmentInfo.startDate)}</div>
            </TableCell>
            <TableCell className={styles.tableBodyItem}>
              <div>{dateToStringShort(recruitmentInfo.startDate)}</div>
            </TableCell>
            <TableCell className={styles.tableBodyItem}>
              <div>{recruitmentInfo.generation}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
