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
  setRecruitmentEditInfoField: (fieldName: string, value: any) => void;
}

export default function TitleTimeRangeSelector({
  recruitmentEditInfo,
  setRecruitmentEditInfoField,
}: TitleTimeRangeSelectorProps) {
  const inputChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRecruitmentEditInfoField(target.name, target.value);
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
                  value={recruitmentEditInfo.title}
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
