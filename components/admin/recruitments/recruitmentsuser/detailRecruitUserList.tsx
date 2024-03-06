import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
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
import {
  AdminEmptyItem,
  AdminTableHead,
  AdminContent,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/Recruitments.module.scss';

//무한 스크롤로 변경
//필터 추가
/* 
추가할 기능
가로세로 길이 조절
가로세로 위치 변경
*/
export interface IrecruitTable {
  applications: IrecruitUserTable['applications'];
  totalPage: number;
  currentPage: number;
}

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  usedAt: '적용 시간',
  title: '제목',
  status: '상태',
  detailRecruitment: '공고 상세보기',
  detaillUser: '지원자 보기',
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

  const renderTableCell = (
    recruit: IrecruitUserTable['applications'][number]
  ) => {
    return (
      <TableRow className={styles.tableRow} key={recruit.applicationId}>
        <TableCell className={styles.tableBodyItem}>
          <AdminContent
            content={recruit.intraId || ''}
            maxLen={16}
            detailTitle={recruit.applicationId.toString()}
            detailContent={recruit.status || ''}
          />
        </TableCell>
        {recruit.form?.map((formItem: Iquestion, index: number) => (
          <TableCell className={styles.tableBodyItem} key={index}>
            <AdminContent
              content={
                formItem.answer ||
                formItem.checkList?.map((item) => item.content).join(', ') ||
                ''
              }
              maxLen={16}
            />
          </TableCell>
        ))}
      </TableRow>
    );
  };

  if (!recruitUserData.applications.length) {
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
          <AdminTableHead tableName={'recruitUserList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {recruitUserData.applications.map(renderTableCell)}
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
