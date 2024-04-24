import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IrecruitArrayTable } from 'types/admin/adminRecruitmentsTypes';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';
import RenderTableCells from './RenderTableCells';

const tableTitle: { [key: string]: string } = {
  id: '',
  intraId: 'intraId',
  status: '상태',
  question: '질문',
};

function DetailRecruitUserList({
  recruitId,
  recruitUserFilter,
}: {
  recruitId: number;
  recruitUserFilter: IrecruitArrayTable;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    setQuestions(
      recruitUserFilter.applicationResults.reduce(
        (acc: string[], application: { forms: { question: string }[] }) => {
          if (application.forms) {
            application.forms.forEach(({ question }) => {
              if (acc.indexOf(question) === -1) {
                acc.push(question);
              }
            });
          }
          return acc;
        },
        []
      )
    );
  }, [recruitUserFilter]);

  if (!recruitUserFilter.applicationResults?.length) {
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
            {recruitUserFilter.applicationResults.map((recruit) =>
              RenderTableCells(recruit, questions, '')
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={recruitUserFilter.currentPage}
          totalPages={recruitUserFilter.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default DetailRecruitUserList;
