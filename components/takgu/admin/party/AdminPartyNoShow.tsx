import { useEffect, useState } from 'react';
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
  PartyNoshowReport,
  PartyNoshowReportTable,
} from 'types/takgu/partyTypes';
import { instanceInPartyManage } from 'utils/axios';
import { toastState } from 'utils/takgu/recoil/toast';
import { tableFormat } from 'constants/takgu/admin/table';
import PageNation from 'components/Pagination';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/takgu/admin/common/AdminTable';
import styles from 'styles/takgu/admin/party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  reporterIntraId: '신고자 이름',
  reporteeIntraId: '피신고자 이름',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function AdminPartyNoShow() {
  const [noShowInfo, setNoShowInfo] = useState<PartyNoshowReportTable>({
    noShowReportList: [],
    totalPages: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  useEffect(() => {
    instanceInPartyManage
      .get(`/reports/users?page=${currentPage}&size=10`)
      .then((res) => {
        setNoShowInfo({
          noShowReportList: res.data.userReportList,
          totalPages: res.data.totalPage,
          currentPage: currentPage,
        });
      })
      .catch((error) => {
        setSnackBar({
          toastName: 'GET request',
          message: '댓글신고를 가져오는데 실패했습니다.',
          severity: 'error',
          clicked: true,
        });
      });
  }, [currentPage]);

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>노쇼 신고 목록</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyNoshowReport'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {noShowInfo.noShowReportList &&
            noShowInfo.noShowReportList.length > 0 ? (
              noShowInfo.noShowReportList.map(
                (report: PartyNoshowReport, index: number) => (
                  <TableRow key={index}>
                    {tableFormat['partyNoshowReport'].columns.map(
                      (columnName) => {
                        return (
                          <TableCell
                            key={columnName}
                            className={styles.tableBodyItem}
                          >
                            {report[
                              columnName as keyof PartyNoshowReport
                            ]?.toString()}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                )
              )
            ) : (
              <AdminEmptyItem content={'패널티 기록이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={noShowInfo.currentPage}
          totalPages={noShowInfo.totalPages}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
