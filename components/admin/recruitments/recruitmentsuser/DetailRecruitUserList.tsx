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
import {
  IrecruitUserTable,
  Iquestion,
} from 'types/admin/adminRecruitmentsTypes';
// import { instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
  AdminContent,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';
//무한 스크롤로 변경
//필터 추가
/* 
추가할 기능
가로세로 길이 조절
가로세로 위치 변경
호버 기능?
*/
export interface IrecruitTable {
  applications: IrecruitUserTable[];
  totalPage: number;
  currentPage: number;
}

const tableTitle: { [key: string]: string } = {
  intraId: 'intraId',
  status: '상태',
  question: '질문',
};

function DetailRecruitUserList({ recruitId }: { recruitId: number }) {
  const [recruitUserData, setRecruitUserData] = useState<IrecruitTable>({
    applications: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  const getRecruitUserHandler = useCallback(async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/recruitments/${recruitId}/applications`
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
  }, [currentPage]);

  useEffect(() => {
    getRecruitUserHandler();
  }, [currentPage]);

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

  const renderTableCells = (recruit: IrecruitUserTable) => {
    const answers = questions.map((question) => {
      const formItem = recruit.form.find((form) => form.question === question);
      if (!formItem) return 'N/A';

      switch (formItem.inputType) {
        case 'TEXT':
          return formItem.answer;
        case 'SINGLE_CHECK':
          return formItem.checkedList?.map((item) => item.content).join(', ');
        case 'MULTI_CHECK':
          return formItem.checkedList
            ?.flatMap((item) =>
              item.content.map((c: { content: string }) => c.content)
            )
            .join(', ');
      }
    });

    return (
      <TableRow className={styles.tableRow} key={recruit.applicationId}>
        <TableCell className={styles.tableBodyItem}>
          {recruit.intraId}
        </TableCell>
        <TableCell className={styles.tableBodyItem}>{recruit.status}</TableCell>
        {answers.map((answer, index) => (
          <TableCell className={styles.tableBodyItem} key={index}>
            {answer}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
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
            {recruitUserData.applications.map(renderTableCells)}
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
