import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IrecruitEditInfo } from 'types/admin/adminRecruitmentsTypes';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/TitleTimeRangeSelector.module.scss';

const tableTitle: { [key: string]: string } = {
  title: '모집 제목',
  startDate: '지원서 모집 시작',
  endDate: '지원서 모집 마감',
  generation: '기수',
};

interface TitleTimeRangeSelectorProps {
  recruitmentEditInfo: IrecruitEditInfo;
  setTitle: (title: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setGeneration: (generation: string) => void;
}

export default function TitleTimeRangeSelector({
  recruitmentEditInfo,
  setTitle,
  setStartDate,
  setEndDate,
  setGeneration,
}: TitleTimeRangeSelectorProps) {
  const inputChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    switch (target.name) {
      case 'title':
        setTitle(target.value);
        break;
      case 'startDate':
        setStartDate(target.value);
        break;
      case 'endDate':
        setEndDate(target.value);
        break;
      case 'generation':
        setGeneration(target.value);
        break;
    }
  };

  return (
    <div className={styles.editorContainer}>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'recruitEditTitle'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            <TableRow>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='text'
                  name='title'
                  value={recruitmentEditInfo.title} //데이터
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='datetime-local'
                  name='startDate'
                  value={recruitmentEditInfo.startDate}
                  step='60'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='datetime-local'
                  name='endDate'
                  value={recruitmentEditInfo.endDate}
                  step='60'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='text'
                  name='generation'
                  value={recruitmentEditInfo.generation}
                  onChange={inputChangeHandler}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
