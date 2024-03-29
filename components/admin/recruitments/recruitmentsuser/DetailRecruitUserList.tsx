import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
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
// import { instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';
import FilterQptionsUI from './FilterOptions';
import renderTableCells from './renderTableCells';
//TODO: 테이블 헤더, 테이블 바디, 페이지네이션 컴포넌트 분리
// 기본적인 부분
// 3. 페이지네이션 추가
// 4. 필터 추가

/* 
추가할 기능
가로세로 길이 조절
가로세로 위치 변경
호버 기능?
*/

const tableTitle: { [key: string]: string } = {
  id: '',
  intraId: 'intraId',
  status: '상태',
  question: '질문',
};

function DetailRecruitUserList({ recruitId }: { recruitId: number }) {
  const [recruitUserData, setRecruitUserData] = useState<IrecruitArrayTable>({
    applications: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  const getRecruitUserHandler = useCallback(async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/recruitments/${recruitId}/applications`, {
      //     params: {
      //       page: currentPage,
      //       size: 20,
      //       question: questionId,
      //       checks: checklistIds.join(','),
      //       search: searchString,
      //     }
      //   }
      // );
      const id = recruitId;
      const res = await mockInstance.get(`/admin/recruitments/${id}`);
      setRecruitUserData({
        applications: res.data.applications,
        totalPage: res.data.totalPages,
        currentPage: res.data.number + 1,
      });
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage, recruitId]);

  useEffect(() => {
    getRecruitUserHandler();
  }, [getRecruitUserHandler, currentPage]);

  if (!recruitUserData.applications) {
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

  const questions = recruitUserData.applications.reduce(
    (acc: string[], application: { form: { question: string }[] }) => {
      application.form.forEach(({ question }) => {
        if (acc.indexOf(question) === -1) {
          acc.push(question);
        }
      });
      return acc;
    },
    []
  );
  return (
    <>
      {FilterQptionsUI(recruitUserData.applications, questions)}
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
            {recruitUserData.applications.map((recruit) =>
              renderTableCells(recruit, questions)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={recruitUserData.currentPage}
          totalPages={recruitUserData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default DetailRecruitUserList;
