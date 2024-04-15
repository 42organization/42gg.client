import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IcheckItem } from 'types/admin/adminRecruitmentsTypes';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import useRecruitmentUserFilter from 'hooks/recruitments/useRecruitmentUserFilter';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';
import RecruitmentFilterOptions from './RecruitmentFilterOptions';
import RenderTableCells from './RenderTableCells';

const tableTitle: { [key: string]: string } = {
  id: '',
  intraId: 'intraId',
  status: '상태',
  question: '질문',
};

function DetailRecruitUserList({ recruitId }: { recruitId: number }) {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const { recruitUserData, questions } = useRecruitmentUserFilter(
    recruitId
    // currentPage
  );

  if (!recruitUserData.applicationResults?.length) {
    return (
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'recruitUserList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            <AdminEmptyItem content={'공고 지원자 내역이 비어있습니다'} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <RecruitmentFilterOptions recruitId={recruitId} />
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell className={styles.tableHeaderItem}></TableCell>
              <TableCell className={styles.tableHeaderItem}>intraId</TableCell>
              <TableCell className={styles.tableHeaderItem}>status</TableCell>
              {questions.map((question, index) => (
                <TableCell className={styles.tableHeaderItem} key={index}>
                  {question}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {recruitUserData.applicationResults.map((recruit) =>
              RenderTableCells(recruit, questions, '')
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        {/* <PageNation
          curPage={recruitUserData.currentPage}
          totalPages={recruitUserData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        /> */}
      </div>
    </>
  );
}

export default DetailRecruitUserList;
